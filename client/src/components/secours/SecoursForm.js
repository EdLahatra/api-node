import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addSecours } from '../../actions/SecoursActions';
import attribut from '../../attributs';

class SecoursForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {},
      user: '',
      intitule: '',
      ordre: '',
      categorie: '',
      commentaire: '',
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

    const newSecours = {
      intitule: this.state.intitule,
      ordre: this.state.ordre,
      categorie: this.state.categorie,
      commentaire: this.state.commentaire,
    };

    this.props.addSecours(newSecours);
    this.setState({ text: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="Secours-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              {
                attribut.secours.map(key => {
                  if (key === 'user') {
                    return <div key={key} />;
                  }
                  return <div className="form-group" key={key}>
                  <TextAreaFieldGroup
                    placeholder={`Creaction ${key}`}
                    name={key}
                    value={this.state[key]}
                    onChange={this.onChange}
                    error={errors[key]}
                  />
                </div>
                })
              }
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

SecoursForm.propTypes = {
  addSecours: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addSecours })(SecoursForm);
