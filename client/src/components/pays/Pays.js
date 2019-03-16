import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PaysForm from './PaysForm';
import PaysFeed from './PaysFeed';
import Spinner from '../common/Spinner';
import { getPays } from '../../actions/PaysActions';

class Pays extends Component {
  componentDidMount() {
    this.props.getPays();
  }

  render() {
    const { pays, loading } = this.props.pays;
    const { maladie } = this.props.maladie;
    let paysContent;

    if (pays === null || loading) {
      paysContent = <Spinner />;
    } else {
      paysContent = <PaysFeed pays={pays} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PaysForm maladie={maladie} />
              {paysContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Pays.propTypes = {
  getPays: PropTypes.func.isRequired,
  pays: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  pays: state.pays,
  maladie: state.maladie,
});

export default connect(mapStateToProps, { getPays })(Pays);
