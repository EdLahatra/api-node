import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addCentre } from '../../actions/CentreActions';

class CentreForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      service: '',
      numero: '',
      rue: '',
      cp: '',
      ville: '',
      telephone: '',
      email: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newCentre = {
      name: this.state.text,
      service: this.state.service,
      numero: this.state.numero,
      rue: this.state.rue,
      cp: this.state.cp,
      ville: this.state.ville,
      telephone: this.state.telephone,
      email: this.state.email,
    };

    this.props.addCentre(newCentre);
    this.setState({
      text: '',
      service: '',
      numero: '',
      rue: '',
      cp: '',
      ville: '',
      telephone: '',
      email: '',
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="Centre-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="name"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
                <TextAreaFieldGroup
                  placeholder="service"
                  name="service"
                  value={this.state.service}
                  onChange={this.onChange}
                  error={errors.service}
                />
                <TextAreaFieldGroup
                  placeholder="numero"
                  name="numero"
                  value={this.state.numero}
                  onChange={this.onChange}
                  error={errors.numero}
                />
                <TextAreaFieldGroup
                  placeholder="rue"
                  name="rue"
                  value={this.state.rue}
                  onChange={this.onChange}
                  error={errors.rue}
                />
                <TextAreaFieldGroup
                  placeholder="ville"
                  name="ville"
                  value={this.state.ville}
                  onChange={this.onChange}
                  error={errors.ville}
                />
                <TextAreaFieldGroup
                  placeholder="Code postal"
                  name="cp"
                  value={this.state.cp}
                  onChange={this.onChange}
                  error={errors.cp}
                />
                <TextAreaFieldGroup
                  placeholder="telephone"
                  name="telephone"
                  value={this.state.telephone}
                  onChange={this.onChange}
                  error={errors.telephone}
                />
                <TextAreaFieldGroup
                  placeholder="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CentreForm.propTypes = {
  addCentre: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addCentre })(CentreForm);
