import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaladieItem from './MaladieItem';

class MaladieFeed extends Component {
  render() {
    const { maladie } = this.props;
    if(!maladie) {
      return <div />
    }
    return maladie.map(maladie => <MaladieItem key={maladie._id} maladie={maladie} />);
  }
}

MaladieFeed.propTypes = {
  maladie: PropTypes.array.isRequired
};

export default MaladieFeed;
