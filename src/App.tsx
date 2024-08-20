import {
  CreateListing,
  EditListing,
  Home,
  HostBookings,
  HostPastBookings,
  Listing,
  Listings,
  Login,
  PastTrips,
  Profile,
  Search,
  Trips,
  Wallet,
} from "./pages";
import { useUser } from "./utils";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ReactNode } from "react";

export default function App() {
  const { user } = useUser();

  return (
    <Router>
      <Routes>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/listings">
          <Listings />
        </Route>
        <Route path="/listings/create">
          <CreateListing />
        </Route>
        <Route exact path="/listing/:id">
          <Listing />
        </Route>
        <Route path="/listing/:id/edit">
          <EditListing />
        </Route>
        <Route path="/listing/:id/bookings">
          <HostBookings />
        </Route>
        <Route path="/listing/:id/past-bookings">
          <HostPastBookings />
        </Route>
        <Route path="/trips">
          <Trips />
        </Route>
        <Route path="/past-trips">
          <PastTrips />
        </Route>
        <Route user={user} path="/profile">
          <Profile />
        </Route>
        <Route user={user} path="/wallet">
          <Wallet />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Routes>
    </Router>
  );
}

interface PrivateRouteProps {
  children: ReactNode;
  user?: unknown;
}

function PrivateRoute({ children, user, ...rest }: PrivateRouteProps) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
