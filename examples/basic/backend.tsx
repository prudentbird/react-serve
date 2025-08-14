import {
  App,
  Route,
  RouteGroup,
  Middleware,
  Response,
  useRoute,
  useSetContext,
  useContext,
  serve,
  type MiddlewareFunction,
  //@ts-ignore
} from "../../packages/react-serve-js/src";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

// Auth middleware example
const authMiddleware: MiddlewareFunction = (req, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return <Response status={401} json={{ error: "Unauthorized" }} />;
  }

  // In a real app, you'd validate the token here
  // For demo purposes, we'll just check if it equals "valid-token"
  if (token !== "valid-token") {
    return <Response status={401} json={{ error: "Invalid token" }} />;
  }

  // Attach user to context so the route can use it
  useSetContext("user", {
    id: 1,
    name: "Titanium",
    email: "admin@example.com",
  });

  return next();
};

// Logging middleware example
const loggingMiddleware: MiddlewareFunction = (req, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);

  // Add request timestamp to context
  useSetContext("requestTimestamp", Date.now());

  return next();
};

export default function Backend() {
  return (
    <App port={3000}>
      <Route path="/" method="GET">
        {async () => {
          return <Response json={{ message: "Welcome to ReactServe!" }} />;
        }}
      </Route>

      {/* Public API routes */}
      <RouteGroup prefix="/api">
        <Middleware use={loggingMiddleware} />

        <Route path="/users" method="GET">
          {async () => {
            const timestamp = useContext("requestTimestamp");
            return (
              <Response
                json={{
                  users: mockUsers,
                  requestedAt: timestamp,
                }}
              />
            );
          }}
        </Route>

        <Route path="/users/:id" method="GET">
          {async () => {
            const { params } = useRoute();
            const timestamp = useContext("requestTimestamp");
            const user = mockUsers.find((u) => u.id === Number(params.id));
            return user ? (
              <Response json={{ ...user, requestedAt: timestamp }} />
            ) : (
              <Response status={404} json={{ error: "User not found" }} />
            );
          }}
        </Route>

        <Route path="/health" method="GET">
          {async () => {
            const timestamp = useContext("requestTimestamp");
            return (
              <Response
                json={{
                  status: "OK",
                  timestamp: new Date().toISOString(),
                  requestedAt: timestamp,
                }}
              />
            );
          }}
        </Route>
      </RouteGroup>

      {/* Protected API routes */}
      <RouteGroup prefix="/api/protected">
        <Middleware use={loggingMiddleware} />
        <Middleware use={authMiddleware} />

        <Route path="/me" method="GET">
          {async () => {
            const user = useContext("user");
            const timestamp = useContext("requestTimestamp");
            return (
              <Response
                json={{
                  ...user,
                  requestedAt: timestamp,
                }}
              />
            );
          }}
        </Route>

        <Route path="/admin/stats" method="GET">
          {async () => {
            const user = useContext("user");
            const timestamp = useContext("requestTimestamp");
            return (
              <Response
                json={{
                  totalUsers: mockUsers.length,
                  adminUser: user,
                  requestedAt: timestamp,
                }}
              />
            );
          }}
        </Route>
      </RouteGroup>
    </App>
  );
}

// Start the server
serve(Backend());
