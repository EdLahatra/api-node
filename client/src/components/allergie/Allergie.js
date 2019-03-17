import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import AllergieForm from './AllergieForm';
import AllergieFeed from './AllergieFeed';
import Spinner from '../common/Spinner';
import { getAllergie } from '../../actions/AllergieActions';

class Allergies extends Component {
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
    this.props.getAllergie();
  }

  render() {
    const { allergie, loading } = this.props.allergie;
    const { open, data } = this.state;
    let AllergieContent;

    if (allergie === null || loading) {
      AllergieContent = <Spinner />;
    } else {
      AllergieContent = <AllergieFeed allergie={allergie} onUpdate={this.onUpdate} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
                <button onClick={this.onOpenModal} type="submit" className="btn btn-dark">
                  Ajout
                </button>
              {AllergieContent}
            </div>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <AllergieForm onClose={this.onCloseModal} data={data} />
        </Modal>
      </div>
    );
  }
}

Allergies.propTypes = {
  getAllergie: PropTypes.func.isRequired,
  allergie: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  allergie: state.allergie
});

export default connect(mapStateToProps, { getAllergie })(Allergies);
