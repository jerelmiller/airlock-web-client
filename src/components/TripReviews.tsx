import { ReactNode, useState } from "react";
import ReviewInput, { ReviewRating } from "./TripReviewInput";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import {
  MutationOptions,
  OperationVariables,
  TypedDocumentNode,
  useMutation,
} from "@apollo/client";
import { Review as ReviewType } from "../__generated__/types";

interface ReviewProps {
  review: ReviewType;
  children?: ReactNode;
}

function Review({ review, children }: ReviewProps) {
  return (
    <>
      {review ? (
        <Box>
          <Flex alignItems="center">
            <Text fontWeight="semibold" mr="4">
              {children}
            </Text>
            <ReviewRating rating={review.rating} />
          </Flex>
          <Text>{review.text}</Text>
        </Box>
      ) : null}
    </>
  );
}

interface TripReviewsProps<TData, TVariables extends OperationVariables> {
  locationReview: ReviewType | null;
  hostReview: ReviewType | null;
  guestReview: ReviewType | null;
  ratingKey: string;
  mutation: TypedDocumentNode<TData, TVariables>;
  mutationOptions: Omit<MutationOptions<TData, TVariables>, "mutation">;
  isHost?: boolean;
}

export default function TripReviews<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>({
  locationReview,
  hostReview,
  guestReview,
  mutation,
  mutationOptions,
  isHost = false,
}: TripReviewsProps<TData, TVariables>) {
  const [reviewsInput, setReviewsInput] = useState<{
    guestReview?: ReviewType;
    locationReview?: ReviewType;
    hostReview?: ReviewType;
  }>({});
  const [isReviewInputOpen, setIsReviewInputOpen] = useState(false);
  const isSubmitDisabled = isHost
    ? !(reviewsInput.guestReview?.rating && reviewsInput.guestReview?.text)
    : !(
        reviewsInput?.locationReview?.rating &&
        reviewsInput?.locationReview?.text &&
        reviewsInput?.hostReview?.rating &&
        reviewsInput?.hostReview?.text
      );

  const toast = useToast();
  const successfulToast = {
    title: "Your review has been submitted.",
    description: "Thank you!",
    status: "success",
    duration: 9000,
    isClosable: true,
  };
  const errorToast = {
    title: "Something went wrong.",
    description: "Try again later.",
    status: "error",
    duration: 9000,
    isClosable: true,
  };

  const [submitReviews] = useMutation(mutation, {
    ...mutationOptions,
    variables: { ...mutationOptions.variables, ...reviewsInput },
    onCompleted: (data) => {
      if (isHost) {
        data.submitGuestReview.success
          ? toast(successfulToast)
          : toast(errorToast);
      } else {
        data.submitHostAndLocationReviews.success
          ? toast(successfulToast)
          : toast(errorToast);
      }
    },
  });

  const renderNoReviewMessage = (author: string) => {
    return (
      <Text>
        Your {author} hasn&apos;t reviewed their stay yet. We&apos;ve reached
        out to them and will report back here once we&apos;ve received their
        thoughts.
      </Text>
    );
  };

  // what the host sees
  const renderHostView = () => {
    return (
      <>
        <Heading as="h2" fontWeight="semibold" fontSize="lg">
          What your guest had to say
        </Heading>
        {!locationReview && !hostReview && renderNoReviewMessage("guest")}
        {locationReview && <Review review={locationReview}>Location</Review>}
        {hostReview && <Review review={hostReview}>Host</Review>}
        {guestReview && (
          <>
            <Heading as="h2" fontWeight="semibold" fontSize="lg">
              Your rating and review
            </Heading>
            <Review review={guestReview}>Guest</Review>
          </>
        )}
        {!guestReview && (
          <>
            <Button
              mt={4}
              variant="link"
              rightIcon={
                isReviewInputOpen ? <IoChevronUp /> : <IoChevronDown />
              }
              onClick={() => setIsReviewInputOpen((prevState) => !prevState)}
            >
              Review your guest
            </Button>
            <Collapse in={isReviewInputOpen} py="4" w="100%">
              <Stack spacing={4}>
                <Heading as="h2" fontWeight="semibold" fontSize="lg">
                  Your rating and review
                </Heading>
                <ReviewInput
                  reviewType="guest"
                  setReviewsInput={setReviewsInput}
                />
                <Button
                  onClick={() => submitReviews()}
                  disabled={isSubmitDisabled}
                  w="fit-content"
                >
                  Submit Review
                </Button>
              </Stack>
            </Collapse>
          </>
        )}
      </>
    );
  };

  // what the guest sees
  const renderGuestView = () => {
    return (
      <>
        <Heading as="h2" fontWeight="semibold" fontSize="lg">
          What your host had to say
        </Heading>
        {!guestReview && renderNoReviewMessage("host")}
        {guestReview && <Review review={guestReview}>Guest</Review>}
        {locationReview && hostReview && (
          <>
            <Heading as="h2" fontWeight="semibold" fontSize="lg">
              Your rating and review
            </Heading>
            <Review review={locationReview}>Location</Review>
            <Review review={hostReview}>Host</Review>
          </>
        )}
        {!locationReview && !hostReview && (
          <>
            <Button
              mt={4}
              variant="link"
              rightIcon={
                isReviewInputOpen ? <IoChevronUp /> : <IoChevronDown />
              }
              onClick={() => setIsReviewInputOpen((prevState) => !prevState)}
            >
              Review your stay
            </Button>
            <Collapse in={isReviewInputOpen} py="4" w="100%">
              <Stack spacing={4}>
                <Heading as="h2" fontWeight="semibold" fontSize="lg">
                  Your rating and review
                </Heading>
                <ReviewInput
                  reviewType="location"
                  setReviewsInput={setReviewsInput}
                />
                <ReviewInput
                  reviewType="host"
                  setReviewsInput={setReviewsInput}
                />
                <Button
                  onClick={() => submitReviews()}
                  disabled={isSubmitDisabled}
                  w="fit-content"
                >
                  Submit Review
                </Button>
              </Stack>
            </Collapse>
          </>
        )}
      </>
    );
  };

  return (
    <VStack w="full" alignItems="flex-start" spacing="3" flex="1">
      {isHost ? renderHostView() : renderGuestView()}
    </VStack>
  );
}

TripReviews.propTypes = {};
