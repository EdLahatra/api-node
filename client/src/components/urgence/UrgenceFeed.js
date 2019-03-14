import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UrgenceItem from './UrgenceItem';

class UrgenceFeed extends Component {
  render() {
    const { urgences } = this.props;

    return urgences.map(urgence => <UrgenceItem key={urgence._id} urgence={urgence} />);
  }
}

UrgenceFeed.propTypes = {
  urgences: PropTypes.array.isRequired
};

export default UrgenceFeed;
