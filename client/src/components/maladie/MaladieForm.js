import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroupMultiple from '../common/SelectListGroupMultiple';
import { addMaladie } from '../../actions/MaladieActions';

class MaladieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {},
      vaccin: '',
      vaccinList: [],
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

    const newMaladie = {
      name: this.state.text,
      vaccin: this.state.vaccinList,
    };
    this.props.addMaladie(newMaladie);
    this.setState({ text: '', vaccin: [] });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleChange = item => {
    let vaccinList = [];
    if (this.isChecked(item)){
      vaccinList = this.state.vaccinList.filter(key => key._id !== item._id)
    } else {
      vaccinList = [...this.state.vaccinList, item]
    }
    this.setState({ vaccinList });
  }

  isChecked = item => this.state.vaccinList.filter(key => key._id === item._id).length > 0

  render() {
    const { errors, vaccinList } = this.state;

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
                {
                  this.props.vaccin.map((item, key) => {
                    console.log('this.isChecked(item._id)', this.isChecked(item._id))
                    return (
                      <div key={key}>
                        {item.name}
                        <input type="checkbox"
                          checked={this.isChecked(item)}
                          onChange={() => this.toggleChange(item)}
                        />
                      </div>
                    )
                  })
                }
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
