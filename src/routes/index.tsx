import { Outlet, RootRoute, Route, Router } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "../components/navbar";
import Header from "../components/header";

const rootRoute = new RootRoute({
  component: () => (
    <>
      <div className="min-h-full">
        <Navbar />
        <Outlet />
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
      <div className="py-10">
        <Header text="Dashboard" />
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8"></div>
        </main>
      </div>
    );
  },
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/seats",
  component: function About() {
    return (
      <div className="py-10">
        <Header text="Seats View" />
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8"></div>
        </main>
      </div>
    );
  },
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = new Router({ routeTree });

export { router };
