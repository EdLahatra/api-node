import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VaccinForm from './VaccinForm';
import VaccinFeed from './VaccinFeed';
import Spinner from '../common/Spinner';
import { getVaccin } from '../../actions/VaccinActions';

class Vaccin extends Component {
  componentDidMount() {
    this.props.getVaccin();
  }

  render() {
    const { vaccin, loading } = this.props.vaccin;
    let vaccinContent;

    if (vaccin === null || loading) {
      vaccinContent = <Spinner />;
    } else {
      vaccinContent = <VaccinFeed vaccin={vaccin} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <VaccinForm />
              {vaccinContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Vaccin.propTypes = {
  getVaccin: PropTypes.func.isRequired,
  vaccin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  vaccin: state.vaccin
});

export default connect(mapStateToProps, { getVaccin })(Vaccin);
