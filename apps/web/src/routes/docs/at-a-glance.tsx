

import { createFileRoute } from '@tanstack/react-router'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';


export const Route = createFileRoute('/docs/at-a-glance')({
  component: RouteComponent,
})

function CodeBlock({ code }: { code: string }) {
  return (
    <SyntaxHighlighter
      language="jsx"
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



function RouteComponent() {
    const code = `import { App, Route, RouteGroup, Middleware, useRoute, useContext, Response } from "react-serve-js";

<App port={6969}>
  <Route path="/" method="GET">
    {async () => {
      return <Response json={{ message: "Hello ReactServe" }} />;
    }}
  </Route>

  <RouteGroup prefix="/api">
    <Middleware use={authMiddleware} />
    
    <Route path="/users/:id" method="GET">
      {async () => {
        const { params } = useRoute();
        const user = useContext("user");
        return <Response json={{ userId: params.id, currentUser: user }} />;
      }}
    </Route>
  </RouteGroup>
</App>`;

  return (
    <div className="space-y-8">
      <h1 className="text-xl mb-2">At a Glance</h1>
      <p className="text-base text-zinc-400 mb-6">
        ReactServe is a React-inspired, component-based framework for building backend HTTP servers.
      </p>
      <div>
        <p className="mb-2">Here is a simple hello world in ReactServe</p>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={code} />
        </div>
      </div>
    </div>
  )
}
