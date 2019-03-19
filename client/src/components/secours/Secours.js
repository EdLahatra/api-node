import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import SecoursForm from './SecoursForm';
import SecoursFeed from './SecoursFeed';
import Spinner from '../common/Spinner';
import { getSecours } from '../../actions/SecoursActions';

class Secours extends Component {
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
    this.props.getSecours();
  }

  render() {
    const { secours, loading } = this.props.secours;
    console.log('secours secours', secours);
    const { open, data } = this.state;
    let SecoursContent;

    if (secours === null || loading) {
      SecoursContent = <Spinner />;
    } else {
      SecoursContent = <SecoursFeed secours={secours} onUpdate={this.onUpdate} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
                <button onClick={this.onOpenModal} type="submit" className="btn btn-dark">
                  Ajout
                </button>
              {SecoursContent}
            </div>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <SecoursForm onClose={this.onCloseModal} data={data} />
        </Modal>
      </div>
    );
  }
}

Secours.propTypes = {
  getSecours: PropTypes.func.isRequired,
  secours: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  secours: state.secours
});

export default connect(mapStateToProps, { getSecours })(Secours);
