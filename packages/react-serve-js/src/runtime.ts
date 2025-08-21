import express, { Request, Response as ExpressResponse, RequestHandler } from "express";
import { ReactNode } from "react";
import { watch } from "fs";
import cors from "cors";

// Holds per-request context (available only inside a request lifecycle)
let routeContext: {
  req: Request;
  res: ExpressResponse;
  params: any;
  query: any;
  body: any;
  middlewareContext: Map<string, any>;
} | null = null;

// Holds global context (shared outside of request lifecycle)
const globalContext = new Map<string, any>();

// Hook to access current request context inside a handler
export function useRoute() {
  if (!routeContext) throw new Error("useRoute must be used inside a Route");
  return routeContext;
}

// Hook to set values in either request-scoped or global context
export function useSetContext(key: string, value: any) {
  if (routeContext) {
    routeContext.middlewareContext.set(key, value);
  } else {
    globalContext.set(key, value);
  }
}

// Hook to get values from request-scoped context (if available) or global context
export function useContext(key: string) {
  if (routeContext) {
    const routeValue = routeContext.middlewareContext.get(key);
    if (routeValue !== undefined) return routeValue;
    return globalContext.get(key);
  } else {
    return globalContext.get(key);
  }
}

// Middleware type definition
export type Middleware = (req: Request, next: () => any) => any;

// Stores all registered routes
const routes: {
  method: string;
  path: string;
  handler: Function;
  middlewares: Middleware[];
}[] = [];

// App-level configuration (e.g., port, cors)
let appConfig: { port?: number; cors?: boolean | cors.CorsOptions } = {};

// Recursively processes JSX-like elements (App, RouteGroup, Route, Middleware)
function processElement(
  element: any,
  pathPrefix: string = "",
  middlewares: Middleware[] = []
): void {
  if (!element) return;

  // If array, process each child
  if (Array.isArray(element)) {
    element.forEach((el) => processElement(el, pathPrefix, middlewares));
    return;
  }

  if (typeof element === "object") {
    // Handle functional components (custom wrappers)
    if (typeof element.type === "function") {
      const result = element.type(element.props || {});
      processElement(result, pathPrefix, middlewares);
      return;
    }

    if (element.type) {
      // <App /> component → set global app config
      if (element.type === "App" || (element.type && element.type.name === "App")) {
        const props = element.props || {};
        appConfig = {
          port: props.port || 9000,
          cors: props.cors,
        };
      }

      // <RouteGroup /> component → groups routes with prefix + middlewares
      if (element.type === "RouteGroup" || (element.type && element.type.name === "RouteGroup")) {
        const props = element.props || {};
        const groupPrefix = props.prefix ? `${pathPrefix}${props.prefix}` : pathPrefix;

        if (props.children) {
          const children = Array.isArray(props.children) ? props.children : [props.children];

          // Collect group-level middlewares
          const groupMiddlewares = [...middlewares];
          children.forEach((child: any) => {
            if (
              child &&
              typeof child === "object" &&
              (child.type === "Middleware" || (child.type && child.type.name === "Middleware"))
            ) {
              const middlewareProps = child.props || {};
              if (middlewareProps.use) {
                if (Array.isArray(middlewareProps.use)) {
                  groupMiddlewares.push(...middlewareProps.use);
                } else if (typeof middlewareProps.use === "function") {
                  groupMiddlewares.push(middlewareProps.use);
                }
              }
            }
          });

          // Process non-middleware children recursively
          children.forEach((child: any) => {
            if (
              !(
                child &&
                typeof child === "object" &&
                (child.type === "Middleware" || (child.type && child.type.name === "Middleware"))
              )
            ) {
              processElement(child, groupPrefix, groupMiddlewares);
            }
          });
        }
        return;
      }

      // <Route /> component → defines a single route
      if (element.type === "Route" || (element.type && element.type.name === "Route")) {
        const props = element.props || {};
        if (props.path && props.children) {
          // If method is missing → skip (falls back to 404)
          if (!props.method) {
            return;
          }

          const fullPath = `${pathPrefix}${props.path}`;

          // Merge group + route-level middlewares
          let routeMiddlewares = [...middlewares];
          if (props.middleware) {
            if (Array.isArray(props.middleware)) {
              routeMiddlewares.push(...props.middleware);
            } else {
              routeMiddlewares.push(props.middleware);
            }
          }

          // Register route
          routes.push({
            method: props.method.toLowerCase(),
            path: fullPath,
            handler: props.children,
            middlewares: routeMiddlewares,
          });
        }
        return;
      }
    }

    // Recursively process children of elements
    if (element.props && element.props.children) {
      if (Array.isArray(element.props.children)) {
        element.props.children.forEach((child: any) =>
          processElement(child, pathPrefix, middlewares)
        );
      } else {
        processElement(element.props.children, pathPrefix, middlewares);
      }
    }
  }
}

