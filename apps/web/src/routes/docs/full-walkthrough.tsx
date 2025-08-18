import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/full-walkthrough')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Full Walkthrough</h1>
      <p className="text-zinc-300">
        A comprehensive video tutorial that will walk you through building a complete application with React Serve.
      </p>
      
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden aspect-video">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-zinc-800 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-zinc-300 mb-2">Coming Soon</h3>
            <p className="text-zinc-500">Full video walkthrough will be available soon.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
