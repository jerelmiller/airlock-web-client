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
      plugins: ["typescript", "typescript-operations"],
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
  },
};

export default config;
