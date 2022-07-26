import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '../../../components/TextField';
import inject18n from '../../../components/i18n';
import { Select } from '../../../components/Select';

class MediaForm extends Component {
  validate(values) {
    const { t } = this.props;
    const errors = {};
    const requiredFields = ['media_type', 'media_name', 'media_description'];
    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = t('This field is required.');
      }
    });
    return errors;
  }

  render() {
    const { t, onSubmit, handleClose, initialValues, editing } = this.props;
    return (
      <Form
        keepDirtyOnReinitialize={true}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={this.validate.bind(this)}
        mutators={{
          setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value);
          },
        }}
      >
        {({ handleSubmit, submitting, pristine }) => (
          <form id="mediaForm" onSubmit={handleSubmit}>
            <Select
              variant="standard"
              label={t('Type')}
              name="media_type"
              fullWidth={true}
            >
              <MenuItem key="newspaper" value="newspaper">
                {t('newspaper')}
              </MenuItem>
              <MenuItem key="microblogging" value="microblogging">
                {t('microblogging')}
              </MenuItem>
              <MenuItem key="tv" value="tv">
                {t('tv')}
              </MenuItem>
            </Select>
            <TextField
              variant="standard"
              name="media_name"
              fullWidth={true}
              label={t('Name')}
              style={{ marginTop: 20 }}
            />
            <TextField
              variant="standard"
              name="media_description"
              fullWidth={true}
              label={t('Subtitle')}
              style={{ marginTop: 20 }}
            />
            <div style={{ float: 'right', marginTop: 20 }}>
              <Button
                onClick={handleClose.bind(this)}
                style={{ marginRight: 10 }}
                disabled={submitting}
              >
                {t('Cancel')}
              </Button>
              <Button
                color="secondary"
                type="submit"
                disabled={pristine || submitting}
              >
                {editing ? t('Update') : t('Create')}
              </Button>
            </div>
          </form>
        )}
      </Form>
    );
  }
}

MediaForm.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  editing: PropTypes.bool,
};

export default inject18n(MediaForm);
