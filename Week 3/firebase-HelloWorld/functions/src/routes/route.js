const Route = require("koa-router");
// eslint-disable-next-line max-len
const helloWorldController = require("../handlers/controllers/HelloWorldController");

const route = new Route(
    {
      prefix: "/api",
    });

route.get("/helloworld", helloWorldController.hello);

module.exports=route;
