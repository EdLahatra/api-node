import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UrgenceForm from './UrgenceForm';
import UrgenceFeed from './UrgenceFeed';
import Spinner from '../common/Spinner';
import { getUrgences } from '../../actions/UrgenceActions';

class Urgences extends Component {
  componentDidMount() {
    this.props.getUrgences();
  }

  render() {
    const { urgences, loading } = this.props.urgence;
    let urgenceContent;

    if (urgences === null || loading) {
      urgenceContent = <Spinner />;
    } else {
      urgenceContent = <UrgenceFeed urgences={urgences} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <UrgenceForm />
              {urgenceContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Urgences.propTypes = {
  getUrgences: PropTypes.func.isRequired,
  urgence: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  urgence: state.urgence
});

export default connect(mapStateToProps, { getUrgences })(Urgences);
