import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as R from 'ramda';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { MoreVert } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { updatePlayer, deletePlayer } from '../../../actions/User';
import PlayerForm from './PlayerForm';
import inject18n from '../../../components/i18n';
import { storeBrowser } from '../../../actions/Schema';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
Transition.displayName = 'TransitionSlide';

class PlayerPopover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDelete: false,
      openEdit: false,
      openPopover: false,
    };
  }

  handlePopoverOpen(event) {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  }

  handlePopoverClose() {
    this.setState({ anchorEl: null });
  }

  handleOpenEdit() {
    this.setState({ openEdit: true });
    this.handlePopoverClose();
  }

  handleCloseEdit() {
    this.setState({ openEdit: false });
  }

  onSubmitEdit(data) {
    const inputValues = R.pipe(
      R.assoc(
        'user_organization',
        data.user_organization && data.user_organization.id
          ? data.user_organization.id
          : data.user_organization,
      ),
      R.assoc('user_tags', R.pluck('id', data.user_tags)),
    )(data);
    return this.props
      .updatePlayer(this.props.user.user_id, inputValues)
      .then(() => this.handleCloseEdit());
  }

  handleOpenDelete() {
    this.setState({ openDelete: true });
    this.handlePopoverClose();
  }

  handleCloseDelete() {
    this.setState({ openDelete: false });
  }

  submitDelete() {
    this.props.deletePlayer(this.props.user.user_id);
    this.handleCloseDelete();
  }

  render() {
    const {
      t, userAdmin, user, organizations,
    } = this.props;
    const userOrganizationValue = user.getOrganization();
    const userOrganization = userOrganizationValue
      ? {
        id: userOrganizationValue.organization_id,
        label: userOrganizationValue.organization_name,
      }
      : null;
    const userTags = user.getTags().map((tag) => ({
      id: tag.tag_id,
      label: tag.tag_name,
      color: tag.tag_color,
    }));
    const initialValues = R.pipe(
      R.assoc('user_organization', userOrganization),
      R.assoc('user_tags', userTags.asMutable()),
      R.pick([
        'user_firstname',
        'user_lastname',
        'user_email',
        'user_organization',
        'user_phone',
        'user_phone2',
        'user_pgp_key',
        'user_tags',
      ]),
    )(user);
    return (
      <div>
        <IconButton
          onClick={this.handlePopoverOpen.bind(this)}
          aria-haspopup="true"
          size="large"
        >
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handlePopoverClose.bind(this)}
        >
          <MenuItem onClick={this.handleOpenEdit.bind(this)}>
            {t('Update')}
          </MenuItem>
          {userAdmin && (
            <MenuItem onClick={this.handleOpenDelete.bind(this)}>
              {t('Delete')}
            </MenuItem>
          )}
        </Menu>
        <Dialog
          open={this.state.openDelete}
          TransitionComponent={Transition}
          onClose={this.handleCloseDelete.bind(this)}
        >
          <DialogContent>
            <DialogContentText>
              {t('Do you want to delete this player?')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleCloseDelete.bind(this)}
            >
              {t('Cancel')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.submitDelete.bind(this)}
            >
              {t('Delete')}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          TransitionComponent={Transition}
          open={this.state.openEdit}
          onClose={this.handleCloseEdit.bind(this)}
          fullWidth={true}
          maxWidth="md"
        >
          <DialogTitle>{t('Update the player')}</DialogTitle>
          <DialogContent>
            <PlayerForm
              initialValues={initialValues}
              editing={true}
              organizations={organizations}
              onSubmit={this.onSubmitEdit.bind(this)}
              handleClose={this.handleCloseEdit.bind(this)}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

PlayerPopover.propTypes = {
  t: PropTypes.func,
  user: PropTypes.object,
  updatePlayer: PropTypes.func,
  deletePlayer: PropTypes.func,
  tags: PropTypes.object,
  userAdmin: PropTypes.bool,
};

const select = (state) => {
  const browser = storeBrowser(state);
  return {
    userAdmin: browser.getMe().isAdmin(),
  };
};

export default R.compose(
  connect(select, { updatePlayer, deletePlayer }),
  inject18n,
)(PlayerPopover);