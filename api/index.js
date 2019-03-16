import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';

import users from './src/routes/api/users';
import profile from './src/routes/api/profile';
import posts from './src/routes/api/posts';
import checklist from './src/routes/api/checklist';
import pays from './src/routes/api/pays';
import sejour from './src/routes/api/sejour';
import categorie from './src/routes/api/categorie';
import vaccin from './src/routes/api/vaccin';
import medecin from './src/routes/api/medecin';
import allergie from './src/routes/api/allergie';
import sanguin from './src/routes/api/sanguin';
import maladie from './src/routes/api/maladie';
import sante from './src/routes/api/sante';
import voyage from './src/routes/api/voyage';
import centre from './src/routes/api/centre';
import urgence from './src/routes/api/urgence';
import User from '../api/src/models/User';

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = keys.secretOrKey;
opts.secretOrKey = 'jwt';

// const session from 'express-session');

// Express
// requires trailing slash
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

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
// eslint-disable-next-line max-len
const db = 'mongodb://reactpwa:reactpwa@reactpwacluster-shard-00-00-2tzai.mongodb.net:27017,reactpwacluster-shard-00-01-2tzai.mongodb.net:27017,reactpwacluster-shard-00-02-2tzai.mongodb.net:27017/test?ssl=true&replicaSet=reactpwaCluster-shard-0&authSource=admin&retryWrites=true';


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Best Best =======>'))
  .catch((e) => {
    console.error('error ==========>', e.message);
  });


app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  }),
);

// Passport Config
// require('./src/config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/checklist', checklist);
app.use('/api/sejour', sejour);
app.use('/api/vaccin', vaccin);
app.use('/api/categorie', categorie);
app.use('/api/medecin', medecin);
app.use('/api/allergie', allergie);
app.use('/api/sanguin', sanguin);
app.use('/api/pays', pays);
app.use('/api/maladie', maladie);
app.use('/api/sante', sante);
app.use('/api/voyage', voyage);
app.use('/api/centres', centre);
app.use('/api/urgence', urgence);

app.listen(5000, () => {
  console.log(`server started on port ${5000} (${5000})`);
});

export default app;

// export default app;
