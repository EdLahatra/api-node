import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PaysForm from './PaysForm';
import PaysFeed from './PaysFeed';
import Spinner from '../common/Spinner';
import { getPays } from '../../actions/PaysActions';
import { getMaladie } from '../../actions/MaladieActions';
import { getCentres } from '../../actions/CentreActions';
import { getMedecin } from '../../actions/MedecinActions';

class Pays extends Component {
  componentWillMount() {
    this.props.getPays();
    this.props.getMaladie();
    this.props.getMedecin();
    this.props.getCentres();
  }

  render() {
    const { pays, loading } = this.props.pays;
    const { maladie } = this.props.maladie;
    const { medecin } = this.props.medecin;
    console.log('MEDECIN', medecin)
    let paysContent;

    if (pays === null || loading) {
      paysContent = <Spinner />;
    } else {
      paysContent = <PaysFeed pays={pays} />;
    }
    console.log('medecin medecin medecin', medecin)
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PaysForm
                maladie={maladie}
                medecin={medecin}
                centre={this.props.centre.centre}
              />
              {paysContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Pays.propTypes = {
  getMaladie: PropTypes.func.isRequired,
  getMedecin: PropTypes.func.isRequired,
  getCentres: PropTypes.func.isRequired,
  getPays: PropTypes.func.isRequired,
  pays: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  pays: state.pays,
  maladie: state.maladie,
  centre: state.centre,
  medecin: state.maladie,
});

export default connect(mapStateToProps, { getPays, getMaladie, getMedecin, getCentres })(Pays);
