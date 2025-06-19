const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const routes = require('../routes/routes');
const Koa = require('koa');
const cors = require("@koa/cors")

const app = new Koa()


app.use(cors());
app.use(routes.routes());
app.use(routes.allowedMethods());

exports.api = onRequest(app.callback());