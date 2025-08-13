import { App, Route, Response, useRoute, serve } from "./";

// Mock data
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

export default function Backend() {
  return (
    <App port={3000}>
      <Route path="/users" method="GET">
        {async () => {
          const users = mockUsers;
          return <Response json={users} />;
        }}
      </Route>

      <Route path="/users/:id" method="GET">
        {async () => {
          const { params } = useRoute();
          const user = mockUsers.find((u) => u.id === Number(params.id));
          return user ? (
            <Response json={user} />
          ) : (
            <Response status={404} json={{ error: "User not found" }} />
          );
        }}
      </Route>
    </App>
  );
}

// Start the server
serve(Backend());
