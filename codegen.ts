import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://rt-airlock-router.herokuapp.com/",
  documents: "src/**/*.tsx",
  generates: {
    "./src/__generated__/types.ts": {},
  },
};

export default config;
