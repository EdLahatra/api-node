import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { deletePays, updatePays } from '../../actions/PaysActions';
import attribut from '../../attributs';

class PaysItem extends Component {
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
    this.setState({ open: true, id: data._id, text: data.name });
  };
 
  onCloseModal = () => {
    this.setState({ open: false, id: null });
  };

  onDeleteClick(id) {
    this.props.deletePays(id);
  }

  onUpdateClick(id) {
    const description = {
      name: this.state.text,
      id,
    };
    this.onCloseModal();
    this.props.updatePays(description);
  }

  render() {
    const { pays } = this.props;
    const { open, errors } = this.state;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
          {attribut.pays.map((key, i) => {
            if (key === 'eau') {
              return<div key={i}>{key} Potable: {pays[key].potable ? 'yes' : 'no'} { pays[key].commentaire ? pays[key].commentaire : ''}</div>
            }
            if (key === 'maladie') {
              return<div key={i}>{key}: {pays[key].map(k => <p key={k._id}>{k._id}</p>)}</div>
            }
            if (key === 'centre') {
              return<div key={i}>{key}: {pays[key].map(k => <p key={k._id}>{k._id}</p>)}</div>
            }
            if (key === 'medecin') {
              return<div key={i}>{key}: {pays[key].map(k => <p key={k._id}>{k._id}</p>)}</div>
            }
            return <div key={i}>{key}: {pays[key]}</div>
          })}
              <span>
                <button
                  onClick={this.onDeleteClick.bind(this, pays._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
                <button
                  onClick={this.onOpenModal.bind(this, pays)}
                  type="button"
                  className="btn btn-info mr-1"
                >
                  update
                </button>
              </span>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="Pays-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">Say Something...</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextAreaFieldGroup
                      placeholder="Create a Pays"
                      name="text"
                      value={this.state.text}
                      onChange={this.onChange}
                      error={errors.text}
                    />
                  </div>
                </form>
                <button onClick={this.onUpdateClick.bind(this, pays._id)} type="submit" className="btn btn-dark">
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

PaysItem.defaultProps = {
  showActions: true
};

PaysItem.propTypes = {
  deletePays: PropTypes.func.isRequired,
  updatePays: PropTypes.func.isRequired,
  pays: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePays, updatePays })(
  PaysItem
);
