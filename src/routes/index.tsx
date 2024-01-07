import { Outlet, RootRoute, Route, Router } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "../components/navbar";

const rootRoute = new RootRoute({
  component: () => (
    <>
      <div className="min-h-full">
        <Navbar />
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                Dashboard
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <TanStackRouterDevtools />
    </>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    );
  },
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/seats",
  component: function About() {
    return <div className="p-2">Hello from About!</div>;
  },
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = new Router({ routeTree });

export { router };
