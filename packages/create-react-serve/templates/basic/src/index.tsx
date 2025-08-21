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
} from "react-serve-js";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

// Example logging middleware
const loggingMiddleware: MiddlewareFunction = (req, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  useSetContext("timestamp", Date.now());
  return next();
};

function Backend() {
  return (
    <App 
      port={6969}
      cors={true} // Enable CORS for all routes with default options
    >
      <Route path="/" method="GET">
        {async () => {
          return <Response json={{ message: "Welcome to ReactServe!" }} />;
        }}
      </Route>

      <RouteGroup prefix="/api">
        <Middleware use={loggingMiddleware} />

        <Route path="/users" method="GET">
          {async () => {
            const timestamp = useContext("timestamp");
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
            const timestamp = useContext("timestamp");
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
            const timestamp = useContext("timestamp");
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
      <Route path="*" method="ALL">
        {async () => {
          return <Response json={{ message: "Page Not Found" }} status={404} />;
        }}
      </Route>
    </App>
  );
}

serve(Backend());
