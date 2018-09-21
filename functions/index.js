const functions = require('firebase-functions');

const express = require('express');

const app = express();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

app.get("/test", (request, response) => {
    response.send("Coucou");
});

exports.app = functions.https.onRequest(app);

// export default app;
