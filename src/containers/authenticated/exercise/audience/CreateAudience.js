import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {i18nRegister} from '../../../../utils/Messages'
import * as Constants from '../../../../constants/ComponentTypes'
import {addAudience, selectAudience} from '../../../../actions/Audience'
import {Dialog} from '../../../../components/Dialog';
import {FlatButton} from '../../../../components/Button';
import AudienceForm from './AudienceForm'
import {ActionButtonCreate} from '../../../../components/Button'
import {AppBar} from '../../../../components/AppBar'

i18nRegister({
  fr: {
    'Audiences': 'Audiences',
    'Create a new audience': 'Créer une nouvelle audience'
  }
})

class CreateAudience extends Component {
  constructor(props) {
    super(props);
    this.state = {openCreate: false}
  }

  handleOpenCreate() {
    this.setState({openCreate: true})
  }

  handleCloseCreate() {
    this.setState({openCreate: false})
  }

  onSubmitCreate(data) {
    return this.props.addAudience(this.props.exerciseId, data)
      .then((payload) => { //If add audience success, select it directly
        this.props.selectAudience(this.props.exerciseId, payload.result)
      })
  }

  submitFormCreate() {
    this.refs.audienceForm.submit()
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={this.handleCloseCreate.bind(this)}/>,
      <FlatButton label="Create" primary={true} onTouchTap={this.submitFormCreate.bind(this)}/>,
    ]

    return (
      <div>
        <AppBar title="Audiences" showMenuIconButton={false}
          iconElementRight={<ActionButtonCreate type={Constants.BUTTON_TYPE_CREATE_RIGHT}
                                                onClick={this.handleOpenCreate.bind(this)} />}/>
        <Dialog title="Create a new audience" modal={false}
          open={this.state.openCreate}
          onRequestClose={this.handleCloseCreate.bind(this)}
          actions={actions}>
          <AudienceForm ref="audienceForm" onSubmit={this.onSubmitCreate.bind(this)}
                        onSubmitSuccess={this.handleCloseCreate.bind(this)} />
        </Dialog>
      </div>
    );
  }
}

CreateAudience.propTypes = {
  exerciseId: PropTypes.string,
  addAudience: PropTypes.func,
  selectAudience: PropTypes.func
}

export default connect(null, {addAudience, selectAudience})(CreateAudience);