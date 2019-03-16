import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteVoyage, updateVoyage } from '../../actions/VoyageActions';
import attribut from '../../attributs';

class VoyageItem extends Component {
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
    this.props.deleteVoyage(id);
  }

  onUpdateClick(id) {
    const description = {
      name: this.state.text,
      id,
    };
    this.onCloseModal();
    this.props.updateVoyage(description);
  }

  render() {
    const { voyage } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
            {attribut.voyage.map((key, i) => <div key={i}>{key}: {voyage[key]}</div>)}
              <span>
                <button
                  onClick={this.onDeleteClick.bind(this, voyage._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
                <button
                  onClick={() => this.props.onUpdate(voyage)}
                  type="button"
                  className="btn btn-info mr-1"
                >
                  update
                </button>
              </span>
          </div>
        </div>
      </div>
    );
  }
}

VoyageItem.defaultProps = {
  showActions: true
};

VoyageItem.propTypes = {
  deleteVoyage: PropTypes.func.isRequired,
  updateVoyage: PropTypes.func.isRequired,
  voyage: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteVoyage, updateVoyage })(
  VoyageItem
);
