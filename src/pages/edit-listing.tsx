import ListingForm from "../components/ListingForm";
import { Button, Center } from "@chakra-ui/react";
import { IoArrowBackOutline } from "react-icons/io5";
import { LISTING_FRAGMENT } from "../utils";
import {
  gql,
  TypedDocumentNode,
  useMutation,
  useReadQuery,
} from "@apollo/client";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import {
  GetListingQuery,
  GetListingQueryVariables,
  UpdateListingMutation,
  UpdateListingMutationVariables,
} from "./__generated__/edit-listing.types";
import { preloadQuery } from "../apolloClient";

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
      id
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

export function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Error("Invalid listing ID");
  }

  return preloadQuery(LISTING, { variables: { id } });
}

export default function EditListing() {
  const queryRef = useLoaderData() as ReturnType<typeof loader>;
  const { data } = useReadQuery(queryRef);
  const listing = data.listing;

  const navigate = useNavigate();
  const [updateListing, { loading: submitting }] = useMutation(EDIT_LISTING, {
    onCompleted: () => {
      navigate(`/listing/${listing!.id}`);
    },
  });

  if (!data.listing) {
    return <Center>Listing not found</Center>;
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

  return (
    <>
      <Button
        role="link"
        aria-label="Go back to previous page"
        onClick={() => navigate(-1)}
        leftIcon={<IoArrowBackOutline />}
        mb="4"
      >
        Back
      </Button>
      <ListingForm
        listingData={{
          title,
          description,
          numOfBeds,
          locationType,
          photoThumbnail,
          amenities: amenities.filter(Boolean),
          costPerNight,
        }}
        submitting={submitting}
        onSubmit={(listing) => {
          updateListing({ variables: { listingId, listing } });
        }}
      />
    </>
  );
}
