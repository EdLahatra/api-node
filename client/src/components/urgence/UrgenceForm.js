import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroupId';
import { addUrgence, updateUrgence } from '../../actions/UrgenceActions';

class UrgenceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.data.description || '',
      numero: this.props.data.numero || '',
      service: this.props.data.service || '',
      pays: this.props.data.pays || '',
      errors: {
        pays: '',
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

    const newUrgence = {
      description: this.state.description,
      pays: this.state.pays || [],
      numero: this.state.numero,
      service: this.state.service,
    };

    if(this.props.data._id) {
      newUrgence.id = this.props.data._id
      this.props.updateUrgence(newUrgence);
    } else {
      this.props.addUrgence(newUrgence);
    }

    this.props.onClose();
    this.setState({
      description: '',
      numero: '',
      service: '',
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="Urgence-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info description-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <TextFieldGroup
                  placeholder="Numero"
                  name="numero"
                  value={this.state.numero}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <TextFieldGroup
                  placeholder="service"
                  name="service"
                  value={this.state.service}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <SelectListGroup
                  placeholder="Pays"
                  name="pays"
                  value={this.state.pays}
                  onChange={this.onChange}
                  options={this.props.pays.pays || []}
                  error={errors.pays}
                  info="Give us an idea of where you are at in your career"
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

UrgenceForm.propTypes = {
  updateUrgence: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  addUrgence: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  pays: PropTypes.any,
};

const mapStateToProps = state => ({
  auth: state.auth,
  pays: state.pays,
  errors: state.errors
});

export default connect(mapStateToProps, { addUrgence, updateUrgence })(UrgenceForm);
