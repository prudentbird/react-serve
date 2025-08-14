# Reactend

> React-style backend framework for building APIs with JSX

Reactend lets you build backend APIs using React-style JSX syntax. Define routes, handle requests, and send responses all within familiar JSX components.

## Installation

```bash
npx create-react-serve my-api
```

## Quick Start

```tsx
import { App, Route, Response, useRoute, serve } from "react-serve-js";

function Backend() {
  return (
    <App port={3000}>
      <Route path="/" method="GET">
        {async () => {
          return <Response json={{ message: "Hello World!" }} />;
        }}
      </Route>

      <Route path="/users/:id" method="GET">
        {async () => {
          const { params } = useRoute();
          return <Response json={{ userId: params.id }} />;
        }}
      </Route>
    </App>
  );
}

serve(Backend());
```

## Components

### `<App>`

The root component that configures your server.

**Props:**

- `port?: number` - Port to run the server on (default: 9000)

### `<Route>`

Defines an API endpoint.

**Props:**

- `path: string` - URL path pattern (supports Express.js route parameters)
- `method: string` - HTTP method (GET, POST, PUT, DELETE, etc.)
- `children: () => Promise<ReactElement>` - Async function that handles the request

### `<Response>`

Sends a response back to the client.

**Props:**

- `json?: any` - JSON data to send
- `status?: number` - HTTP status code (default: 200)

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

## Features

- 🔥 **Hot Reload** - Automatic server restart on file changes (development)
- 🎯 **Type Safe** - Full TypeScript support
- ⚡ **Fast** - Built on Express.js
- 🧩 **Composable** - Use React patterns for API logic
- 📦 **Zero Config** - Works out of the box
