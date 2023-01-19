import React, { Component } from "react";
import { connect } from "react-redux";
import { isMobile, isBrowser } from "react-device-detect";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";

import * as appActions from "../../Actions/appActions";
import * as ecommerceActions from "../../Actions/ecommerceActions";

import TitleFilter from "./TitleFilter";

class OptionsBar extends Component {
  state = { expanded: false };
  componentDidMount() {
    if (this.props.size === "S" || this.props.size === "M") this.props.dispatch(appActions.toggleFilter(false));
  }

  toggleFilter = () => {
    this.props.dispatch(appActions.toggleFilter());
    this.setState({ expanded: false });
  };

  setSort = (sort) => {
    if (sort === this.props.sort) this.props.dispatch(ecommerceActions.setSort(null));
    else this.props.dispatch(ecommerceActions.setSort(sort));
    this.setState({ expanded: false });
  };

  resetFilter = () => {
    this.props.dispatch(ecommerceActions.resetFilter());
  };

  render() {
    const { sortsStructures, sort, size } = this.props;
    const fontWeightSort = sort !== null ? 500 : 100;
    const fontWeightShow = !this.props.filterOpen ? 500 : 100;
    return (
      <Stack direction="row" spacing={1} sx={{ justifyContent: "end", position: "relative" }}>
        <Box sx={{ flex: 1, pl: 2, m: "10px", display: "flex", flexDirection: "row" }}>
          <h2 style={{ margin: 0, cursor: "default", userSelect: "none" }}>
            Filters
            {this.props.showReset && (
              <Link sx={{ textDecoration: "none", cursor: "pointer" }} onClick={this.resetFilter}>
                <span style={{ fontSize: "12px", fontweight: "normal", marginLeft: "5px" }}>(Clean filter)</span>
              </Link>
            )}
          </h2>
          {isBrowser && this.props.size !== "S" && <TitleFilter />}
        </Box>
        <Button
          sx={{ width: isMobile ? "auto" : "242px", fontWeight: fontWeightSort, ml: 0 }}
          variant="inherit"
          endIcon={<KeyboardArrowDownIcon />}
          onClick={() => this.setState({ expanded: !this.state.expanded })}
        >
          {(size === "M" || size === "L") && (
            <React.Fragment>Sort {sort !== null ? `By ${sortsStructures[sort].name}` : ""}</React.Fragment>
          )}
        </Button>
        <Collapse in={this.state.expanded} timeout="auto">
          <Box
            sx={{
              width: "100%",
              maxWidth: 150,
              bgcolor: "background.paper",
              position: "absolute",
              zIndex: 2000,
              top: "50px",
              right: isMobile ? 20 : 180,
            }}
          >
            <List>
              {sortsStructures.map((item, i) => {
                return (
                  <ListItem key={i} disablePadding sx={sort === i ? { backgroundColor: "#ddd" } : {}}>
                    <ListItemButton onClick={() => this.setSort(i)}>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Collapse>
        <Button
          sx={{ fontWeight: fontWeightShow }}
          onClick={this.toggleFilter}
          variant="inherit"
          endIcon={this.props.filterOpen ? <TuneIcon sx={{ mr: 1 }} /> : <TuneIcon sx={{ mr: 1, transform: "scaleX(-1)" }} />}
        >
          {(size === "M" || size === "L") && (
            <React.Fragment>
              <Box style={{ width: "45px", fontFamily: "Roboto", fontWeight: fontWeightShow }}>
                {this.props.filterOpen ? "Hide" : "Show"}
              </Box>
              filter
            </React.Fragment>
          )}
        </Button>
      </Stack>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    filterOpen: state.appReducer.filterOpen,
    sort: state.ecommerceReducer.sort,
    sortsStructures: state.ecommerceReducer.sortsStructures,
    showReset: state.ecommerceReducer.showReset,
    size: state.configReducer.dimensions.size,
  };
}

export default connect(mapStateToProps)(OptionsBar);
