const Koa = require("koa");
const {koaBody} = require("koa-body");
const routes = require("../routes/route");

const app = new Koa();

app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

module.exports=app;
