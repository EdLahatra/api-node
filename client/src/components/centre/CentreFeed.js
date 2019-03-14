import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CentreItem from './CentreItem';

class CentreFeed extends Component {
  render() {
    const { centres } = this.props;
    if(!centres) {
      return <div />
    }
    return centres.map(centre => <CentreItem key={centre._id} centre={centre} />);
  }
}

CentreFeed.propTypes = {
  centres: PropTypes.array.isRequired
};

export default CentreFeed;
