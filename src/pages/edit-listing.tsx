import Layout from "../layouts/Layout";
import ListingForm from "../components/ListingForm";
import QueryResult from "../components/QueryResult";
import { Button } from "@chakra-ui/react";
import { IoArrowBackOutline } from "react-icons/io5";
import { LISTING_FRAGMENT } from "../utils";
import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetListingQuery,
  GetListingQueryVariables,
  UpdateListingMutation,
  UpdateListingMutationVariables,
} from "./__generated__/edit-listing.types";

export const EDIT_LISTING: TypedDocumentNode<
  UpdateListingMutation,
  UpdateListingMutationVariables
> = gql`
  mutation UpdateListingMutation(
    $listingId: ID!
    $listing: UpdateListingInput!
  ) {
    updateListing(listingId: $listingId, listing: $listing) {
      success
      message
      listing {
        ...ListingFragment
        amenities {
          id
          category
          name
        }
      }
    }
  }
  ${LISTING_FRAGMENT}
`;

export const LISTING: TypedDocumentNode<
  GetListingQuery,
  GetListingQueryVariables
> = gql`
  query GetListing($id: ID!) {
    listing(id: $id) {
      ...ListingFragment
      amenities {
        id
        name
        category
      }
    }
  }
  ${LISTING_FRAGMENT}
`;

export default function EditListing() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useQuery(LISTING, {
    variables: { id: id! },
  });

  return (
    <Layout>
      <Button
        role="link"
        aria-label="Go back to previous page"
        onClick={() => navigate(-1)}
        leftIcon={<IoArrowBackOutline />}
        mb="4"
      >
        Back
      </Button>
      <QueryResult loading={loading} error={error} data={data}>
        {(data) => {
          if (!data.listing) {
            return null;
          }

          const {
            id: listingId,
            title,
            description,
            numOfBeds,
            locationType,
            photoThumbnail,
            amenities,
            costPerNight,
          } = data.listing;

          const listingData = {
            title,
            description,
            numOfBeds,
            locationType,
            photoThumbnail,
            amenities: amenities.filter(Boolean),
            costPerNight,
          };

          return (
            <ListingForm
              listingData={listingData}
              listingId={listingId}
              mutation={EDIT_LISTING}
              mutationOptions={{
                onCompleted: () => {
                  navigate(`/listing/${listingId}`);
                },
              }}
            />
          );
        }}
      </QueryResult>
    </Layout>
  );
}
