/*React */
import React, { useState } from 'react';
/*Component */
import { Sidebar } from '../sidebar';
import { ProfileMenu } from '../navbar';
/*Material UI */
import { makeStyles, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LanguageSelector from './language-selector';
import { useAuth } from '../../../context/AuthContext';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1)
  },
  accountMenu: {
    marginRight: theme.spacing(1)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    marginLeft: theme.spacing(3)
  },
  titleSidebar: {
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 10
  },
  toolbar: {
    backgroundColor: theme.palette.primary.dark
  }
}));

const Navbar = ({ children }) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { userToken } = useAuth();

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = param => {
    setAnchorEl(param);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleDrawerClose = param => {
    setOpenDrawer(param);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          {userToken && (
            <IconButton
              data-testid="drawer"
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography className={classes.title} variant="h6" noWrap>
            MascotApp
          </Typography>
          <div className={classes.grow} />
          <LanguageSelector />
          {userToken && (
            <div>
              <IconButton
                data-testid="icon-profile"
                className={classes.accountMenu}
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <ProfileMenu handleProfileMenuClose={handleProfileMenuClose} anchorEl={anchorEl} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      {children}
      {userToken && <Sidebar handleDrawerClose={handleDrawerClose} openDrawer={openDrawer} />}
    </div>
  );
};

export default Navbar;
