import React, { Component } from 'react';
import * as R from 'ramda';
import { LabelOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles';
import { connect } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TagForm from '../private/components/settings/tags/TagForm';
import { fetchTags, addTag } from '../actions/Tag';
import { Autocomplete } from './Autocomplete';
import inject18n from './i18n';
import { storeBrowser } from '../actions/Schema';

const styles = () => ({
  icon: {
    paddingTop: 4,
    display: 'inline-block',
  },
  text: {
    display: 'inline-block',
    flexGrow: 1,
    marginLeft: 10,
  },
  autoCompleteIndicator: {
    display: 'none',
  },
});

class TagField extends Component {
  constructor(props) {
    super(props);
    this.state = { tagCreation: false, tagInput: '' };
  }

  componentDidMount() {
    this.props.fetchTags();
  }

  handleOpenTagCreation() {
    this.setState({ tagCreation: true });
  }

  handleCloseTagCreation() {
    this.setState({ tagCreation: false });
  }

  onSubmit(data) {
    const { name, setFieldValue, values } = this.props;
    this.props.addTag(data).then((result) => {
      if (result.result) {
        const newTag = result.entities.tags[result.result];
        const tags = R.append(
          {
            id: newTag.tag_id,
            label: newTag.tag_name,
            color: newTag.tag_color,
          },
          values[name],
        );
        setFieldValue(name, tags);
        return this.handleCloseTagCreation();
      }
      return result;
    });
  }

  render() {
    const {
      t, name, tags, classes, onKeyDown, style, label, placeholder,
    } = this.props;
    const tagsOptions = R.map(
      (n) => ({
        id: n.tag_id,
        label: n.tag_name,
        color: n.tag_color,
      }),
      tags,
    );
    return (
      <div>
        <Autocomplete
          variant="standard"
          size="small"
          name={name}
          fullWidth={true}
          multiple={true}
          label={label}
          placeholder={placeholder}
          options={tagsOptions}
          style={style}
          openCreate={this.handleOpenTagCreation.bind(this)}
          onKeyDown={onKeyDown}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <div className={classes.icon} style={{ color: option.color }}>
                <LabelOutlined />
              </div>
              <div className={classes.text}>{option.label}</div>
            </Box>
          )}
          classes={{ clearIndicator: classes.autoCompleteIndicator }}
        />
        <Dialog
          open={this.state.tagCreation}
          onClose={this.handleCloseTagCreation.bind(this)}
        >
          <DialogTitle>{t('Create a new tag')}</DialogTitle>
          <DialogContent>
            <TagForm
              onSubmit={this.onSubmit.bind(this)}
              handleClose={this.handleCloseTagCreation.bind(this)}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const select = (state) => {
  const browser = storeBrowser(state);
  return {
    tags: browser.getTags(),
  };
};

export default R.compose(
  connect(select, { fetchTags, addTag }),
  inject18n,
  withStyles(styles),
)(TagField);