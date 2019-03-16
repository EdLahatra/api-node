import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategorieForm from './CategorieForm';
import CategorieFeed from './CategorieFeed';
import Spinner from '../common/Spinner';
import { getCategorie } from '../../actions/CategorieActions';

class Categorie extends Component {
  componentDidMount() {
    this.props.getCategorie();
  }

  render() {
    const { categorie, loading } = this.props.categorie;
    let CategorieContent;

    if (Categorie === null || loading) {
      CategorieContent = <Spinner />;
    } else {
      CategorieContent = <CategorieFeed categorie={categorie} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <CategorieForm />
              {CategorieContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Categorie.propTypes = {
  getCategorie: PropTypes.func.isRequired,
  categorie: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categorie: state.categorie
});

export default connect(mapStateToProps, { getCategorie })(Categorie);
