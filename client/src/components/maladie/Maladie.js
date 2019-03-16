import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MaladieForm from './MaladieForm';
import MaladieFeed from './MaladieFeed';
import Spinner from '../common/Spinner';
import { getMaladie } from '../../actions/MaladieActions';

class Maladie extends Component {
  componentDidMount() {
    this.props.getMaladie();
  }

  render() {
    const { maladie, loading } = this.props.maladie;
    const { vaccin } = this.props.vaccin;
    const { sejour } = this.props.sejour;
    let maladieContent;

    if (maladie === null || loading) {
      maladieContent = <Spinner />;
    } else {
      maladieContent = <MaladieFeed maladie={maladie} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <MaladieForm vaccin={vaccin} maladie={maladie} sejour={sejour} />
              {maladieContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Maladie.propTypes = {
  getMaladie: PropTypes.func.isRequired,
  maladie: PropTypes.object.isRequired,
  vaccin: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  maladie: state.maladie,
  vaccin: state.vaccin,
  sejour: state.sejour
});

export default connect(mapStateToProps, { getMaladie })(Maladie);
