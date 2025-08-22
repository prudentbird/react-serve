# ReactServe

> React-style backend framework for building APIs with JSX

ReactServe lets you build backend APIs using React-style JSX syntax. Define routes, handle requests, and send responses all within familiar JSX components.

## Installation

```bash
npm install react-serve-js
```

## Quick Start

```bash
npx create-react-serve my-api
cd my-api
npm install
npm run dev
```

## Components

### `<App>`

The root component that configures your server.

**Props:**

- `port?: number` - Port to run the server on (default: 9000)
- `cors?: boolean | CorsOptions` - Enable CORS middleware. Pass `true` to enable with default options, or pass a CORS options object for custom configuration.

### `<Route>`

Defines an API endpoint.

**Props:**

- `path: string` - URL path pattern (supports Express.js route parameters)
- `method: string` - HTTP method (GET, POST, PUT, DELETE, etc.)
- `middleware?: MiddlewareFunction | MiddlewareFunction[]` - Route-level middleware(s) to run before the handler
- `children: () => Promise<ReactElement>` - Async function that handles the request

### `<Middleware>`

Executes middleware functions for request processing, authentication, logging, etc.

**Props:**

- `use: MiddlewareFunction | MiddlewareFunction[]` - The middleware function or array of middleware functions to execute

**Example:**

```tsx
import { type MiddlewareFunction } from "react-serve-js";

const authMiddleware: MiddlewareFunction = (req, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return <Response status={401} json={{ error: "Unauthorized" }} />;
  }

  // Attach user data to request context
  useSetContext("user", { id: 1, name: "John" });

  return next(); // Continue to next middleware or route handler
};

<RouteGroup prefix="/api">
  {/* Single middleware */}
  <Middleware use={authMiddleware} />

  {/* Or multiple middleware as an array */}
  <RouteGroup prefix="/v2">
    <Middleware
      use={[loggingMiddleware, rateLimitMiddleware, authMiddleware]}
    />
    <Route path="/users" method="GET">
      {() => {
        const user = useContext("user");
        return <Response json={user} />;
      }}
    </Route>
  </RouteGroup>
</RouteGroup>;
```

### `<RouteGroup>`

Groups routes together with a shared path prefix.

**Props:**

- `prefix?: string` - Path prefix to apply to all child routes
- `children: ReactNode` - Child routes and route groups

**Example:**

```tsx
<RouteGroup prefix="/api">
  <Route path="/users" method="GET">
    {async () => <Response json={users} />}
  </Route>
  {/* This becomes /api/users */}

  <RouteGroup prefix="/v1">
    <Route path="/posts" method="GET">
      {async () => <Response json={posts} />}
    </Route>
    {/* This becomes /api/v1/posts */}
  </RouteGroup>
</RouteGroup>
```

### `<Response>`

Sends a response back to the client.

**Props:**

- `json?: any` - JSON data to send
- `status?: number` - HTTP status code (default: 200)

Note: The runtime currently processes `json` and `status`.

### `<FileRoutes>`

Automatically registers routes based on your file system, similar to Next.js or TanStack Router.

**Props:**

- `dir: string` - Directory to scan for file-based routes (absolute or relative to `process.cwd()`).
- `prefix?: string` - Optional URL prefix for all discovered routes.

**Conventions:**

- Place a `route.tsx` (or `route.ts/js/tsx/jsx`) file inside any directory to define a route for that directory's URL path.
- File exports map to HTTP methods by name: export `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`, `HEAD`. A `default` export is treated as `GET` if `GET` is not exported.
- Directory names map to URL segments:
  - `users` -> `/users`
  - `[id]` -> `/:id` (dynamic segment)
  - `[...slug]` -> `/:slug` (currently behaves like a single dynamic segment)
  - `[[...slug]]` -> `/:slug` (currently behaves like a single dynamic segment)
  - `(group)` -> skipped (route group folder for organization)
- Directory-level `_middleware.(ts|tsx|js|jsx)` applies to that folder and all subroutes.

Note: Multi-segment catch-all matching is not yet supported.

**Example:**

```
src/
  routes/
    (marketing)/
      route.tsx            // -> GET / (default export)
    api/
      _middleware.ts       // -> applies to /api/**
      users/
        route.ts           // -> methods exported map to /api/users
      users/[id]/
        route.ts           // -> /api/users/:id
      files/[[...path]]/
        route.ts           // -> /api/files/:path*
```

```tsx
import { App, FileRoutes, Response } from "react-serve-js";

export default function Backend() {
  return (
    <App port={6969}>
      <FileRoutes dir="src/routes" prefix="/" />
    </App>
  );
}

// src/routes/api/users/route.ts
export async function GET() {
  return <Response json={{ users: [] }} />;
}

export async function POST() {
  return <Response status={201} json={{ ok: true }} />;
}

// src/routes/api/users/[id]/route.ts
export default async function GET() {
  // default export acts as GET
  const { params } = useRoute();
  return <Response json={{ id: params.id }} />;
}
```

## Hooks

### `useRoute()`

Access request data within route handlers.

```tsx
const { params, query, body, req, res } = useRoute();
```

Returns:

- `params` - URL parameters
- `query` - Query string parameters
- `body` - Request body
- `req` - Express request object
- `res` - Express response object

### `useSetContext(key, value)`

Store data in the request context (available in middleware).

```tsx
const authMiddleware: MiddlewareFunction = (req, next) => {
  useSetContext("user", { id: 1, name: "John" });
  return next();
};
```

### `useContext(key)`

Retrieve data from the request context (available in route handlers and middleware).

```tsx
<Route path="/me" method="GET">
  {() => {
    const user = useContext("user");
    return <Response json={user} />;
  }}
</Route>
```

## Features

- 🔥 **Hot Reload** - Automatic server restart on file changes (development)
- 🎯 **Type Safe** - Full TypeScript support
- ⚡ **Fast** - Built on Express.js
- 🧩 **Composable** - Use React patterns for API logic
- 🛡️ **Middleware Support** - Authentication, logging, and custom middleware
- 🗂️ **Route Grouping** - Organize routes with shared prefixes
- 📦 **Zero Config** - Works out of the box
