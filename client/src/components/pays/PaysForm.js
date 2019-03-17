import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { addPays } from '../../actions/PaysActions';
import attribut from '../../attributs';

const initilState = {
  name: '',
  capital: '',
  indicatifPhone: '',
  decalageHoraore: '',
  monnaie: '',
  permis: '',
  maladie: '',
  maladieList: [],
};

class PaysForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initilState,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newPays = {
      name: this.state.name,
      capital: this.state.capital,
      indicatifPhone: this.state.indicatifPhone,
      decalageHoraore: this.state.decalageHoraore,
      monnaie: this.state.monnaie,
      permis: this.state.permis,
      maladie: this.state.maladieList,
    };
    this.props.addPays(newPays);
    this.setState(initilState);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isChecked = item => this.state.maladieList.filter(key => key._id === item._id).length > 0

  toggleChange = item => {
    let maladieList = [];
    if (this.isChecked(item)){
      maladieList = this.state.maladieList.filter(key => key._id !== item._id)
    } else {
      maladieList = [...this.state.maladieList, item]
    }
    this.setState({ maladieList });
  }

  render() {
    const { errors } = this.state;
  
    return (
      <div className="Pays-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
              {
                attribut.pays.map((key, i) => {
                  if (key === 'maladie') {
                    return <div key={`${key} maladie`}><p>Maladie</p>
                    {
                      this.props.maladie.map((item, key) => {
                        return (
                          <div key={key}>
                            {item.name}
                            <input type="checkbox"
                              checked={this.isChecked(item)}
                              onChange={() => this.toggleChange(item)}
                            />
                          </div>
                        )
                      })
                    }
                    </div>
                  }
                  return <TextFieldGroup
                  key={`${i} ${key}`}
                  placeholder={key}
                  name={key}
                  value={this.state[key]}
                  onChange={this.onChange}
                  error={errors[key]}
                />
                })
              }
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PaysForm.propTypes = {
  addPays: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPays })(PaysForm);
