import express, { Request, Response as ExpressResponse } from "express";
import React, { ReactNode } from "react";
import { watch } from "fs";
import { join } from "path";

// Context to hold req/res for useRoute()
let routeContext: {
  req: Request;
  res: ExpressResponse;
  params: any;
  query: any;
  body: any;
} | null = null;

export function useRoute() {
  if (!routeContext) throw new Error("useRoute must be used inside a Route");
  return routeContext;
}

// Internal store for routes and config
const routes: { method: string; path: string; handler: Function }[] = [];
let appConfig: { port?: number } = {};

// Simple component processor - no reconciler needed
function processElement(element: any): void {
  if (!element) return;

  if (Array.isArray(element)) {
    element.forEach(processElement);
    return;
  }

  if (typeof element === "object" && element.type) {
    if (
      element.type === "App" ||
      (element.type && element.type.name === "App")
    ) {
      // Extract app configuration
      const props = element.props || {};
      appConfig = {
        port: props.port || 9000,
      };
    }

    if (
      element.type === "Route" ||
      (element.type && element.type.name === "Route")
    ) {
      // Handle Route component
      const props = element.props || {};
      if (props.method && props.path && props.children) {
        routes.push({
          method: props.method,
          path: props.path,
          handler: props.children,
        });
      }
    }

    // Process children
    if (element.props && element.props.children) {
      if (Array.isArray(element.props.children)) {
        element.props.children.forEach(processElement);
      } else {
        processElement(element.props.children);
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

  const port = appConfig.port || 9000;

  // Create express app
  const app = express();
  app.use(express.json());

  for (const route of routes) {
    const method = route.method.toLowerCase();
    if (method === "get") {
      app.get(route.path, async (req: Request, res: ExpressResponse) => {
        routeContext = {
          req,
          res,
          params: req.params,
          query: req.query,
          body: req.body,
        };
        try {
          const output = await route.handler();

          // Handle Response component
          if (output && typeof output === "object") {
            // Check if it's a React element with our Response type
            if (
              output.type &&
              (output.type.name === "Response" || output.type === "Response")
            ) {
              const { status = 200, json } = output.props || {};
              res.status(status);
              if (json !== undefined) {
                res.json(json);
              } else {
                res.end();
              }
            }
            // Check if it's our custom Response object format
            else if (output.type === "Response") {
              const { status = 200, json } = output.props || {};
              res.status(status);
              if (json !== undefined) {
                res.json(json);
              } else {
                res.end();
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
    console.log("🔥 Hot reload enabled - watching for file changes...");
  });

  server.on("error", (err) => {
    console.error("Server error:", err);
  });

  // Hot reload functionality
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
}
