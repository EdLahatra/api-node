const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
// const session = require('express-session');

// Express
// requires trailing slash
const app = express();
const firebase = admin.initializeApp(functions.config().firebase);

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

const users = require('./src/routes/api/users');
const profile = require('./src/routes/api/profile');
const posts = require('./src/routes/api/posts');
const questions = require('./src/routes/api/questions');
const pays = require('./src/routes/api/pays');
const sejour = require('./src/routes/api/sejour');
const vaccin = require('./src/routes/api/vaccin');
const medecin = require('./src/routes/api/medecin');
const allergie = require('./src/routes/api/allergie');
const sanguin = require('./src/routes/api/sanguin');
const maladie = require('./src/routes/api/maladie');
const sante = require('./src/routes/api/sante');
const voyage = require('./src/routes/api/voyage');
const centre = require('./src/routes/api/centre');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = 'mongodb://reactpwa:reactpwa@reactpwacluster-shard-00-00-2tzai.mongodb.net:27017,reactpwacluster-shard-00-01-2tzai.mongodb.net:27017,reactpwacluster-shard-00-02-2tzai.mongodb.net:27017/test?ssl=true&replicaSet=reactpwaCluster-shard-0&authSource=admin&retryWrites=true';
const secretOrKey = require('./src/config/keys').secretOrKey;
// Connect to MongoDB

// mongoose.connection.openUri(db)
//   .once('open', () => console.log('Good to go !'))
//   .on('error', (error) => {
//     console.warn('Warning', error);
//   });
// mongoose
//   .connect(db, { useMongoClient: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Best Best =======>'))
    .catch(e => {
      console.error('error ==========>', e.message);
    });

  // mongoose.connection.on('connected', () => {
  //   console.log(`connected to database: ${db}`);
  // });

  // mongoose.connection.once('open', () => {
  //   console.log('MongoDB Connected');
  // });

  // mongoose.connection.on('error', () => {
  //   console.log(`unable to connect to database: ${db}`);
  // });

  // mongoose.connection.on('disconnected', () => {
  //   console.log(`Disconnected to database: ${db}`);
  // });

// mongoose.connect(db, {useMongoClient: true});
// mongoose.connection.once('open', function(){
//   console.log('MongoDB Connected');
// }).on('error', function(error){
//     console.log('Error is: ', error);
// });

// Passport middleware
// app.use(passport.initialize());
// app.use(session({
//   secret: secretOrKey,
//   resave: true,
//   saveUninitialized: true
// }));
app.use(passport.initialize());
app.use(passport.session());

require('./src/config/passport')(passport);

// Passport Config
// require('./src/config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/questions', questions);
app.use('/api/sejour', sejour);
app.use('/api/vaccin', vaccin);
app.use('/api/medecin', medecin);
app.use('/api/allergie', allergie);
app.use('/api/sanguin', sanguin);
app.use('/api/pays', pays);
app.use('/api/maladie', maladie);
app.use('/api/sante', sante);
app.use('/api/voyage', voyage);
app.use('/api/centres', centre);

// app.post("/login", async (req, res) => {
//     const Entry = firebase.database().ref('users/');
//     const users = await Entry.once('value');
//     const objKey = users.val();
//     if (objKey) {
//         Object.keys(users.val()).map(key => {
//             const childData = objKey[key];
//             if (childData && childData.email === req.body.email && childData.password === req.body.password) {
//                 const childKey = childData.key;
//                 childData.id = childKey;
//                 res.status(200).json({ user: childData });
//             } 
//         });
//     }
//     res.status(200).json({ message: 'KO' })

// });

// app.get("/voyages", (req, res, next) => {
//     const user_id = req.query.id;
//     console.log('req.body req.body', req.query.id);
//     if (user_id) {
//         firebase.database().ref().child("voyages").orderByChild("user_id").equalTo(req.query.id).on('value', function (snapshot) {
//             res.status(200).json({ voyages: snapshot.val() });
//          });
//         // const Entry = firebase.database().ref(`voyages/-L_5MTBRwdn9DPEVoy1T`);
//         // Entry.once('value')
//         // .then(function(snap) {
//         //     res.status(200).json({ voyages: snap.val() });
//         // })
//         // .catch(errb => res.status(200).json({ message: 'KO' }));
//     }
//     res.status(200).json({ message: 'KO' })
// });

// app.get("/get-masante", (req, res, next) => {
//     const Entry = firebase.database().ref('masante');
//         Entry.once('value')
//         .then(function(snap) {
//             res.status(200).json({ voyages: snap.val() });
//         })
//         .catch(errb => res.status(200).json({ message: 'KO' }));
//     res.status(200).json({ message: 'KO' })
// });

// app.post("/add-voyages", (req, res, next) => {
//     const Entry = firebase.database().ref('voyages/');
//     const uid = firebase.database().ref().child('voyages').push().key;
//     //Fire Query
//     const  voyages = req.body;

//     voyages.dateAjout = new Date();

//     Entry.push(voyages).then((data) => {
//         res.status(200).json({ voyages });
//     }).catch((error) => {
//         res.send('error error', error);
//         console.error(error);
//     })
// });

// app.post("/masante", (req, res, next) => {
//     const Entry = firebase.database().ref('masante/');
//     const uid = firebase.database().ref().child('masante').push().key;
//     //Fire Query
//     const  masante = req.body;

//     masante.dateAjout = new Date();

//     Entry.push(masante).then((data) => {
//         res.status(200).json({ masante });
//     }).catch((error) => {
//         res.send('error error', error);
//         console.error(error);
//     })
// });

// app.post("/register", (req, response) => {
//     const Entry = firebase.database().ref('users/');
//     const uid = firebase.database().ref().child('users').push().key;
//     //Fire Query
//     const  entry = req.body;

//     entry.user_id = uid;
//     entry.dateAjout = new Date();

//     Entry.push(entry).then((data) => {
//         res.status(200).json({ user: entry });
//     }).catch((error) => {
//         response.send('error error', error);
//         console.error(error);
//     })

// });

// app.get("/user", (request, response) => {
//     response.send("User !!!");
// });

exports.app = functions.https.onRequest(app);

// export default app;
