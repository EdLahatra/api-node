import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MedecinItem from './MedecinItem';

class MedecinFeed extends Component {
  render() {
    const { medecin } = this.props;
    if (!medecin || medecin.length < 0){
      return <div />
    }
    return medecin.map(medecin => <MedecinItem key={medecin._id} medecin={medecin} />);
  }
}

MedecinFeed.propTypes = {
  medecin: PropTypes.array.isRequired
};

export default MedecinFeed;
