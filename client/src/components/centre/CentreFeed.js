import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CentreItem from './CentreItem';

class CentreFeed extends Component {
  render() {
    const { centre } = this.props;
    if(!centre) {
      return <div />
    }
    
    return centre.map(item => <CentreItem
      key={item._id}
      centre={item}
      onUpdate={() => this.props.onUpdate(item)}
      />);
  }
}


CentreFeed.propTypes = {
  centre: PropTypes.array.isRequired
};

export default CentreFeed;
