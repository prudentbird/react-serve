import { createFileRoute } from '@tanstack/react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Route = createFileRoute('/docs/key-concepts')({
  component: KeyConceptsPage,
});

function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={tomorrow}
      customStyle={{
        background: "transparent",
        padding: 0,
        margin: 0,
        fontSize: "0.95rem",
        borderRadius: "0.5rem",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}

function KeyConceptsPage() {
  const appExample = `<App port={6969}>
  {/* Your routes go here */}
</App>`;

  const routeExample = `<Route path="/users/:id" method="GET">
  {() => {
    const { params } = useRoute();
    return <Response json={{ userId: params.id }} />;
  }}
</Route>`;

  const routeGroupExample = `<RouteGroup prefix="/api">
  <Middleware use={authMiddleware} />
  <Route path="/users" method="GET">
    {() => <Response json={{ users: [] }} />}
  </Route>
  <Route path="/posts" method="GET">
    {() => <Response json={{ posts: [] }} />}
  </Route>
</RouteGroup>`;

  const middlewareExample = `const authMiddleware = (req, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return <Response status={401} json={{ error: "Unauthorized" }} />;
  }
  useSetContext("user", getUserFromToken(token));
  return next();
};`;

  const hooksExample = `function UserRoute() {
  const { params, query, body } = useRoute();
  const user = useContext("user");
  
  useSetContext("requestTime", Date.now());
  
  return <Response json={{ userId: params.id, user }} />;
}`;

  return (
    <div className="space-y-8">
      <h1 className="text-xl mb-2">Key Concepts</h1>
      <p className="text-sm text-zinc-400 mb-6">
        ReactServe uses familiar React patterns to build backend APIs. Here are the core concepts.
      </p>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">App</h2>
        <p className="text-sm text-zinc-400 mb-2">
          The root component that wraps your entire application and configures the server port.
        </p>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={appExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Routes</h2>
        <p className="text-sm text-zinc-400 mb-2">
          Define HTTP endpoints using the <code>&lt;Route&gt;</code> component. Supports path parameters, query strings, and request bodies.
        </p>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={routeExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Route Groups</h2>
        <p className="text-sm text-zinc-400 mb-2">
          Group related routes under a common prefix and share middleware between them.
        </p>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={routeGroupExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Middleware</h2>
        <p className="text-sm text-zinc-400 mb-2">
          Functions that run before route handlers. Can modify requests, set context, or short-circuit responses.
        </p>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={middlewareExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Hooks</h2>
        <p className="text-sm text-zinc-400 mb-2">
          ReactServe provides hooks for accessing request data and sharing context between middleware and routes.
        </p>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={hooksExample} />
        </div>
        <ul className="list-disc list-inside space-y-1 text-xs text-zinc-500 mt-2">
          <li><code>useRoute()</code> - Access params, query, body, and request/response objects</li>
          <li><code>useContext(key)</code> - Get shared data from middleware context</li>
          <li><code>useSetContext(key, value)</code> - Set shared data in middleware context</li>
        </ul>
      </section>
    </div>
  );
}
