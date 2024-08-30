import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Layout from "./layouts/Layout";
import {
  CreateListing,
  EditListing,
  Home,
  HomeLoader,
  HostBookings,
  HostPastBookings,
  Listing,
  ListingLoader,
  Listings,
  ListingsLoader,
  Login,
  PastTrips,
  Profile,
  Search,
  SearchLoader,
  Trips,
  Wallet,
} from "./pages";
import Nav from "./layouts/Nav";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route element={<Nav />}>
        <Route path="/" element={<Home />} loader={HomeLoader} />
        <Route element={<Layout />}>
          <Route path="/search" element={<Search />} loader={SearchLoader} />
          <Route
            path="/listings"
            element={<Listings />}
            loader={ListingsLoader}
          />
          <Route path="/listings/create" element={<CreateListing />} />
          <Route
            path="/listing/:id"
            element={<Listing />}
            loader={ListingLoader}
          />
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
      </Route>
    </>
  )
);
