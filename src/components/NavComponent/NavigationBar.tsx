import { useState } from 'react';
//import '../CSS/Misc.css';
import { useHistory, NavLink } from 'react-router-dom';

import { SideBarLoggedInList, SideBarNonLoggedInList, SideBarLogin, SideBarLogout, SideBarAdminTools } from './SideBarList';


import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tab from '@material-ui/core/Tab';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import 'fontsource-roboto';


const drawerWidth = 240;

//MaterialUI Styling
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      overflowX: 'hidden',
      maxWidth:'100%',
      backgroundColor: '#282c34'
    },
    mainName: {
      fontWeight: 600,
      fontSize: '1.1rem'
    },
    listItemText: {
      fontWeight: 'bold',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: 15,
    },
    hide: {
      display: 'none',
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

interface Props {
  handleLogout: any,
  logged: boolean,
  setLogged: any,
  isAdmin: boolean
}


const MainNavBar : React.FC<Props> = ({logged, handleLogout, setLogged, isAdmin}) => {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerClick = () => {
    setOpen(!open);
  };
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();


  const history = useHistory()


    return (
      <>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerClick}
              edge="start"
              className={clsx(classes.menuButton
              )}>
              <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap >
                <Tab label='jonathanohlson' className={classes.mainName} component={NavLink}  to='/'/>
              </Typography>
          </Toolbar>
        </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            open={open}
            classes={{
            paper: classes.drawerPaper,
            }}>
            <Toolbar />
            <div className={classes.drawerContainer}>
            <List>
                {logged ? 
                  <ListItem button key={SideBarLogout.text} onClick={(e) => handleLogout(e, history, setLogged)}>
                    <ListItemIcon>{SideBarLogout.icon}</ListItemIcon>
                    <ListItemText classes={{primary: classes.listItemText}} primary={SideBarLogout.text} />
                  </ListItem>
                :
                  <ListItem button key={SideBarLogin.text} component={NavLink} to={SideBarLogin.path}>
                    <ListItemIcon>{SideBarLogin.icon}</ListItemIcon>
                    <ListItemText classes={{primary: classes.listItemText}} primary={SideBarLogin.text} />
                </ListItem>
                }
              </List>
              <Divider />
              <List>
                {SideBarNonLoggedInList.map((item) => (
                  <ListItem button key={item.text} component={NavLink} to="/Hasse">
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
              {logged ? SideBarLoggedInList.map((item)  => (
                <ListItem button key={item.text} component={NavLink} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText classes={{primary: classes.listItemText}} primary={item.text} />
                </ListItem>
              ))
                 : ""}
              </List>
              <Divider />
              <List>
              {logged && isAdmin ? SideBarAdminTools.map((item)  => (
                <ListItem button key={item.text} component={NavLink} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText classes={{primary: classes.listItemText}} primary={item.text} />
                </ListItem>
              ))
                 : ""}
              </List>
            </div>
          </Drawer>
          <main className={classes.content}>
          </main>
        </div>
      </>
    );
  }
  
  export default MainNavBar;