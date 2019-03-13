import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SanteForm from './SanteForm';
import SanteFeed from './SanteFeed';
import Spinner from '../common/Spinner';
import { getSante } from '../../actions/SanteActions';

class Sante extends Component {
  componentDidMount() {
    this.props.getSante();
  }

  render() {
    const { sante, loading } = this.props.sante;
    let santeContent;

    if (sante === null || loading) {
      santeContent = <Spinner />;
    } else {
      santeContent = <SanteFeed sante={sante} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <SanteForm />
              {santeContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sante.propTypes = {
  getSante: PropTypes.func.isRequired,
  sante: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  sante: state.sante
});

export default connect(mapStateToProps, { getSante })(Sante);
