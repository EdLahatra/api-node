import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { addSante, updateSante } from '../../actions/SanteActions';
import attribut from '../../attributs';

class SanteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {},
      sanguinList: this.props.data.sanguinList || [],
      allergieList: this.props.data.allergieList || [],
      poids: this.props.data.poids || '',
      problemeSantePasse: this.props.data.problemeSantePasse || '',
      problemeSanteEncours: this.props.data.problemeSanteEncours || '',
      naissance: this.props.data.naissance || '',
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

    const { user } = this.props.auth;
    const {
      sanguin,
      poids,
      allergie,
      problemeSantePasse,
      problemeSanteEncours,
      naissance,
    } = this.state;
    const newSante = {
      sanguin,
      poids,
      allergie,
      problemeSantePasse,
      problemeSanteEncours,
      naissance,
    };
    if(this.props.data._id) {
      newSante.id = this.props.data._id
      this.props.updateSante(newSante);
    } else {
      this.props.addSante(newSante);
    }

    // this.props.addSante(newSante);
    this.setState({
      sanguinList: [],
      allergieList: [],
      poids: '',
      problemeSantePasse: '',
      problemeSanteEncours: '',
      naissance: '',
    });
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

  render() {
    const { errors } = this.state;

    return (
      <div className="Sante-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                {
                  attribut.sante.map(key => {
                    if (key === 'user') return;
                    if (key === 'naissance') return(
                      <TextFieldGroup
                        name="naissance"
                        type="date"
                        value={this.state.naissance}
                        onChange={this.onChange}
                        error={errors.naissance}
                      />
                      );
                    if (key === 'sanguin') return(
                      <div key={`${key}`}><p>Groupe Sanguin</p>
                    {
                      this.props.sanguin.map((item, i) => {
                        return (
                          <div key={i}>
                            {item.name}
                            <input type="checkbox"
                              checked={this.isChecked(item, 'sanguin')}
                              onChange={() => this.toggleChange(item, 'sanguin')}
                            />
                          </div>
                        )
                      })
                    }
                    </div>
                    );

                    if (key === 'allergie') return(
                      <div key={`${key}`}><p>allergie</p>
                    {
                      this.props.allergie.map((item, i) => {
                        return (
                          <div key={i}>
                            {item.name}
                            <input type="checkbox"
                              checked={this.isChecked(item, 'allergie')}
                              onChange={() => this.toggleChange(item, 'allergie')}
                            />
                          </div>
                        )
                      })
                    }
                    </div>
                    );

                    return <TextFieldGroup
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

SanteForm.propTypes = {
  updateSante: PropTypes.func.isRequired,
  addSante: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addSante, updateSante })(SanteForm);
