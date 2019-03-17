import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AllergieItem from './AllergieItem';

class AllergieFeed extends Component {
  render() {
    const { allergie } = this.props;
    if (!allergie){
      return <div />
    }
    return allergie.map(item => <AllergieItem
      key={item._id}
      allergie={item}
      onUpdate={() => this.props.onUpdate(item)}
      />);
  }
}


AllergieFeed.propTypes = {
  allergie: PropTypes.array.isRequired
};

export default AllergieFeed;
