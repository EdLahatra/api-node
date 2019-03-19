import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { addDocuments, updateDocuments } from '../../actions/DocumentsActions';
import attribut from '../../attributs';

class DocumentsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.data.description || '',
      categorie: this.props.data.categorie || '',
      name: this.props.data.name || '',
      errors: {
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

    const newDocuments = {
      description: this.state.description,
      categorie: this.state.categorie,
      name: this.state.name,
    };

    if(this.props.data._id) {
      newDocuments.id = this.props.data._id
      this.props.updateDocuments(newDocuments);
    } else {
      this.props.addDocuments(newDocuments);
    }

    this.props.onClose();
    this.setState({
      description: '',
      name: '',
      categorie: '',
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="Documents-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info description-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              {
                attribut.documents && attribut.documents.map((item, key) => {
                  return <div key={key} className="form-group">
                  <TextFieldGroup
                    placeholder={item}
                    name={item}
                    value={this.state[item]}
                    onChange={this.onChange}
                    error={errors[item]}
                  />
                </div>
                })
              }
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

DocumentsForm.propTypes = {
  updateDocuments: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  addDocuments: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  pays: PropTypes.any,
};

const mapStateToProps = state => ({
  auth: state.auth,
  pays: state.pays,
  errors: state.errors
});

export default connect(mapStateToProps, { addDocuments, updateDocuments })(DocumentsForm);
