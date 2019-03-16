import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroupId';
import { addPays } from '../../actions/PaysActions';
import attribut from '../../attributs';

class PaysForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      capital: '',
      indicatifPhone: '',
      decalageHoraore: '',
      monnaie: '',
      permis: '',
      maladie: '',
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

    const newPays = {
      name: this.state.name,
      capital: this.state.capital,
      indicatifPhone: this.state.indicatifPhone,
      decalageHoraore: this.state.decalageHoraore,
      monnaie: this.state.monnaie,
      permis: this.state.permis,
      maladie: this.state.maladie,
    };
    this.props.addPays(newPays);
    this.setState({ text: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="Pays-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
              {
                attribut.pays.map((key, i) => {
                  if (key === 'maladie') {
                    return (
                      <SelectListGroup
                        key={`${i} ${key}`}
                        placeholder={key}
                        value={this.state[key]}
                        onChange={this.onChange}
                        options={this.props.maladie || []}
                        error={errors.maladie}
                        info=""
                      />
                    )
                  }
                  return <TextFieldGroup
                  key={`${i} ${key}`}
                  placeholder={key}
                  name={key}
                  value={this.state[key]}
                  onChange={this.onChange}
                  error={errors[key]}
                />
                })
              }
                {/* <TextFieldGroup
                  placeholder="Create a Pays"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                /> */}
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

PaysForm.propTypes = {
  addPays: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPays })(PaysForm);
