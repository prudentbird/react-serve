import { createFileRoute } from '@tanstack/react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Route = createFileRoute('/docs/useroute')({
  component: UseRoutePage,
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

function UseRoutePage() {
  const basicExample = `import { useRoute, Response } from "react-serve-js";

<Route path="/users/:id" method="GET">
  {() => {
    const { params, query, body, req, res } = useRoute();
    return <Response json={{ userId: params.id }} />;
  }}
</Route>`;

  const paramsExample = `<Route path="/users/:id/posts/:postId" method="GET">
  {() => {
    const { params } = useRoute();
    // params.id and params.postId are available
    return <Response json={{ 
      userId: params.id, 
      postId: params.postId 
    }} />;
  }}
</Route>`;

  const queryExample = `<Route path="/search" method="GET">
  {() => {
    const { query } = useRoute();
    // ?q=react&limit=10 becomes { q: "react", limit: "10" }
    const results = searchPosts(query.q, parseInt(query.limit || "10"));
    return <Response json={results} />;
  }}
</Route>`;

  const bodyExample = `<Route path="/users" method="POST">
  {() => {
    const { body } = useRoute();
    // body contains the parsed JSON from request
    const newUser = {
      name: body.name,
      email: body.email,
      createdAt: new Date()
    };
    return <Response status={201} json={newUser} />;
  }}
</Route>`;

  const requestExample = `<Route path="/debug" method="GET">
  {() => {
    const { req, res } = useRoute();
    
    // Access Express request object
    const userAgent = req.headers['user-agent'];
    const method = req.method;
    const url = req.url;
    
    // You can also modify response headers
    res.setHeader('X-Custom-Header', 'debug-mode');
    
    return <Response json({ userAgent, method, url }) />;
  }}
</Route>`;

  return (
    <div className="space-y-8">
      <h1 className="text-xl mb-2">useRoute</h1>
      <p className="text-sm text-zinc-400 mb-6">
        The <code>useRoute()</code> hook provides access to request data and the Express request/response objects within route handlers.
      </p>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Basic Usage</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={basicExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Return Values</h2>
        <div className="space-y-3 text-sm">
          <div>
            <code className="text-zinc-300">params</code>
            <span className="text-zinc-500 ml-2">Record&lt;string, string&gt;</span>
            <p className="text-zinc-400 text-xs mt-1">Path parameters extracted from the URL (e.g., <code>:id</code>).</p>
          </div>
          <div>
            <code className="text-zinc-300">query</code>
            <span className="text-zinc-500 ml-2">Record&lt;string, string&gt;</span>
            <p className="text-zinc-400 text-xs mt-1">Query string parameters parsed from the URL.</p>
          </div>
          <div>
            <code className="text-zinc-300">body</code>
            <span className="text-zinc-500 ml-2">any</span>
            <p className="text-zinc-400 text-xs mt-1">Parsed request body (JSON for POST/PUT requests).</p>
          </div>
          <div>
            <code className="text-zinc-300">req</code>
            <span className="text-zinc-500 ml-2">Express.Request</span>
            <p className="text-zinc-400 text-xs mt-1">The raw Express request object.</p>
          </div>
          <div>
            <code className="text-zinc-300">res</code>
            <span className="text-zinc-500 ml-2">Express.Response</span>
            <p className="text-zinc-400 text-xs mt-1">The raw Express response object.</p>
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
        <h2 className="text-base mb-2 text-zinc-300">Query Parameters</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={queryExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Request Body</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={bodyExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Express Objects</h2>
        <p className="text-xs text-zinc-500 mb-2">Access raw Express request and response for advanced use cases</p>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={requestExample} />
        </div>
      </section>
    </div>
  );
}
