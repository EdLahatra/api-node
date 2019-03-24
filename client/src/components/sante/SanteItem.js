import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { deleteSante, updateSante } from '../../actions/SanteActions';
import attribut from '../../attributs';

class SanteItem extends Component {
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
    this.props.deleteSante(id);
  }

  onUpdateClick(id) {
    const description = {
      name: this.state.text,
      id,
    };
    this.onCloseModal();
    this.props.updateSante(description);
  }

  render() {
    const { sante } = this.props;
    const { open, errors } = this.state;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
          {attribut.sante.map((key, i) => {
            if (key === 'allergie') {
              return <div key={i}>{key}: {sante[key].map(i => <p>{i._id}</p>)}</div>
            }
            return <div key={i}>{key}: {sante[key]}</div>
          })}
              <span>
                <button
                  onClick={this.onDeleteClick.bind(this, sante._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
                <button
                  onClick={this.onOpenModal.bind(this, sante)}
                  type="button"
                  className="btn btn-info mr-1"
                >
                  update
                </button>
              </span>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="Sante-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">Say Something...</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextAreaFieldGroup
                      placeholder="Create a Sante"
                      name="text"
                      value={this.state.text}
                      onChange={this.onChange}
                      error={errors.text}
                    />
                  </div>
                </form>
                <button onClick={this.onUpdateClick.bind(this, sante._id)} type="submit" className="btn btn-dark">
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

SanteItem.defaultProps = {
  showActions: true
};

SanteItem.propTypes = {
  deleteSante: PropTypes.func.isRequired,
  updateSante: PropTypes.func.isRequired,
  sante: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteSante, updateSante })(
  SanteItem
);
