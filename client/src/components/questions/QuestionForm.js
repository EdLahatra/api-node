import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addQuestion } from '../../actions/QuestionActions';
import attribut from '../../attributs';

const initial = {
  text: '',
  errors: {},
  user: '',
  intitule: '',
  ordre: '',
  categorie: '',
  commentaire: '',
}
class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initial,
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

    const newQuestion = {
      intitule: this.state.intitule,
      ordre: this.state.ordre,
      categorie: this.state.categorie,
      commentaire: this.state.commentaire,
    };

    this.props.addQuestion(newQuestion);
    this.setState({ ...initial });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="Question-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              {
                attribut.checklist.map(key => {
                  if (key === 'user') {
                    return <div key={key} />;
                  }
                  return <div className="form-group" key={key}>
                  <TextAreaFieldGroup
                    placeholder={`Creaction ${key}`}
                    name={key}
                    value={this.state[key]}
                    onChange={this.onChange}
                    error={errors[key]}
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

QuestionForm.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addQuestion })(QuestionForm);
