import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAllergie, updateAllergie } from '../../actions/AllergieActions';
import attribut from '../../attributs';

class AllergieItem extends Component {
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

  onDeleteClick(id) {
    this.props.deleteAllergie(id);
  }

  render() {
    const { allergie } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
            {attribut.allergie.map((key, i) => <div key={i}>{key}: {allergie[key]}</div>)}
            <span>
              <button
                onClick={this.onDeleteClick.bind(this, allergie._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
              <button
                onClick={() => this.props.onUpdate(allergie)}
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

AllergieItem.defaultProps = {
  showActions: true
};

AllergieItem.propTypes = {
  deleteAllergie: PropTypes.func.isRequired,
  updateAllergie: PropTypes.func.isRequired,
  allergie: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteAllergie, updateAllergie })(
  AllergieItem
);
