import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import DocumentsForm from './DocumentsForm';
import DocumentsFeed from './DocumentsFeed';
import Spinner from '../common/Spinner';
import { getDocuments } from '../../actions/DocumentsActions';

class Documents extends Component {
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
    this.props.getDocuments();
  }

  render() {
    const { documents, loading } = this.props.documents;
    const { open, data } = this.state;
    let DocumentsContent;

    if (documents === null || loading) {
      DocumentsContent = <Spinner />;
    } else {
      DocumentsContent = <DocumentsFeed documents={documents} onUpdate={this.onUpdate} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
                <button onClick={this.onOpenModal} type="submit" className="btn btn-dark">
                  Ajout
                </button>
              {DocumentsContent}
            </div>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <DocumentsForm onClose={this.onCloseModal} data={data} />
        </Modal>
      </div>
    );
  }
}

Documents.propTypes = {
  getDocuments: PropTypes.func.isRequired,
  documents: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  documents: state.documents
});

export default connect(mapStateToProps, { getDocuments })(Documents);
