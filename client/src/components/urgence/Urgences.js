import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import UrgenceForm from './UrgenceForm';
import UrgenceFeed from './UrgenceFeed';
import Spinner from '../common/Spinner';
import { getUrgence } from '../../actions/UrgenceActions';

class Urgences extends Component {
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
    this.props.getUrgence();
  }

  render() {
    const { urgence, loading } = this.props.urgence;
    const { open, data } = this.state;
    let urgenceContent;

    if (urgence === null || loading) {
      urgenceContent = <Spinner />;
    } else {
      urgenceContent = <UrgenceFeed urgence={urgence} onUpdate={this.onUpdate} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
                <button onClick={this.onOpenModal} type="submit" className="btn btn-dark">
                  Ajout
                </button>
              {urgenceContent}
            </div>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <UrgenceForm onClose={this.onCloseModal} data={data} />
        </Modal>
      </div>
    );
  }
}

Urgences.propTypes = {
  getUrgence: PropTypes.func.isRequired,
  urgence: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  urgence: state.urgence
});

export default connect(mapStateToProps, { getUrgence })(Urgences);
