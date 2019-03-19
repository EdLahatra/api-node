import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteDocuments, updateDocuments } from '../../actions/DocumentsActions';
import attribut from '../../attributs';

class DocumentsItem extends Component {
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
    this.props.deleteDocuments(id);
  }

  render() {
    const { documents } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
            {attribut.documents.map((key, i) => <div key={i}>{key}: {documents[key]}</div>)}
            <span>
              <button
                onClick={this.onDeleteClick.bind(this, documents._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
              <button
                onClick={() => this.props.onUpdate(documents)}
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

DocumentsItem.defaultProps = {
  showActions: true
};

DocumentsItem.propTypes = {
  deleteDocuments: PropTypes.func.isRequired,
  updateDocuments: PropTypes.func.isRequired,
  documents: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteDocuments, updateDocuments })(
  DocumentsItem
);
