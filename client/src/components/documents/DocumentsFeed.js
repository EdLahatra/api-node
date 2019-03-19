import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentsItem from './DocumentsItem';

class DocumentsFeed extends Component {
  render() {
    const { documents } = this.props;
    if (!documents){
      return <div />
    }
    return documents.map(item => <DocumentsItem
      key={item._id}
      documents={item}
      onUpdate={() => this.props.onUpdate(item)}
      />);
  }
}


DocumentsFeed.propTypes = {
  documents: PropTypes.array.isRequired
};

export default DocumentsFeed;
