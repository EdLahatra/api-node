import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VoyageItem from './VoyageItem';

class VoyageFeed extends Component {
  render() {
    const { voyage } = this.props;
    if (!voyage){
      return <div />
    }
    return voyage.map(voyage => <VoyageItem key={voyage._id} voyage={voyage} onUpdate={() => this.props.onUpdate(voyage)} />);
  }
}

VoyageFeed.propTypes = {
  voyage: PropTypes.array.isRequired
};

export default VoyageFeed;
