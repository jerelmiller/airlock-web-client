import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/schema.graphql",
  documents: "src/**/*.{ts,tsx}",
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
  generates: {
    "./src/__generated__/types.ts": {
      plugins: ["typescript"],
      config: {
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: false,
          defaultValue: false,
        },
        dedupeOperationSuffix: true,
        defaultScalarType: "unknown",
        omitOperationSuffix: true,
        skipTypeNameForRoot: true,
        namingConvention: {
          typeNames: "keep",
        },
      },
    },
    "./": {
      preset: "near-operation-file",
      plugins: ["typescript-operations"],
      presetConfig: {
        baseTypesPath: "./src/__generated__/types.ts",
        extension: ".types.ts",
        folder: "__generated__",
        importTypesNamespace: "GraphQLTypes",
      },
      config: {
        dedupeOperationSuffix: true,
      },
    },
  },
};

export default config;
