import { App, FileRoutes, Middleware, RouteGroup, Response, type MiddlewareFunction } from "react-serve-js";

// Global middlewares reusable across groups
const loggingMiddleware: MiddlewareFunction = (req, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  return next();
};

const attachRequestMeta: MiddlewareFunction = (req, next) => {
  // Store metadata that handlers can read via useContext
  return next();
};

export default function Backend() {
  return (
    <App port={7070} cors={true}>
      <RouteGroup prefix="/api">
        <Middleware use={[loggingMiddleware, attachRequestMeta]} />
        {/* File-based routes under src/routes will be mounted at /api */}
        <FileRoutes dir={__dirname + "/routes"} />
      </RouteGroup>

      {/* A catch-all custom fallback can also be added using JSX routes if desired */}
    </App>
  );
}


