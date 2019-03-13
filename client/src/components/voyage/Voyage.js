import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VoyageForm from './VoyageForm';
import VoyageFeed from './VoyageFeed';
import Spinner from '../common/Spinner';
import { getVoyage } from '../../actions/VoyageActions';

class Voyage extends Component {
  componentDidMount() {
    this.props.getVoyage();
  }

  render() {
    const { voyage, loading } = this.props.voyage;
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
              <VoyageForm />
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
  voyage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  voyage: state.voyage
});

export default connect(mapStateToProps, { getVoyage })(Voyage);
