import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
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
  centreList: [],
  medecinList: [],
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
      centre: this.state.centreList,
      medecin: this.state.medecinList,
    };
    this.props.addPays(newPays);
    this.setState(initilState);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isChecked = (item, k) => this.state[`${k}List`].filter(key => key._id === item._id).length > 0

  toggleChange = (item, k) => {
    let list = [];
    if (this.isChecked(item, k)){
      list = this.state[`${k}List`].filter(key => key._id !== item._id)
    } else {
      list = [...this.state[`${k}List`], item]
    }
    this.setState({ [`${k}List`]: list });
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    const { errors, medecinList, maladieList } = this.state;
    console.log(this.props.centre, this.props.medecin, this.props.maladie);
    return (
      <div className="Pays-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
              {
                attribut.pays && attribut.pays.map((key, i) => {
                  if (key === 'maladie') {
                    return <div key={`${key} maladie`}><p>Maladie</p>
                <Select
                  name="maladie"
                  value={maladieList}
                  onChange={maladieList => this.setState({ maladieList })}
                  options={this.props.maladie}
                  isMulti
                />
                    {
                      this.props.maladie.map((item, key) => {
                        return (
                          <div key={key}>
                            {item.name}
                            {/* <input type="checkbox"
                              checked={this.isChecked(item, key)}
                              onChange={() => this.toggleChange(item, key)}
                            /> */}
                          </div>
                        )
                      })
                    }
                    </div>
                  }
                  if (key === 'medecin') {
                    return <div key={`${key} medecin`}><p>Medecin</p>
                    {
                      this.props.medecin && this.props.medecin.map((item, key) => {
                        return (
                          <div key={key}>
                            {item.name}
                            {/* <input type="checkbox"
                              checked={this.isChecked(item, key)}
                              onChange={() => this.toggleChange(item, key)}
                            /> */}
                          </div>
                        )
                      })
                    }
                    </div>
                  }
                  if (key === 'centre') {
                    return <div key={`${key} centre`}><p>Centre de Vaccination</p>
                    {
                      this.props.centre && this.props.centre.map((item, key) => {
                        return (
                          <div key={key}>
                            {item.name}
                            {/* <input type="checkbox"
                              checked={this.isChecked(item, key)}
                              onChange={() => this.toggleChange(item, key)}
                            /> */}
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
