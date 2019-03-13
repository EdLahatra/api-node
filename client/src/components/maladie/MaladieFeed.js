import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaladieItem from './MaladieItem';

class MaladieFeed extends Component {
  render() {
    const { pays } = this.props;

    return pays.map(pays => <MaladieItem key={pays._id} pays={pays} />);
  }
}

MaladieFeed.propTypes = {
  pays: PropTypes.array.isRequired
};

export default MaladieFeed;
