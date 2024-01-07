import { Outlet, RootRoute, Route, Router } from "@tanstack/react-router";
import Navbar from "../components/navbar";
import Dashboard from "../module/dashboard";
import SeatsView from "../module/seats-view";
import { BusProvider } from "../module/seats-view/useBus";
import UpdateReservation from "../module/update-reservation";

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


const routeTree = rootRoute.addChildren([dashboard, seats, updateReservation]);

const router = new Router({ routeTree });

export { router };
