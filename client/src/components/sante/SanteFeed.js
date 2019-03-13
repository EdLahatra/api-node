import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SanteItem from './SanteItem';

class SanteFeed extends Component {
  render() {
    const { sante } = this.props;

    return sante.map(sante => <SanteItem key={sante._id} sante={sante} />);
  }
}

SanteFeed.propTypes = {
  sante: PropTypes.array.isRequired
};

export default SanteFeed;
