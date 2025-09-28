import { createFileRoute } from '@tanstack/react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Route = createFileRoute('/docs/route/')({
  component: RoutePage,
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

function RoutePage() {
  const basicExample = `<Route path="/users" method="GET">
  {() => <Response json={{ users: [] }} />}
</Route>`;

  const paramsExample = `<Route path="/users/:id" method="GET">
  {() => {
    const { params } = useRoute();
    return <Response json={{ userId: params.id }} />;
  }}
</Route>`;

  const postExample = `<Route path="/users" method="POST">
  {() => {
    const { body } = useRoute();
    const newUser = createUser(body);
    return <Response status={201} json={newUser} />;
  }}
</Route>`;

  const queryExample = `<Route path="/search" method="GET">
  {() => {
    const { query } = useRoute();
    const results = searchUsers(query.q, query.limit);
    return <Response json={results} />;
  }}
</Route>`;

  return (
    <div className="space-y-8">
      <h1 className="text-xl mb-2">Route</h1>
      <p className="text-sm text-zinc-400 mb-6">
        The <code>&lt;Route&gt;</code> component defines HTTP endpoints in your API. Each route handles a specific path and method combination.
      </p>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Basic Usage</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={basicExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Props</h2>
        <div className="space-y-3 text-sm">
          <div>
            <code className="text-zinc-300">path</code>
            <span className="text-zinc-500 ml-2">string (required)</span>
            <p className="text-zinc-400 text-xs mt-1">The URL path pattern. Supports parameters like <code>:id</code>.</p>
          </div>
          <div>
            <code className="text-zinc-300">method</code>
            <span className="text-zinc-500 ml-2">"GET" | "POST" | "PUT" | "DELETE" | "PATCH" (required)</span>
            <p className="text-zinc-400 text-xs mt-1">The HTTP method this route responds to.</p>
          </div>
          <div>
            <code className="text-zinc-300">middleware</code>
            <span className="text-zinc-500 ml-2">MiddlewareFunction | MiddlewareFunction[] (optional)</span>
            <p className="text-zinc-400 text-xs mt-1">Middleware functions to run before the route handler.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Path Parameters</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={paramsExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Request Body</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={postExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Query Parameters</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={queryExample} />
        </div>
      </section>
    </div>
  );
}
