import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VaccinItem from './VaccinItem';

class VaccinFeed extends Component {
  render() {
    const { vaccin } = this.props;

    return vaccin.map(vaccin => <VaccinItem key={vaccin._id} vaccin={vaccin} />);
  }
}

VaccinFeed.propTypes = {
  vaccin: PropTypes.array.isRequired
};

export default VaccinFeed;
