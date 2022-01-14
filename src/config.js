const config = {
  database: {
    uri: "mongodb://localhost/ecoshop",
  },
  server: {
    port: process.env.PORT ?? 4400,
    hostname: "http://localhost:" + 4400,
  },
  jwt: {
    secret: "eyJhbGciOiJIUzI1NiJeyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJV",
  },
};
module.exports = config;
