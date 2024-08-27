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
} from "@chakra-ui/react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface ReviewType {
  rating: number | null;
  text: string | null;
}

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

interface TripReviewsProps {
  locationReview: ReviewType | null;
  hostReview: ReviewType | null;
  guestReview: ReviewType | null;
  ratingKey: string;
  isHost?: boolean;
  onSubmitReview: (reviews: {
    guestReview?: ReviewType;
    locationReview?: ReviewType;
    hostReview?: ReviewType;
  }) => void;
}

export default function TripReviews({
  locationReview,
  hostReview,
  guestReview,
  onSubmitReview,
  isHost = false,
}: TripReviewsProps) {
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
                  label="guest"
                  review={reviewsInput.guestReview}
                  onChange={(review) =>
                    setReviewsInput((reviews) => ({
                      ...reviews,
                      guestReview: review,
                    }))
                  }
                />
                <Button
                  onClick={() => onSubmitReview(reviewsInput)}
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
                  label="Location"
                  review={reviewsInput.locationReview}
                  onChange={(review) => {
                    setReviewsInput((reviews) => ({ locationReview: review }));
                  }}
                />
                <ReviewInput
                  label="Host"
                  review={reviewsInput.hostReview}
                  onChange={(review) =>
                    setReviewsInput((reviews) => ({
                      ...reviews,
                      hostReview: review,
                    }))
                  }
                />
                <Button
                  onClick={() => onSubmitReview(reviewsInput)}
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
