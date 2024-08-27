import BedroomInput from "../components/BedroomInput";
import Layout from "../layouts/Layout";
import ListingCell from "../components/ListingCell";
import { Suspense, useEffect, useState } from "react";
import format from "date-fns/format";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  gql,
  QueryRef,
  TypedDocumentNode,
  useBackgroundQuery,
  useReadQuery,
} from "@apollo/client";
import { useLocation } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import {
  SearchListingsQuery,
  SearchListingsQueryVariables,
} from "./__generated__/search.types";
import { SortByCriteria } from "../__generated__/types";
import { DatePickerInput } from "../components/DatePickerInput";
import { PageSpinner } from "../components/PageSpinner";
import { ErrorBoundary } from "react-error-boundary";
import { PageError } from "../components/PageError";

export const SEARCH_LISTINGS: TypedDocumentNode<
  SearchListingsQuery,
  SearchListingsQueryVariables
> = gql`
  query SearchListings($searchListingsInput: SearchListingsInput!) {
    searchListings(criteria: $searchListingsInput) {
      id
      title
      photoThumbnail
      numOfBeds
      description
      overallRating
      costPerNight
      locationType
    }
  }
`;

export default function Search() {
  const query = new URLSearchParams(useLocation().search);
  const checkInDateFromUrl = query.get("startDate")!;
  const checkOutDateFromUrl = query.get("endDate")!;
  const numOfBedsFromUrl = parseInt(query.get("numOfBeds")!) || 1;

  const today = new Date();
  const [checkInDate, setStartDate] = useState(new Date(checkInDateFromUrl));
  const [checkOutDate, setEndDate] = useState(new Date(checkOutDateFromUrl));
  const [numOfBeds, setNumOfBeds] = useState(numOfBedsFromUrl);
  const [sortBy, setSortBy] = useState(SortByCriteria.COST_ASC);
  const [page, setPage] = useState(1);

  const [queryRef] = useBackgroundQuery(SEARCH_LISTINGS, {
    variables: {
      searchListingsInput: {
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        numOfBeds,
        page,
        limit: 5,
        sortBy,
      },
    },
  });

  return (
    <Layout>
      <Center>
        <Stack>
          <Heading as="h1" mb="6" textAlign="center">
            Your search
          </Heading>
          <Box>
            <Flex
              minWidth="100%"
              mb="4"
              align="flex-end"
              flexWrap="wrap"
              sx={{ gap: "24px" }}
            >
              <Stack direction="column" spacing={2}>
                <Text as="label" fontSize="large" fontWeight="bold">
                  Check-in Date
                </Text>
                <DatePickerInput
                  size="lg"
                  today={today}
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  selected={checkInDate}
                  width="150px"
                />
              </Stack>
              <Stack direction="column" spacing={2}>
                <Text as="label" fontSize="large" fontWeight="bold">
                  Check-out Date
                </Text>
                <DatePickerInput
                  size="lg"
                  today={today}
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  selected={checkOutDate}
                  minDate={today < checkInDate ? checkInDate : today}
                  onChange={(date) => setEndDate(date)}
                  width="150px"
                />
              </Stack>
              <BedroomInput
                size="lg"
                w="150px"
                numOfBeds={numOfBeds}
                setNumOfBeds={setNumOfBeds}
              />
              <Button w="150px" size="lg">
                Find a place
              </Button>
            </Flex>
          </Box>
        </Stack>
      </Center>
      <Divider borderWidth="1px" />
      <Suspense fallback={<PageSpinner />}>
        <ErrorBoundary
          fallbackRender={({ error }) => <PageError error={error} />}
        >
          <SearchResults
            queryRef={queryRef}
            page={page}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            sortBy={sortBy}
            onChangePage={setPage}
            onChangeSort={setSortBy}
          />
        </ErrorBoundary>
      </Suspense>
    </Layout>
  );
}

interface SearchResultsProps {
  queryRef: QueryRef<SearchListingsQuery, SearchListingsQueryVariables>;
  page: number;
  sortBy: SortByCriteria;
  checkInDate: Date;
  checkOutDate: Date;
  onChangePage: (page: number) => void;
  onChangeSort: (sort: SortByCriteria) => void;
}

function SearchResults({
  queryRef,
  checkInDate,
  checkOutDate,
  page,
  sortBy,
  onChangePage,
  onChangeSort,
}: SearchResultsProps) {
  const { data } = useReadQuery(queryRef);
  const [nextPageButtonDisabled, setNextPageButtonDisabled] = useState(false);

  useEffect(() => {
    if (data.searchListings.length === 0) {
      const newPage = page - 1;
      onChangePage(newPage);
      setNextPageButtonDisabled(true);
    }
  }, [data.searchListings.length, page, onChangePage]);

  return (
    <Stack mb="8" p={12} pt={9}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mb="4"
        flexWrap="wrap"
      >
        <Heading as="h2" fontSize="3xl">
          Stays across space
        </Heading>
        <Flex alignItems="center" flexWrap="wrap">
          <Text fontWeight="bold" fontSize="lg" mr={4}>
            Sort by
          </Text>
          <Select
            width="200px"
            size="lg"
            onChange={(e) => {
              onChangeSort(e.target.value as SortByCriteria);
              onChangePage(1);
            }}
            value={sortBy}
          >
            <option disabled>Sort by</option>
            <option value="COST_ASC">Price (low to high)</option>
            <option value="COST_DESC">Price (high to low)</option>
          </Select>
        </Flex>
      </Flex>
      {data.searchListings.length > 0 ? (
        <VStack spacing="4">
          {data.searchListings.filter(Boolean).map((listingData) => (
            <ListingCell
              key={listingData.title}
              listing={listingData}
              to={`/listing/${listingData.id}/?startDate=${format(
                checkInDate,
                "MM-dd-yyyy",
              )}&endDate=${format(checkOutDate, "MM-dd-yyyy")}`}
            />
          ))}
        </VStack>
      ) : (
        <Heading size="lg">No results found.</Heading>
      )}

      <Flex justifyContent="space-between">
        <Button
          onClick={async () => {
            onChangePage(page - 1);
            setNextPageButtonDisabled(false);
          }}
          isDisabled={page === 1}
        >
          Previous page
        </Button>
        <Button
          onClick={() => onChangePage(page + 1)}
          isDisabled={nextPageButtonDisabled}
        >
          Next page
        </Button>
      </Flex>
    </Stack>
  );
}
