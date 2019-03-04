const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

const app = express();

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// admin.initializeApp(functions.config().firebase);
const firebase = admin.initializeApp(functions.config().firebase);

app.post("/login", async (req, res) => {
    const Entry = firebase.database().ref('users/');
    const users = await Entry.once('value');
    const objKey = users.val();
    if (objKey) {
        Object.keys(users.val()).map(key => {
            const childData = objKey[key];
            if (childData && childData.email === req.body.email && childData.password === req.body.password) {
                const childKey = childData.key;
                childData.id = childKey;
                res.status(200).json({ user: childData });
            } 
        });
    }
    res.status(200).json({ message: 'KO' })

});

app.get("/voyages", (req, res, next) => {
    const user_id = req.query.id;
    console.log('req.body req.body', req.query.id);
    if (user_id) {
        firebase.database().ref().child("voyages").orderByChild("user_id").equalTo(req.query.id).on('value', function (snapshot) {
            res.status(200).json({ voyages: snapshot.val() });
         });
        // const Entry = firebase.database().ref(`voyages/-L_5MTBRwdn9DPEVoy1T`);
        // Entry.once('value')
        // .then(function(snap) {
        //     res.status(200).json({ voyages: snap.val() });
        // })
        // .catch(errb => res.status(200).json({ message: 'KO' }));
    }
    res.status(200).json({ message: 'KO' })
});

app.get("/get-masante", (req, res, next) => {
    const Entry = firebase.database().ref('masante');
        Entry.once('value')
        .then(function(snap) {
            res.status(200).json({ voyages: snap.val() });
        })
        .catch(errb => res.status(200).json({ message: 'KO' }));
    res.status(200).json({ message: 'KO' })
});

app.post("/add-voyages", (req, res, next) => {
    const Entry = firebase.database().ref('voyages/');
    const uid = firebase.database().ref().child('voyages').push().key;
    //Fire Query
    const  voyages = req.body;

    voyages.dateAjout = new Date();

    Entry.push(voyages).then((data) => {
        res.status(200).json({ voyages });
    }).catch((error) => {
        res.send('error error', error);
        console.error(error);
    })
});

app.post("/masante", (req, res, next) => {
    const Entry = firebase.database().ref('masante/');
    const uid = firebase.database().ref().child('masante').push().key;
    //Fire Query
    const  masante = req.body;

    masante.dateAjout = new Date();

    Entry.push(masante).then((data) => {
        res.status(200).json({ masante });
    }).catch((error) => {
        res.send('error error', error);
        console.error(error);
    })
});

app.post("/register", (req, response) => {
    const Entry = firebase.database().ref('users/');
    const uid = firebase.database().ref().child('users').push().key;
    //Fire Query
    const  entry = req.body;

    entry.user_id = uid;
    entry.dateAjout = new Date();

    Entry.push(entry).then((data) => {
        res.status(200).json({ user: entry });
    }).catch((error) => {
        response.send('error error', error);
        console.error(error);
    })

});

app.get("/user", (request, response) => {
    response.send("User !!!");
});

exports.app = functions.https.onRequest(app);

// export default app;
