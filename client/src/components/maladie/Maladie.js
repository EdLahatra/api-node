import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MaladieForm from './MaladieForm';
import MaladieFeed from './MaladieFeed';
import Spinner from '../common/Spinner';
import { getMaladie } from '../../actions/MaladieActions';

class Maladie extends Component {
  componentDidMount() {
    this.props.getMaladie();
  }

  render() {
    const { pays, loading } = this.props.pays;
    const { vaccin } = this.props.vaccin;

    console.log('vaccin', vaccin);
    let paysContent;

    if (pays === null || loading) {
      paysContent = <Spinner />;
    } else {
      paysContent = <MaladieFeed pays={pays} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <MaladieForm vaccin={vaccin} />
              {paysContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Maladie.propTypes = {
  getMaladie: PropTypes.func.isRequired,
  pays: PropTypes.object.isRequired,
  vaccin: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  pays: state.pays,
  vaccin: state.vaccin
});

export default connect(mapStateToProps, { getMaladie })(Maladie);
