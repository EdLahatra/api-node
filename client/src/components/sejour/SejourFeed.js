import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SejourItem from './SejourItem';

class SejourFeed extends Component {
  render() {
    const { sejours } = this.props;
    if(!sejours) {
      return <div />
    }
    return sejours.map(sejour => <SejourItem key={sejour._id} sejour={sejour} />);
  }
}

SejourFeed.propTypes = {
  sejours: PropTypes.array.isRequired
};

export default SejourFeed;
