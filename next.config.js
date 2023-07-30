const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "eagleeye10m",
        mongodb_password: "ali109832",
        mongodb_clustername: "cluster0",
        mongodb_database: "my-site-dev",
      },
    };
  }

  return {
    env: {
      mongodb_username: "eagleeye10m",
      mongodb_password: "ali109832",
      mongodb_clustername: "cluster0",
      mongodb_database: "my-site",
    },
  }; //we may have different databases for production and development, thats why we're gonna use environment variables
};
