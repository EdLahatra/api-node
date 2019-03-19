import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SanteForm from './SanteForm';
import SanteFeed from './SanteFeed';
import Spinner from '../common/Spinner';
import { getSante } from '../../actions/SanteActions';
import { getSanguin } from '../../actions/SanguinActions';
import { getAllergie } from '../../actions/AllergieActions';

class Sante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: {}
    };
  }

  onOpenModal = () => {
    this.setState({ open: true, data: {} });
  };

  onUpdate = data => {
    this.setState({ open: true, data });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.getSante();
    this.props.getSanguin();
    this.props.getAllergie();
  }

  render() {
    const { sante, loading } = this.props.sante;
    let santeContent;
    const { open, data } = this.state;
  
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
              <SanteForm
                sanguin={this.props.sanguin.sanguin}
                allergie={this.props.allergie.allergie}
                onClose={this.onCloseModal}
                data={data}
              />
              {santeContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sante.propTypes = {
  getSanguin: PropTypes.func.isRequired,
  getSante: PropTypes.func.isRequired,
  sante: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  sante: state.sante,
  sanguin: state.sanguin,
  allergie: state.allergie,
});

export default connect(mapStateToProps, { getSante, getSanguin, getAllergie })(Sante);
