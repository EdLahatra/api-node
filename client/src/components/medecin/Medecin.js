import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MedecinForm from './MedecinForm';
import MedecinFeed from './MedecinFeed';
import Spinner from '../common/Spinner';
import { getMedecin } from '../../actions/MedecinActions';

class Medecin extends Component {
  componentDidMount() {
    this.props.getMedecin();
  }

  render() {
    const { medecin, loading } = this.props.medecin;
    let medecinContent;
    console.log('v ;!sd v!s!cv !xc!vcx', medecin);
    if (medecin === null || loading) {
      medecinContent = <Spinner />;
    } else {
      medecinContent = <MedecinFeed medecin={medecin} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <MedecinForm />
              {medecinContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Medecin.propTypes = {
  getMedecin: PropTypes.func.isRequired,
  medecin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  medecin: state.medecin
});

export default connect(mapStateToProps, { getMedecin })(Medecin);
