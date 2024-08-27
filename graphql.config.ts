import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: "./src/schema.graphql",
  documents: "src/**/*.{ts,tsx}",
};

export default config;
