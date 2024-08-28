import Layout from "./layouts/Layout";
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

import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

export default function App() {
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route path="/search" element={<Search />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/create" element={<CreateListing />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/listing/:id/edit" element={<EditListing />} />
        <Route path="/listing/:id/bookings" element={<HostBookings />} />
        <Route
          path="/listing/:id/past-bookings"
          element={<HostPastBookings />}
        />
        <Route path="/trips" element={<Trips />} />
        <Route path="/past-trips" element={<PastTrips />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wallet" element={<Wallet />} />
      </Route>
    </>
  )
);
