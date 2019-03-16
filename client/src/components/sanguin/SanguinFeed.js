import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SanguinItem from './SanguinItem';

class SanguinFeed extends Component {
  render() {
    const { sanguin } = this.props;
    if (!sanguin){
      return <div />
    }
    return sanguin.map(item => <SanguinItem key={item._id} sanguin={item} />);
  }
}

SanguinFeed.propTypes = {
  sanguin: PropTypes.array.isRequired
};

export default SanguinFeed;
