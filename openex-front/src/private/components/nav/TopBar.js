import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import * as R from 'ramda';
import withStyles from '@mui/styles/withStyles';
import { connect } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link, withRouter } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { AccountCircleOutlined } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logout } from '../../../actions/Application';
import logo from '../../../resources/images/logo_openex_horizontal_small.png';
import inject18n from '../../../components/i18n';

const styles = (theme) => ({
  appBar: {
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
    background: 0,
    backgroundColor: theme.palette.background.nav,
    paddingTop: theme.spacing(0.2),
  },
  flex: {
    flexGrow: 1,
  },
  logoContainer: {
    marginLeft: -10,
  },
  logo: {
    cursor: 'pointer',
    height: 35,
  },
  menuContainer: {
    float: 'left',
    marginLeft: 30,
  },
  barRight: {
    position: 'absolute',
    top: 15,
    right: 15,
    verticalAlign: 'middle',
    height: '100%',
  },
  divider: {
    display: 'table-cell',
    float: 'left',
    height: '100%',
    margin: '0 5px 0 5px',
  },
  searchContainer: {
    display: 'table-cell',
    float: 'left',
    marginRight: 5,
    paddingTop: 9,
  },
});

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, anchorEl: null };
  }

  handleOpen(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ open: false, anchorEl: null });
  }

  handleLogout() {
    this.handleClose();
    this.props.logout();
  }

  render() {
    const { classes, t } = this.props;
    return (
      <AppBar
        position="fixed"
        className={classes.appBar}
        variant="elevation"
        elevation={1}
      >
        <Toolbar>
          <div className={classes.logoContainer}>
            <Link to="/private">
              <img src={`/${logo}`} alt="logo" className={classes.logo} />
            </Link>
          </div>
          <div className={classes.barRight}>
            <IconButton onClick={this.handleOpen.bind(this)} size="small">
              <AccountCircleOutlined />
            </IconButton>
            <Menu
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onClose={this.handleClose.bind(this)}
            >
              <MenuItem
                onClick={this.handleClose.bind(this)}
                component={Link}
                to="/private/profile"
              >
                {t('Profile')}
              </MenuItem>
              <MenuItem onClick={this.handleLogout.bind(this)}>
                {t('Logout')}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object,
  logout: PropTypes.func,
  location: PropTypes.object,
};

export default R.compose(
  connect(null, { logout }),
  inject18n,
  withRouter,
  withStyles(styles),
)(TopBar);
