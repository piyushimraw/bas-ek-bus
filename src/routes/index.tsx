import { Outlet, RootRoute, Route, Router } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "../components/navbar";
import Dashboard from "../module/dashboard";
import SeatsView from "../module/seats-view";
import { BusProvider } from "../module/seats-view/useBus";

const rootRoute = new RootRoute({
  component: () => (
    <>
      <div className="min-h-full">
        <Navbar />
        <BusProvider>
          <Outlet />
        </BusProvider>
      </div>
    </>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/seats",
  component: SeatsView,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = new Router({ routeTree });

export { router };
