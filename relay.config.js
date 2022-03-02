module.exports = {
  src: "./src",
  schema: "./data/schema.graphql",
  language: "typescript",
  artifactDirectory: "./src/__generated__",
  // TODO: Mek persist output work again
  // persistOutput: "./data/complete.queryMap.json",
  exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
}
