import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroupId';
import TextFieldGroup from '../common/TextFieldGroup';
import { addVoyage, updateVoyage } from '../../actions/VoyageActions';

class VoyageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        pays: '',
      },
      name: this.props.data.name || '',
      depart: this.props.data.depart || '',
      arrive: this.props.data.arrive || '',
      pays: this.props.data.pays || '',
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

    const newVoyage = {
      name: this.state.name,
      dateDepart: this.state.dateDepart,
      dateArrive: this.state.dateDepart,
      id: user._id,
      pays: this.state.pays || [],
    };
    if(this.props.data._id) {
      newVoyage.id = this.props.data._id
      this.props.updateVoyage(newVoyage);
    } else {
      this.props.addVoyage(newVoyage);
    }
    this.props.onClose();

    this.setState({
      name: '',
      errors: {
        pays: '',
      },
      pays: '',
      depart: '',
      arrive: '',
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="Voyage-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a Voyage"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <SelectListGroup
                  placeholder="pays"
                  name="pays"
                  value={this.state.pays}
                  onChange={this.onChange}
                  options={this.props.pays || []}
                  error={errors.pays}
                  info="Give us an idea of where you are at in your career"
                />
                <h6>Date Depart</h6>
                <TextFieldGroup
                  name="depart"
                  type="date"
                  value={this.state.depart}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>Date Arrivée</h6>
                <TextFieldGroup
                  name="arrive"
                  type="date"
                  value={this.state.arrive}
                  onChange={this.onChange}
                  error={errors.from}
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

VoyageForm.propTypes = {
  updateVoyage: PropTypes.func.isRequired,
  addVoyage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  pays: PropTypes.any,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addVoyage, updateVoyage })(VoyageForm);
