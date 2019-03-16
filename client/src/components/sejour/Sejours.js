import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SejourForm from './SejourForm';
import SejourFeed from './SejourFeed';
import Spinner from '../common/Spinner';
import { getSejours } from '../../actions/SejourActions';

class Sejours extends Component {
  componentDidMount() {
    this.props.getSejours();
  }

  render() {
    const { sejour, loading } = this.props.sejour;
    let sejourContent;

    if (sejour === null || loading) {
      sejourContent = <Spinner />;
    } else {
      sejourContent = <SejourFeed sejour={sejour} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <SejourForm />
              {sejourContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sejours.propTypes = {
  getSejours: PropTypes.func.isRequired,
  sejour: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  sejour: state.sejour
});

export default connect(mapStateToProps, { getSejours })(Sejours);
