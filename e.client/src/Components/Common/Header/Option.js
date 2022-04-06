import React, { Component } from "react";
import { connect } from "react-redux";
import { MobileView, isMobile } from "react-device-detect";

import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";

class Option extends Component {
  render() {
    return (
      <React.Fragment>
        {("link" in this.props || (!("link" in this.props) && isMobile)) && (
          <Box
            sx={{
              flexDirection: "column",
              width: `${this.props.width <= 1024 ? 50 : 90}px`,
              cursor: "pointer",
              pt: this.props.width <= 1024 ? 2 : 0,
            }}
          >
            {"link" in this.props && (
              <Link to={this.props.link} style={{ textDecoration: "none" }}>
                <Box sx={{ textAlign: "center", height: "30px", color: "#f55e3f" }}>
                  {((this.props.id === 3 && this.props.qty !== 0) || (this.props.id === 2 && this.props.qtyWishlist !== 0)) && (
                    <Badge badgeContent={this.props.id === 3 ? this.props.qty : this.props.qtyWishlist} color="primary">
                      {this.props.icon}
                    </Badge>
                  )}
                  {(this.props.id !== 3 || this.props.qty === 0) &&
                    (this.props.id !== 2 || this.props.qtyWishlist === 0) &&
                    this.props.icon}
                </Box>
                {this.props.width > 1024 && <Box sx={{ textAlign: "center", fontSize: "12px", color: "#222" }}>{this.props.title}</Box>}
              </Link>
            )}
            <MobileView>
              {!("link" in this.props) && (
                <Box onClick={this.props.toggleSearch}>
                  <Box sx={{ textAlign: "center", height: "30px", color: "#f55e3f" }}>
                    {this.props.id === 3 && this.props.qty !== 0 && (
                      <Badge badgeContent={this.props.qty} color="primary">
                        {this.props.icon}
                      </Badge>
                    )}
                    {(this.props.id !== 3 || this.props.qty === 0) && this.props.icon}
                  </Box>
                  {this.props.width > 1024 && <Box sx={{ textAlign: "center", fontSize: "12px", color: "#222" }}>{this.props.title}</Box>}
                </Box>
              )}
            </MobileView>
          </Box>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    width: state.configReducer.dimensions.width,
    qty: state.bagReducer.qty,
    qtyWishlist: state.wishlistReducer.items.length,
  };
}

export default connect(mapStateToProps)(Option);
