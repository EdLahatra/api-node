import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import CentreForm from './CentreForm';
import CentreFeed from './CentreFeed';
import Spinner from '../common/Spinner';
import { getCentres } from '../../actions/CentreActions';

class Centres extends Component {
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
    this.props.getCentres();
  }


  render() {
    const { centre, loading } = this.props.centre;
    const { open, data } = this.state;
    let centreContent;
    if (centre === null || loading) {
      centreContent = <Spinner />;
    } else {
      centreContent = <CentreFeed centre={centre} onUpdate={this.onUpdate} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
                <button onClick={this.onOpenModal} type="submit" className="btn btn-dark">
                  Ajout
                </button>
              {centreContent}
            </div>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <CentreForm onClose={this.onCloseModal} data={data} />
        </Modal>
      </div>
    );
  }
}

Centres.propTypes = {
  getCentres: PropTypes.func.isRequired,
  centre: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  centre: state.centre
});

export default connect(mapStateToProps, { getCentres })(Centres);
