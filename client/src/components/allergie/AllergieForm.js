import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { addAllergie, updateAllergie } from '../../actions/AllergieActions';
import attribut from '../../attributs';

class AllergieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.data.description || '',
      categorie: this.props.data.categorie || '',
      name: this.props.data.name || '',
      errors: {
      },
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

    const newAllergie = {
      description: this.state.description,
      categorie: this.state.categorie,
      name: this.state.name,
    };

    if(this.props.data._id) {
      newAllergie.id = this.props.data._id
      this.props.updateAllergie(newAllergie);
    } else {
      this.props.addAllergie(newAllergie);
    }

    this.props.onClose();
    this.setState({
      description: '',
      name: '',
      categorie: '',
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="Allergie-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info description-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              {
                attribut.allergie.map(item => {
                  return <div className="form-group">
                  <TextFieldGroup
                    placeholder={item}
                    name={item}
                    value={this.state[item]}
                    onChange={this.onChange}
                    error={errors[item]}
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

AllergieForm.propTypes = {
  updateAllergie: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  addAllergie: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  pays: PropTypes.any,
};

const mapStateToProps = state => ({
  auth: state.auth,
  pays: state.pays,
  errors: state.errors
});

export default connect(mapStateToProps, { addAllergie, updateAllergie })(AllergieForm);
