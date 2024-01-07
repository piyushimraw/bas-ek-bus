import {
  Navigate,
  NotFoundRoute,
  Outlet,
  RootRoute,
  Route,
  Router,
} from "@tanstack/react-router";
import Navbar from "../components/navbar";
import Dashboard from "../module/dashboard";
import SeatsView from "../module/seats-view";
import { BusProvider } from "../module/seats-view/useBus";
import UpdateReservation from "../module/update-reservation";
import NotFound from "../module/not-found";

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

const dashboard = new Route({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
});

const seats = new Route({
  getParentRoute: () => rootRoute,
  path: "/seats",
  component: SeatsView,
});

const updateReservation = new Route({
  getParentRoute: () => rootRoute,
  path: "/edit-booking/$seatNumber",
  component: UpdateReservation,
});

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFound,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/seats" />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboard,
  seats,
  updateReservation,
]);

const router = new Router({
  routeTree,
  notFoundRoute,
  defaultPreload: "intent",
  defaultComponent: SeatsView,
  defaultErrorComponent: NotFound,
});

export { router };
