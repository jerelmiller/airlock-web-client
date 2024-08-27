import { QueryResult as UseQueryResult } from "@apollo/client";
import QueryResult from "./QueryResult";
import {
  GetFeaturedListingsQuery,
  GetFeaturedListingsQueryVariables,
} from "../pages/__generated__/home.types";
import Layout from "../layouts/Layout";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import ListingCard from "./ListingCard";

interface FeaturedListingsProps {
  queryResult: UseQueryResult<
    GetFeaturedListingsQuery,
    GetFeaturedListingsQueryVariables
  >;
}

export function FeaturedListings({ queryResult }: FeaturedListingsProps) {
  const { loading, error, data } = queryResult;

  return (
    <QueryResult loading={loading} error={error} data={data}>
      {(data) => (
        <Layout noNav p={12} pt={8}>
          <Heading as="h1" fontSize="3xl" fontWeight="bold" mb={6}>
            Ideas for your next stellar trip
          </Heading>
          <SimpleGrid minChildWidth="255px" spacing={6}>
            {data.featuredListings.map((listing) => (
              <ListingCard key={listing.title} {...listing} />
            ))}
          </SimpleGrid>
        </Layout>
      )}
    </QueryResult>
  );
}
