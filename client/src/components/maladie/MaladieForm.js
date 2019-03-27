import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroupMultiple from '../common/SelectListGroupMultiple';
import { addMaladie } from '../../actions/MaladieActions';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

class MaladieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      description: '',
      errors: {},
      vaccin: '',
      vaccinList: [],
      vaccinSuggList: [],
      sejourList: [],
      risque: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newMaladie = {
      name: this.state.text,
      description: this.state.description,
      vaccin: this.state.vaccinList,
      vaccinSugg: this.state.vaccinSuggList,
      sejour: this.state.sejourList,
      risque: this.state.risque,
    };

    this.props.addMaladie(newMaladie);
    this.setState({ text: '', vaccinList: [], sejourList: [] });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isChecked = item => this.state.vaccinList.filter(key => key._id === item._id).length > 0

  isCheckedSejour = item => this.state.sejourList.filter(key => key._id === item._id).length > 0

  render() {
    const { errors, vaccinList, sejourList, vaccinSuggList } = this.state;
    return (
      <div className="Maladie-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a Maladie"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
                <TextAreaFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.text}
                />
                <TextAreaFieldGroup
                  placeholder="Les Risques principaux"
                  name="risque"
                  value={this.state.risque}
                  onChange={this.onChange}
                  error={errors.risque}
                />
                <p>Vaccin</p>
                <Select
                  name="vaccin"
                  value={vaccinList}
                  onChange={vaccinList => this.setState({ vaccinList })}
                  options={this.props.vaccin}
                  isMulti
                />
                <p>vaccin à Sugg</p>
                <Select
                  name="vaccinSuggList"
                  value={vaccinSuggList}
                  onChange={vaccinSuggList => this.setState({ vaccinSuggList })}
                  options={this.props.vaccin}
                  isMulti
                />
                <p>Sejour</p>
                <Select
                  name="sejour"
                  value={sejourList}
                  onChange={sejourList => this.setState({ sejourList })}
                  options={this.props.sejour}
                  isMulti
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

MaladieForm.propTypes = {
  addMaladie: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  // vaccin: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addMaladie })(MaladieForm);
