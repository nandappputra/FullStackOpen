const http = require("http");
const app = require("./app");
const config = require("./utils/config");

http.createServer(app).listen(config.PORT, () => {
  console.log(`Server is listening at ${config.PORT}`);
});
