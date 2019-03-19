import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SecoursItem from './SecoursItem';

class SecoursFeed extends Component {
  render() {
    const { secours } = this.props;
    if (!secours){
      return <div />
    }
    return secours.map(item => <SecoursItem
      key={item._id}
      secours={item}
      onUpdate={() => this.props.onUpdate(item)}
      />);
  }
}


SecoursFeed.propTypes = {
  secours: PropTypes.array.isRequired
};

export default SecoursFeed;
