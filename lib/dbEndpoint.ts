export const dbEndpoint =
  process.env.DB_ENDPOINT == undefined
    ? "http://localhost:8787"
    : process.env.DB_ENDPOINT;
