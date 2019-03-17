import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import store, { persistor } from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Questions from './components/questions/Questions';
import Question from './components/questions/Questions';
import Pays from './components/pays/Pays';
import Maladie from './components/maladie/Maladie';
import Vaccin from './components/vaccin/Vaccin';
import Voyage from './components/voyage/Voyage';
import Sante from './components/sante/Sante';
import Medecin from './components/medecin/Medecin';
import Centres from './components/centre/Centres';
import Sejours from './components/sejour/Sejours';
import Urgences from './components/urgence/Urgences';
import Sanguin from './components/sanguin/Sanguin';
import Categorie from './components/categorie/Categorie';
import Allergie from './components/allergie/Allergie';
import NotFound from './components/not-found/NotFound';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/centre" component={Centres} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/sejour" component={Sejours} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/allergie" component={Allergie} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/urgence" component={Urgences} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/voyage" component={Voyage} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/medecin" component={Medecin} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/sante" component={Sante} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Questions} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/maladie" component={Maladie} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/pays" component={Pays} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/sanguin" component={Sanguin} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/vaccin" component={Vaccin} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/checklist" component={Questions} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/categorie" component={Categorie} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/checklist/:id" component={Question} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
