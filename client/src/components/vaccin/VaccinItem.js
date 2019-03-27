import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { deleteVaccin, updateVaccin } from '../../actions/VaccinActions';

class VaccinItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      rappel: '',
      errors: {},
      open: false,
      id: null,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
 
  onOpenModal = (data) => {
    this.setState({ open: true, id: data._id, text: data.name, rappel: data.rappel, });
  };
 
  onCloseModal = () => {
    this.setState({ open: false, id: null });
  };

  onDeleteClick(id) {
    this.props.deleteVaccin(id);
  }

  onUpdateClick(id) {
    const description = {
      name: this.state.text,
      rappel: this.state.rappel,
      id,
    };
    this.onCloseModal();
    this.props.updateVaccin(description);
  }

  render() {
    const { vaccin } = this.props;
    const { open, errors } = this.state;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
            <p className="lead">{vaccin.name}</p>
              <span>
                <button
                  onClick={this.onDeleteClick.bind(this, vaccin._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
                <button
                  onClick={this.onOpenModal.bind(this, vaccin)}
                  type="button"
                  className="btn btn-info mr-1"
                >
                  update
                </button>
              </span>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="Vaccin-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">Say Something...</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextAreaFieldGroup
                      placeholder="Create a Vaccin"
                      name="text"
                      value={this.state.text}
                      onChange={this.onChange}
                      error={errors.text}
                    />
                    <TextFieldGroup
                      placeholder="Create a Vaccin"
                      name="rappel"
                      type="number"
                      value={this.state.rappel}
                      onChange={this.onChange}
                      error={errors.rappel}
                    />
                  </div>
                </form>
                <button onClick={this.onUpdateClick.bind(this, vaccin._id)} type="submit" className="btn btn-dark">
                  Update
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

VaccinItem.defaultProps = {
  showActions: true
};

VaccinItem.propTypes = {
  deleteVaccin: PropTypes.func.isRequired,
  updateVaccin: PropTypes.func.isRequired,
  vaccin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteVaccin, updateVaccin })(
  VaccinItem
);
