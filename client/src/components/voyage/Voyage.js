import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VoyageForm from './VoyageForm';
import VoyageFeed from './VoyageFeed';
import Spinner from '../common/Spinner';
import { getVoyage } from '../../actions/VoyageActions';
import { getPays } from '../../actions/PaysActions';

class Voyage extends Component {
  componentDidMount() {
    // this.props.getVoyage();
    this.props.getPays();
  }

  render() {
    const { voyage, loading } = this.props.voyage;
    const { pays } = this.props.pays;

    console.log('pays pays', pays);
    let voyageContent;

    if (voyage === null || loading) {
      voyageContent = <Spinner />;
    } else {
      voyageContent = <VoyageFeed voyage={voyage} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <VoyageForm pays={pays} />
              {voyageContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Voyage.propTypes = {
  getVoyage: PropTypes.func.isRequired,
  getPays: PropTypes.func.isRequired,
  voyage: PropTypes.object.isRequired,
  pays: PropTypes.object,
};

const mapStateToProps = state => ({
  voyage: state.voyage,
  pays: state.pays,
});

export default connect(mapStateToProps, { getVoyage, getPays })(Voyage);