// Main function to start the server
export function serve(element: ReactNode) {
  // Reset routes & config before processing
  routes.length = 0;
  appConfig = {};

  // Process JSX tree
  processElement(element);

  const port = appConfig.port || 6969;
  const app = express();

  // Enable JSON parsing
  app.use(express.json());

  // Enable CORS if configured
  if (appConfig.cors) {
    app.use(cors(appConfig.cors === true ? {} : appConfig.cors));
  }

  // Helper: sends back correct response based on handler output
  const sendResponseFromOutput = (res: ExpressResponse, output: any): void => {
    if (!output) {
      if (!res.headersSent) res.status(500).json({ error: "No response generated" });
      return;
    }

    if (typeof output === "object") {
      const isResponseElement = Boolean(
        output.type && (output.type === "Response" || output.type?.name === "Response")
      );

      // <Response /> JSX element
      if (isResponseElement) {
        const { status = 200, json } = output.props || {};
        res.status(status);
        if (json !== undefined) {
          res.json(json);
        } else {
          res.end();
        }
        return;
      }

      // Invalid object returned
      if (!res.headersSent) {
        res.status(500).json({ error: "Invalid response format" });
      }
      return;
    }

    // If handler returned a string/number → send as text
    res.send(String(output));
  };

  // Wraps a handler + middlewares into an Express handler
  const createExpressHandler = (handler: Function, middlewares: Middleware[] = []) => {
    const wrapped: RequestHandler = async (req: Request, res: ExpressResponse) => {
      // Create request-scoped context
      routeContext = {
        req,
        res,
        params: req.params,
        query: req.query,
        body: req.body,
        middlewareContext: new Map<string, any>(),
      };

      try {
        let middlewareIndex = 0;

        // Execute middleware chain
        const executeNextMiddleware = async (): Promise<any> => {
          if (middlewareIndex >= middlewares.length) {
            return await handler();
          }
          const currentMiddleware = middlewares[middlewareIndex++];
          return await currentMiddleware(req, executeNextMiddleware);
        };

        const output = await executeNextMiddleware();
        sendResponseFromOutput(res, output);
      } catch (error) {
        console.error("Route handler error:", error);
        if (!res.headersSent) res.status(500).json({ error: "Internal server error" });
      } finally {
        // Reset context after request
        routeContext = null;
      }
    };
    return wrapped;
  };

  // Split routes into normal and wildcard (*) routes
  const regularRoutes = routes.filter((route) => route.path !== "*");
  const wildcardRoutes = routes.filter((route) => route.path === "*");

  // Register regular routes
  for (const route of regularRoutes) {
    const method = route.method.toLowerCase();

    // Map methods to express
    const registrar: Record<string, (path: string, ...handlers: RequestHandler[]) => any> = {
      get: app.get.bind(app),
      post: app.post.bind(app),
      put: app.put.bind(app),
      patch: app.patch.bind(app),
      delete: app.delete.bind(app),
      options: app.options.bind(app),
      head: app.head.bind(app),
      all: app.all.bind(app),
    };

    const register = registrar[method];
    if (register) {
      register(route.path, createExpressHandler(route.handler, route.middlewares));
    } else {
      console.warn(`Unsupported HTTP method: ${route.method}`);
    }
  }

  // Register wildcard (*) routes if defined
  const hasCustomWildcard = wildcardRoutes.length > 0;

  if (hasCustomWildcard) {
    for (const route of wildcardRoutes) {
      const method = route.method.toLowerCase();

      // Middleware for wildcard matching
      const methodSpecificWildcardHandler = async (
        req: Request,
        res: ExpressResponse,
        next: any
      ) => {
        if (method === "all" || req.method.toLowerCase() === method) {
          // Create request context
          routeContext = {
            req,
            res,
            params: req.params,
            query: req.query,
            body: req.body,
            middlewareContext: new Map<string, any>(),
          };
          try {
            let middlewareIndex = 0;

            const executeNextMiddleware = async (): Promise<any> => {
              if (middlewareIndex >= route.middlewares.length) {
                return await route.handler();
              }
              const currentMiddleware = route.middlewares[middlewareIndex++];
              return await currentMiddleware(req, executeNextMiddleware);
            };

            const output = await executeNextMiddleware();
            sendResponseFromOutput(res, output);
          } catch (error) {
            console.error("Wildcard route handler error:", error);
            if (!res.headersSent) res.status(500).json({ error: "Internal server error" });
          } finally {
            routeContext = null;
          }
        } else {
          next();
        }
      };

      app.use(methodSpecificWildcardHandler);
    }
  } else {
    // Default 404 handler if no wildcard route is defined
    app.use((req: Request, res: ExpressResponse) => {
      res.status(404).json({
        error: "Not Found",
        message: `Route ${req.method} ${req.originalUrl} not found`,
        path: req.originalUrl,
        method: req.method,
      });
    });
  }

  // Start server
  const server = app.listen(port, () => {
    console.log(`🚀 ReactServe running at http://localhost:${port}`);
    if (process.env.NODE_ENV !== "production") {
      console.log("🔥 Hot reload enabled - watching for file changes...");
    }
  });

  // Handle server-level errors
  server.on("error", (err) => {
    console.error("Server error:", err);
  });

  // Hot reload for development (watch .ts/.tsx files)
  if (process.env.NODE_ENV !== "production") {
    const watchPaths = ["."];
    watchPaths.forEach((watchPath) => {
      watch(watchPath, { recursive: true }, (eventType, filename) => {
        if (filename && (filename.endsWith(".ts") || filename.endsWith(".tsx"))) {
          console.log(`🔄 File changed: ${filename} - Restarting server...`);
          server.close(() => {
            process.exit(0);
          });
        }
      });
    });
  }

  return server;
}
