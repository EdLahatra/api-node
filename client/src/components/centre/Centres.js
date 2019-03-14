import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CentreForm from './CentreForm';
import CentreFeed from './CentreFeed';
import Spinner from '../common/Spinner';
import { getCentres } from '../../actions/CentreActions';

class Centres extends Component {
  componentDidMount() {
    this.props.getCentres();
  }

  render() {
    const { centres, loading } = this.props.centre;
    let centreContent;

    if (centres === null || loading) {
      centreContent = <Spinner />;
    } else {
      centreContent = <CentreFeed centres={centres} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <CentreForm />
              {centreContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Centres.propTypes = {
  getCentres: PropTypes.func.isRequired,
  centre: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  centre: state.centre
});

export default connect(mapStateToProps, { getCentres })(Centres);
