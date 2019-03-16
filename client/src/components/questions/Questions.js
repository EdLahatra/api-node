import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionForm from './QuestionForm';
import QuestionFeed from './QuestionFeed';
import Spinner from '../common/Spinner';
import { getQuestions } from '../../actions/QuestionActions';

class Questions extends Component {
  componentDidMount() {
    this.props.getQuestions();
  }

  render() {
    const { checklists, loading } = this.props.checklist;
    let questionContent;

    if (checklists === null || loading) {
      questionContent = <Spinner />;
    } else {
      questionContent = <QuestionFeed checklists={checklists} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <QuestionForm />
              {questionContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  checklist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  checklist: state.checklist,
});

export default connect(mapStateToProps, { getQuestions })(Questions);
