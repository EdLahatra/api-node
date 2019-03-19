import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSecours, updateSecours } from '../../actions/SecoursActions';
import attribut from '../../attributs';

class SecoursItem extends Component {
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
    this.props.deleteSecours(id);
  }

  render() {
    const { secours } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
            {attribut.secours.map((key, i) => <div key={i}>{key}: {secours[key]}</div>)}
            <span>
              <button
                onClick={this.onDeleteClick.bind(this, secours._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
              <button
                onClick={() => this.props.onUpdate(secours)}
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

SecoursItem.defaultProps = {
  showActions: true
};

SecoursItem.propTypes = {
  deleteSecours: PropTypes.func.isRequired,
  updateSecours: PropTypes.func.isRequired,
  secours: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteSecours, updateSecours })(
  SecoursItem
);
