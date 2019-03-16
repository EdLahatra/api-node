import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SejourItem from './SejourItem';

class SejourFeed extends Component {
  render() {
    const { sejour } = this.props;
    if(!sejour) {
      return <div />
    }
    return sejour.map(item => <SejourItem key={item._id} sejour={item} />);
  }
}

SejourFeed.propTypes = {
  sejour: PropTypes.array.isRequired
};

export default SejourFeed;
