import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import VoyageForm from './VoyageForm';
import VoyageFeed from './VoyageFeed';
import Spinner from '../common/Spinner';
import { getVoyage } from '../../actions/VoyageActions';
import { getPays } from '../../actions/PaysActions';

class Voyage extends Component {
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
    console.log('data', data);
    this.setState({ open: true, data });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const { pays } = this.props.pays;
    this.props.getVoyage();
    if(pays.length === 0) this.props.getPays();
  }

  render() {
    const { voyage, loading } = this.props.voyage;
    const { pays } = this.props.pays;
    const { open, data } = this.state;

    let voyageContent;

    if (voyage === null || loading) {
      voyageContent = <Spinner />;
    } else {
      voyageContent = <VoyageFeed voyage={voyage} onUpdate={this.onUpdate} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
          <button onClick={this.onOpenModal} type="submit" className="btn btn-dark">
                  Ajout
                </button>
            <div className="col-md-12">
              {voyageContent}
            </div>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <VoyageForm pays={pays} onClose={this.onCloseModal} data={data} />
        </Modal>
      </div>
    );
  }
}

Voyage.propTypes = {
  getVoyage: PropTypes.func.isRequired,
  getPays: PropTypes.func.isRequired,
  voyage: PropTypes.object.isRequired,
  pays: PropTypes.object,
};

const mapStateToProps = state => ({
  voyage: state.voyage,
  pays: state.pays,
});

export default connect(mapStateToProps, { getVoyage, getPays })(Voyage);
