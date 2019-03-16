import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UrgenceItem from './UrgenceItem';

class UrgenceFeed extends Component {
  render() {
    const { urgence } = this.props;
    if (!urgence){
      return <div />
    }
    return urgence.map(urgence => <UrgenceItem
      key={urgence._id}
      urgence={urgence}
      onUpdate={() => this.props.onUpdate(urgence)}
      />);
  }
}


UrgenceFeed.propTypes = {
  urgence: PropTypes.array.isRequired
};

export default UrgenceFeed;
