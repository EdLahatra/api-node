import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaysItem from './PaysItem';

class PaysFeed extends Component {
  render() {
    const { pays } = this.props;

    return pays.map(pays => <PaysItem key={pays._id} pays={pays} />);
  }
}

PaysFeed.propTypes = {
  pays: PropTypes.array.isRequired
};

export default PaysFeed;
