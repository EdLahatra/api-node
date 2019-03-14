import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { deleteCentre, updateCentre } from '../../actions/CentreActions';

class CentreItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
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
    this.setState({ open: true, id: data._id, text: data.description });
  };
 
  onCloseModal = () => {
    this.setState({ open: false, id: null });
  };

  onDeleteClick(id) {
    this.props.deleteCentre(id);
  }

  onUpdateClick(id) {
    const description = {
      description: this.state.text,
      id,
    };
    this.onCloseModal();
    this.props.updateCentre(description);
  }

  render() {
    const { centre } = this.props;
    const { open, errors } = this.state;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
            <p className="lead">{centre.description}</p>
              <span>
                <button
                  onClick={this.onDeleteClick.bind(this, centre._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
                <button
                  onClick={this.onOpenModal.bind(this, centre)}
                  type="button"
                  className="btn btn-info mr-1"
                >
                  update
                </button>
              </span>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="Centre-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">Say Something...</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextAreaFieldGroup
                      placeholder="Create a Centre"
                      name="text"
                      value={this.state.text}
                      onChange={this.onChange}
                      error={errors.text}
                    />
                  </div>
                </form>
                <button onClick={this.onUpdateClick.bind(this, centre._id)} type="submit" className="btn btn-dark">
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

CentreItem.defaultProps = {
  showActions: true
};

CentreItem.propTypes = {
  deleteCentre: PropTypes.func.isRequired,
  updateCentre: PropTypes.func.isRequired,
  centre: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteCentre, updateCentre })(
  CentreItem
);
