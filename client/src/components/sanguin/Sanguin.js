import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SanguinForm from './SanguinForm';
import SanguinFeed from './SanguinFeed';
import Spinner from '../common/Spinner';
import { getSanguin } from '../../actions/SanguinActions';

class Sanguins extends Component {
  componentDidMount() {
    this.props.getSanguin();
  }

  render() {
    const { sanguin, loading } = this.props.sanguin;
    let SanguinContent;

    if (sanguin === null || loading) {
      SanguinContent = <Spinner />;
    } else {
      SanguinContent = <SanguinFeed sanguin={sanguin} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <SanguinForm />
              {SanguinContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sanguins.propTypes = {
  getSanguin: PropTypes.func.isRequired,
  sanguin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  sanguin: state.sanguin
});

export default connect(mapStateToProps, { getSanguin })(Sanguins);
