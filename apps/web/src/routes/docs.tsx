import React, { useState, useEffect } from 'react'
import { 
  createFileRoute, 
  Outlet, 
  Link, 
  useRouter,
  useMatches
} from '@tanstack/react-router'

export const Route = createFileRoute('/docs')({
  component: RouteComponent,
})




const ALL_DOC_ROUTES = [
  { label: "At a Glance", path: "/docs/at-a-glance" },
  { label: "Quick Start", path: "/docs/quick-start" },
  { label: "Key Concepts", path: "/docs/key-concepts" },
  { label: "App", path: "/docs/app" },
  { label: "Route", path: "/docs/route" },
  { label: "RouteGroup", path: "/docs/routegroup" },
  { label: "Middleware", path: "/docs/middleware" },
  { label: "Response", path: "/docs/response" },
  { label: "useRoute", path: "/docs/useroute" },
  { label: "useSetContext", path: "/docs/usesetcontext" },
  { label: "useContext", path: "/docs/usecontext" },
];

const sidebarGroups = [
  {
    group: "Getting Started",
    links: [
      { label: "At a Glance", path: "/docs/at-a-glance" },
      { label: "Quick Start", path: "/docs/quick-start" },
      { label: "Key Concepts", path: "/docs/key-concepts" },
    ],
  },
  {
    group: "Components",
    links: [
      { label: "App", path: "/docs/app" },
      { label: "Route", path: "/docs/route" },
      { label: "RouteGroup", path: "/docs/routegroup" },
      { label: "Middleware", path: "/docs/middleware" },
      { label: "Response", path: "/docs/response" },
    ],
  },
  {
    group: "Hooks",
    links: [
      { label: "useRoute", path: "/docs/useroute" },
      { label: "useSetContext", path: "/docs/usesetcontext" },
      { label: "useContext", path: "/docs/usecontext" },
    ],
  },
  {
    group: "Tutorial",
    links: [
      { label: "Full Walkthrough", path: "/docs/full-walkthrough" },
    ],
  },
];


function useDocNavigation() {
  const router = useRouter();
  const matches = useMatches();
  const [state, setState] = useState({
    currentPath: router.state.location.pathname,
    currentIndex: -1,
    prev: null as { label: string, path: string } | null,
    next: null as { label: string, path: string } | null
  });
  
  useEffect(() => {
    const currentPath = router.state.location.pathname;
    
    const normalizePath = (path: string) => path.replace(/\/$/, '');
    const normalizedCurrentPath = normalizePath(currentPath);
    
    const allRoutes = ALL_DOC_ROUTES;
    
    const currentIndex = allRoutes.findIndex(
      route => normalizePath(route.path) === normalizedCurrentPath
    );
    
    const prev = currentIndex > 0 ? allRoutes[currentIndex - 1] : null;
    const next = currentIndex < allRoutes.length - 1 ? allRoutes[currentIndex + 1] : null;
    
    setState({
      currentPath,
      currentIndex,
      prev,
      next
    });
    
    console.log('Route changed to:', currentPath, { prev, next, currentIndex });
  }, [router.state.location.pathname, matches]);
  
  return state;
}

function normalizePath(path: string): string {
  return path.replace(/\/$/, '');
}
function RouteComponent() {
  const router = useRouter();
  const { currentPath, prev, next } = useDocNavigation();

  return (
    <div className="flex min-h-screen max-w-7xl mx-auto">
      <div className="w-64 border-r border-white/10 bg-black/80 p-6 pt-10 sticky top-0 h-screen">
        <div className="font-bold text-lg mb-8">Docs</div>
        <div className="space-y-6">
          {sidebarGroups.map((group) => (
            <div key={group.group}>
              <div className="uppercase text-xs text-zinc-500 font-semibold mb-2 tracking-widest">{group.group}</div>
              <div className="space-y-1 ml-2">
                {group.links.map((link) => {
                  const isActive = normalizePath(currentPath) === normalizePath(link.path);
                  return (
                    <Link
                      key={link.label}
                      to={link.path}
                      className={`block py-1 px-2 rounded transition-colors cursor-pointer text-sm ${
                        isActive ? 'text-white bg-white/10' : 'text-zinc-300 hover:text-white'
                      }`}
                      onClick={() => {
                        router.navigate({ 
                          to: link.path, 
                          replace: false
                        });
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-10 prose prose-invert max-w-4xl mx-auto flex flex-col justify-between" style={{ background: "rgba(0,0,0,0.95)" }}>
        <div>
          <Outlet />
        </div>
        <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
          {prev ? (
            <Link 
              key={`prev-${currentPath}`}
              to={prev.path}
              preload="intent"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
              onClick={(e: React.MouseEvent) => {
                console.log('Navigating to prev:', prev.path);
                
                router.navigate({ 
                  to: prev.path, 
                  replace: false
                });
                e.preventDefault();
              }}
            >
              ← {prev.label}
            </Link>
          ) : <span />}
          {next ? (
            <Link 
              key={`next-${currentPath}`}
              to={next.path}
              preload="intent"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
              onClick={(e: React.MouseEvent) => {
                console.log('Navigating to next:', next.path);
                router.navigate({ 
                  to: next.path, 
                  replace: false
                });
                e.preventDefault();
              }}
            >
              {next.label} →
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  );
}
