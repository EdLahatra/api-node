import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionItem from './QuestionItem';

class QuestionFeed extends Component {
  render() {
    const { checklists } = this.props;

    return checklists.map(checklist => <QuestionItem key={checklist._id} checklist={checklist} />);
  }
}

QuestionFeed.propTypes = {
  checklists: PropTypes.array.isRequired
};

export default QuestionFeed;
