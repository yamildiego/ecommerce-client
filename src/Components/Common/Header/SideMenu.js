import React from "react";
import { connect } from "react-redux";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

// import Icon from "./Icon";

import * as appActions from "../../Actions/appActions";
// import * as moduleActions from "../Components/Actions/moduleActions";

const drawerWidth = 350;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(0),
      },
    }),
  },
}));

class SideMenu extends React.Component {
  // setModule = (module) => this.props.dispatch(moduleActions.setModule(module));
  toggleDrawer = () => this.props.dispatch(appActions.toggleSlideMenuOpen());

  render() {
    return (
      <Drawer variant="permanent" open={this.props.slideMenuOpen} sx={{ height: "100vh" }}>
        <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", px: [1] }}>
          <IconButton onClick={this.toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <React.Fragment>
            <ListItem
              // disabled={this.props.isLoading}
              // button
              // selected={item === this.props.module}
              onClick={() => {
                // this.setModule(item.key);
              }}
            >
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              // disabled={this.props.isLoading}
              // button
              // selected={item === this.props.module}
              onClick={() => {
                // this.setModule(item.key);
              }}
            >
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem
              // disabled={this.props.isLoading}
              // button
              // selected={item === this.props.module}
              onClick={() => {
                // this.setModule(item.key);
              }}
            >
              <ListItemText primary="Contact" />
            </ListItem>
          </React.Fragment>
        </List>
        <Divider />
      </Drawer>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    slideMenuOpen: state.appReducer.slideMenuOpen,
    isLoading: state.appReducer.isLoading,
    // module: state.moduleReducer.module,
    // modules: state.configReducer.modules,
    // permissions: state.configReducer.permissions,
  };
}

export default connect(mapStateToProps)(SideMenu);
