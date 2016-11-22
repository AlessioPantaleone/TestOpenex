import React, {Component, PropTypes} from 'react'
import {reduxForm, change} from 'redux-form'
import {FormField} from '../../../../components/Field'
import {i18nRegister} from '../../../../utils/Messages'

i18nRegister({
  fr: {
    'Email address': 'Adresse email',
    'Password': 'Mot de passe',
    'Sign in': 'Se connecter'
  }
})

const validate = values => {
  const errors = {}
  const requiredFields = []
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

class ObjectiveForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        {this.props.error && <div><strong>{this.props.error}</strong><br/></div>}
        <FormField name="objective_title" fullWidth={true} type="text" label="Title"/>
        <FormField name="objective_description" fullWidth={true} type="text" label="Description"/>
        <FormField name="objective_priority" fullWidth={true} type="text" label="Priority"/>
      </form>
    )
  }
}

ObjectiveForm.propTypes = {
  error: PropTypes.string,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  change: PropTypes.func
}

export default reduxForm({form: 'ObjectiveForm', validate}, null, {change})(ObjectiveForm)