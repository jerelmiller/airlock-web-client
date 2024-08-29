import ListingForm from "../components/ListingForm";
import { Button } from "@chakra-ui/react";
import { HOST_LISTINGS } from "./listings";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { gql, TypedDocumentNode, useMutation } from "@apollo/client";
import {
  CreateListingMutation,
  CreateListingMutationVariables,
} from "./__generated__/add-listing.types";

export const CREATE_LISTING: TypedDocumentNode<
  CreateListingMutation,
  CreateListingMutationVariables
> = gql`
  mutation CreateListingMutation($listing: CreateListingInput!) {
    createListing(listing: $listing) {
      success
      message
      listing {
        id
        title
        description
        numOfBeds
        locationType
        photoThumbnail
        costPerNight
        amenities {
          id
          category
          name
        }
      }
    }
  }
`;

export default function CreateListing() {
  const navigate = useNavigate();
  const [createListing, { loading }] = useMutation(CREATE_LISTING, {
    onCompleted: () => {
      navigate("/listings");
    },
    update: (cache, { data }) => {
      // update the cache to add our new listing
      // https://www.apollographql.com/docs/react/api/react/hooks/#update
      const query = cache.readQuery({ query: HOST_LISTINGS });

      if (query?.hostListings) {
        cache.writeQuery({
          query: HOST_LISTINGS,
          data: {
            hostListings: [...query.hostListings, data!.createListing.listing],
          },
        });
      }
    },
  });

  return (
    <>
      <Button as={Link} to="/listings" leftIcon={<IoArrowBackOutline />} mb="4">
        Back to listings
      </Button>
      <ListingForm
        submitting={loading}
        listingData={{
          title: "",
          description: "",
          numOfBeds: 1,
          locationType: "",
          photoThumbnail: "",
          amenities: [],
          costPerNight: 100,
        }}
        onSubmit={(listing) => {
          createListing({ variables: { listing } });
        }}
      />
    </>
  );
}
