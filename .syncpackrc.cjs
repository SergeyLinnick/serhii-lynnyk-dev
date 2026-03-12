/** @type {import("syncpack").RcFile} */
module.exports = {
  versionGroups: [
    {
      label: "Local workspace packages use workspace:* protocol",
      dependencies: ["@workspace/**"],
      dependencyTypes: ["dev", "prod", "peer"],
      pinVersion: "workspace:*",
    },
  ],
};
