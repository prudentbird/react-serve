import { createFileRoute } from '@tanstack/react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Route = createFileRoute('/docs/response')({
  component: ResponsePage,
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

function ResponsePage() {
  const basicExample = `<Route path="/users" method="GET">
  {() => <Response json={{ users: [] }} />}
</Route>`;

  const statusExample = `<Route path="/users" method="POST">
  {() => {
    const { body } = useRoute();
    const user = createUser(body);
    return <Response status={201} json={user} />;
  }}
</Route>`;

  const headersExample = `<Route path="/file" method="GET">
  {() => (
    <Response 
      status={200}
      headers={{ 
        'Content-Type': 'text/plain',
        'Cache-Control': 'max-age=3600'
      }}
      text="Hello World"
    />
  )}
</Route>`;

  const errorExample = `<Route path="/protected" method="GET">
  {() => {
    const token = useRoute().req.headers.authorization;
    if (!token) {
      return <Response status={401} json={{ error: "Unauthorized" }} />;
    }
    return <Response json={{ message: "Access granted" }} />;
  }}
</Route>`;

  const redirectExample = `<Route path="/old-path" method="GET">
  {() => <Response status={301} redirect="/new-path" />}
</Route>`;

  return (
    <div className="space-y-8">
      <h1 className="text-xl mb-2">Response</h1>
      <p className="text-sm text-zinc-400 mb-6">
        The <code>&lt;Response&gt;</code> component defines the HTTP response for a route. It sets the status code, headers, and body content.
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
            <code className="text-zinc-300">status</code>
            <span className="text-zinc-500 ml-2">number (default: 200)</span>
            <p className="text-zinc-400 text-xs mt-1">HTTP status code for the response.</p>
          </div>
          <div>
            <code className="text-zinc-300">json</code>
            <span className="text-zinc-500 ml-2">any (optional)</span>
            <p className="text-zinc-400 text-xs mt-1">JSON data to send. Sets Content-Type to application/json.</p>
          </div>
          <div>
            <code className="text-zinc-300">text</code>
            <span className="text-zinc-500 ml-2">string (optional)</span>
            <p className="text-zinc-400 text-xs mt-1">Plain text to send. Sets Content-Type to text/plain.</p>
          </div>
          <div>
            <code className="text-zinc-300">html</code>
            <span className="text-zinc-500 ml-2">string (optional)</span>
            <p className="text-zinc-400 text-xs mt-1">HTML to send. Sets Content-Type to text/html.</p>
          </div>
          <div>
            <code className="text-zinc-300">headers</code>
            <span className="text-zinc-500 ml-2">Record&lt;string, string&gt; (optional)</span>
            <p className="text-zinc-400 text-xs mt-1">Custom headers to set on the response.</p>
          </div>
          <div>
            <code className="text-zinc-300">redirect</code>
            <span className="text-zinc-500 ml-2">string (optional)</span>
            <p className="text-zinc-400 text-xs mt-1">URL to redirect to. Usually used with 301/302 status codes.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Custom Status Code</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={statusExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Custom Headers</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={headersExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Error Responses</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={errorExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Redirects</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={redirectExample} />
        </div>
      </section>
    </div>
  );
}
