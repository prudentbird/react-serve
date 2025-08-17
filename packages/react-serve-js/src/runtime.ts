import express, { Request, Response as ExpressResponse } from "express";
import { ReactNode } from "react";
import { watch } from "fs";
import cors from "cors";

// Context to hold req/res for useRoute() and middleware context
let routeContext: {
  req: Request;
  res: ExpressResponse;
  params: any;
  query: any;
  body: any;
  middlewareContext: Map<string, any>;
} | null = null;

export function useRoute() {
  if (!routeContext) throw new Error("useRoute must be used inside a Route");
  return routeContext;
}

export function useSetContext(key: string, value: any) {
  if (!routeContext)
    throw new Error("useSetContext must be used inside a Route or Middleware");
  routeContext.middlewareContext.set(key, value);
}

export function useContext(key: string) {
  if (!routeContext)
    throw new Error("useContext must be used inside a Route or Middleware");
  return routeContext.middlewareContext.get(key);
}

// Middleware type
export type Middleware = (req: Request, next: () => any) => any;

// Internal store for routes, middlewares and config
const routes: {
  method: string;
  path: string;
  handler: Function;
  middlewares: Middleware[];
}[] = [];
let appConfig: { port?: number; cors?: boolean | cors.CorsOptions } = {};

// Component processor
function processElement(
  element: any,
  pathPrefix: string = "",
  middlewares: Middleware[] = []
): void {
  if (!element) return;

  if (Array.isArray(element)) {
    element.forEach((el) => processElement(el, pathPrefix, middlewares));
    return;
  }

  if (typeof element === "object") {
    // Handle React elements with function components
    if (typeof element.type === "function") {
      // Call the function component to get its JSX result
      const result = element.type(element.props || {});
      processElement(result, pathPrefix, middlewares);
      return;
    }

    if (element.type) {
      if (
        element.type === "App" ||
        (element.type && element.type.name === "App")
      ) {
        // Extract app configuration
        const props = element.props || {};
        appConfig = {
          port: props.port || 9000,
          cors: props.cors,
        };
      }

      if (
        element.type === "RouteGroup" ||
        (element.type && element.type.name === "RouteGroup")
      ) {
        // Handle RouteGroup component
        const props = element.props || {};
        const groupPrefix = props.prefix
          ? `${pathPrefix}${props.prefix}`
          : pathPrefix;

        // Process children to collect middlewares and routes
        if (props.children) {
          const children = Array.isArray(props.children)
            ? props.children
            : [props.children];

          // First pass: collect all middleware components in this group
          const groupMiddlewares = [...middlewares];
          children.forEach((child: any) => {
            if (
              child &&
              typeof child === "object" &&
              (child.type === "Middleware" ||
                (child.type && child.type.name === "Middleware"))
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

          // Second pass: process all children with the accumulated middlewares
          children.forEach((child: any) => {
            // Skip middleware components in second pass since we already processed them
            if (
              !(
                child &&
                typeof child === "object" &&
                (child.type === "Middleware" ||
                  (child.type && child.type.name === "Middleware"))
              )
            ) {
              processElement(child, groupPrefix, groupMiddlewares);
            }
          });
        }
        return;
      }

      if (
        element.type === "Route" ||
        (element.type && element.type.name === "Route")
      ) {
        const props = element.props || {};
        if (props.method && props.path && props.children) {
          const fullPath = `${pathPrefix}${props.path}`;

          // Combine RouteGroup middlewares with Route-level middlewares
          let routeMiddlewares = [...middlewares];

          if (props.middleware) {
            if (Array.isArray(props.middleware)) {
              routeMiddlewares.push(...props.middleware);
            } else {
              routeMiddlewares.push(props.middleware);
            }
          }

          routes.push({
            method: props.method,
            path: fullPath,
            handler: props.children,
            middlewares: routeMiddlewares,
          });
        }
        return;
      }
    }

    // Process children for non-RouteGroup elements
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

export function serve(element: ReactNode) {
  // Clear routes and config before processing
  routes.length = 0;
  appConfig = {};

  // Process the React element tree to extract routes and config
  processElement(element);

  const port = appConfig.port || 6969;

  // Express
  const app = express();
  app.use(express.json());
  
  // Apply CORS if enabled in App props
  if (appConfig.cors) {
    app.use(cors(appConfig.cors === true ? {} : appConfig.cors));
  }

  for (const route of routes) {
    const method = route.method.toLowerCase();
    if (method === "get") {
      app.get(route.path, async (req: Request, res: ExpressResponse) => {
        // Initialize route context with middleware context map
        routeContext = {
          req,
          res,
          params: req.params,
          query: req.query,
          body: req.body,
          middlewareContext: new Map(),
        };

        try {
          // Execute middlewares in order
          let middlewareResult: any = null;
          let shouldContinue = true;

          for (let i = 0; i < route.middlewares.length && shouldContinue; i++) {
            const middleware = route.middlewares[i];

            // Create next function for this middleware
            const next = () => {
              return { __isNext: true };
            };

            middlewareResult = await middleware(req, next);

            // If middleware returns next(), continue to next middleware
            // If middleware returns a Response, stop execution
            if (middlewareResult && middlewareResult.__isNext) {
              middlewareResult = null; // Clear the next result
            } else if (middlewareResult) {
              shouldContinue = false; // Stop processing middlewares
            }
          }

          let output: any;

          // If middleware returned a response, use that; otherwise run the route handler
          if (middlewareResult) {
            output = middlewareResult;
          } else {
            output = await route.handler();
          }

          // Handle Response component
          if (output && typeof output === "object") {
            // Check if it's a React element with our Response type
            if (
              output.type &&
              (output.type.name === "Response" || output.type === "Response")
            ) {
              const { 
                status = 200, 
                json, 
                text, 
                html, 
                headers = {}, 
                redirect 
              } = output.props || {};
              
              // Set status code
              res.status(status);
              
              // Set custom headers if provided
              if (headers && typeof headers === 'object') {
                Object.entries(headers).forEach(([key, value]) => {
                  res.setHeader(key, value as string);
                });
              }
              
              // Handle redirect if provided
              if (redirect && typeof redirect === 'string') {
                return res.redirect(status, redirect);
              }
              
              // Handle response body based on what was provided
              if (json !== undefined) {
                return res.json(json);
              } else if (text !== undefined) {
                res.setHeader('Content-Type', 'text/plain');
                return res.send(text);
              } else if (html !== undefined) {
                res.setHeader('Content-Type', 'text/html');
                return res.send(html);
              } else {
                return res.end();
              }
            }
            // Check if it's our custom Response object format
            else if (output.type === "Response") {
              const { 
                status = 200, 
                json, 
                text, 
                html, 
                headers = {}, 
                redirect 
              } = output.props || {};
              
              // Set status code
              res.status(status);
              
              // Set custom headers if provided
              if (headers && typeof headers === 'object') {
                Object.entries(headers).forEach(([key, value]) => {
                  res.setHeader(key, value as string);
                });
              }
              
              // Handle redirect if provided
              if (redirect && typeof redirect === 'string') {
                return res.redirect(status, redirect);
              }
              
              // Handle response body based on what was provided
              if (json !== undefined) {
                return res.json(json);
              } else if (text !== undefined) {
                res.setHeader('Content-Type', 'text/plain');
                return res.send(text);
              } else if (html !== undefined) {
                res.setHeader('Content-Type', 'text/html');
                return res.send(html);
              } else {
                return res.end();
              }
            } else {
              // If no response was sent, send a default response
              if (!res.headersSent) {
                res.status(500).json({ error: "Invalid response format" });
              }
            }
          } else if (output && typeof output !== "object") {
            res.send(String(output));
          } else {
            // If no response was sent, send a default response
            if (!res.headersSent) {
              res.status(500).json({ error: "No response generated" });
            }
          }
        } catch (error) {
          console.error("Route handler error:", error);
          if (!res.headersSent) {
            res.status(500).json({ error: "Internal server error" });
          }
        } finally {
          routeContext = null;
        }
      });
    }
  }

  const server = app.listen(port, () => {
    console.log(`🚀 ReactServe running at http://localhost:${port}`);
    if (process.env.NODE_ENV !== "production") {
      console.log("🔥 Hot reload enabled - watching for file changes...");
    }
  });

  server.on("error", (err) => {
    console.error("Server error:", err);
  });

  // Hot reload
  if (process.env.NODE_ENV !== "production") {
    const watchPaths = ["."];
    watchPaths.forEach((watchPath) => {
      watch(watchPath, { recursive: true }, (eventType, filename) => {
        if (
          filename &&
          (filename.endsWith(".ts") || filename.endsWith(".tsx"))
        ) {
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
