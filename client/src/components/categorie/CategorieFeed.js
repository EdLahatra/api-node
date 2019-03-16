import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategorieItem from './CategorieItem';

class CategorieFeed extends Component {
  render() {
    const { categorie } = this.props;
    if (!categorie) {
      return <div />
    }
    return categorie.map(item => <CategorieItem key={item._id} categorie={item} />);
  }
}

CategorieFeed.propTypes = {
  categorie: PropTypes.array.isRequired
};

export default CategorieFeed;
