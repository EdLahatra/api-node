import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />{' '}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/sante">
            Sante
          </Link>
          <Link className="navbar-brand" to="/voyage">
            Voyage
          </Link>
          <Link className="navbar-brand" to="/pays">
            Pays
          </Link>
          <Link className="navbar-brand" to="/maladie">
            Maladie
          </Link>
          <Link className="navbar-brand" to="/checklist">
            Checklist
          </Link>
          <Link className="navbar-brand" to="/categorie">
            Categorie
          </Link>
          <Link className="navbar-brand" to="/vaccin">
            Vaccin
          </Link>
          <Link className="navbar-brand" to="/sanguin">
            Group S
          </Link>
          <Link className="navbar-brand" to="/medecin">
            Medecin
          </Link>
          <Link className="navbar-brand" to="/sejour">
            Sejour
          </Link>
          <Link className="navbar-brand" to="/centre">
            Centre de Vacc
          </Link>
          <Link className="navbar-brand" to="/urgence">
            Num Urgence
          </Link>
          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
