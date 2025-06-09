const functions = require("firebase-functions");
// const hello = require("./handlers/HelloWorld");
const apiHandler = require("./handlers/api");

exports.helloWorld = functions.https.onRequest(apiHandler.callback());


