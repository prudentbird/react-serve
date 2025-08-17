import { createFileRoute } from '@tanstack/react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Route = createFileRoute('/docs/routegroup')({
  component: RouteGroupPage,
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

function RouteGroupPage() {
  const basicExample = `<RouteGroup prefix="/api">
  <Route path="/users" method="GET">
    {() => <Response json={{ users: [] }} />}
  </Route>
  <Route path="/posts" method="GET">
    {() => <Response json={{ posts: [] }} />}
  </Route>
</RouteGroup>`;

  const middlewareExample = `<RouteGroup prefix="/api">
  <Middleware use={[authMiddleware, loggingMiddleware]} />
  
  <Route path="/users" method="GET">
    {() => <Response json={{ users: [] }} />}
  </Route>
  <Route path="/admin" method="GET">
    {() => <Response json={{ admin: true }} />}
  </Route>
</RouteGroup>`;

  const nestedExample = `<RouteGroup prefix="/api">
  <Middleware use={authMiddleware} />
  
  <RouteGroup prefix="/v1">
    <Route path="/users" method="GET">
      {() => <Response json={{ version: "v1", users: [] }} />}
    </Route>
  </RouteGroup>
  
  <RouteGroup prefix="/v2">
    <Middleware use={rateLimitMiddleware} />
    <Route path="/users" method="GET">
      {() => <Response json={{ version: "v2", users: [] }} />}
    </Route>
  </RouteGroup>
</RouteGroup>`;

  return (
    <div className="space-y-8">
      <h1 className="text-xl mb-2">RouteGroup</h1>
      <p className="text-sm text-zinc-400 mb-6">
        The <code>&lt;RouteGroup&gt;</code> component groups related routes under a common path prefix and allows sharing middleware between them.
      </p>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Basic Usage</h2>
        <p className="text-xs text-zinc-500 mb-2">Routes inside this group will be prefixed with <code>/api</code></p>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={basicExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Props</h2>
        <div className="space-y-3 text-sm">
          <div>
            <code className="text-zinc-300">prefix</code>
            <span className="text-zinc-500 ml-2">string (required)</span>
            <p className="text-zinc-400 text-xs mt-1">The path prefix to prepend to all child routes.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Shared Middleware</h2>
        <p className="text-xs text-zinc-500 mb-2">Middleware defined in a group applies to all child routes</p>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={middlewareExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Nested Groups</h2>
        <p className="text-xs text-zinc-500 mb-2">RouteGroups can be nested for complex API versioning and organization</p>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={nestedExample} />
        </div>
      </section>
    </div>
  );
}
