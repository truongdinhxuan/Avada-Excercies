const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const Koa = require('koa');
const routes = require('../routes/routes');
const cors = require("cors")
// const {koaBody} = require('koa-body');

const app = new Koa()
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

exports.api = onRequest(app.callback());
