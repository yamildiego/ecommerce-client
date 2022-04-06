import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

import LinkBox from "../Common/LinkBox";

import * as wishlistActions from "../../Actions/wishlistActions";

class ItemWishlist extends Component {
  handleOnClickRemove = (item) => this.props.dispatch(wishlistActions.removeItem(item.cloudProductId));

  render() {
    const { item, size } = this.props;
    return (
      <Box sx={styles.container}>
        {item && (
          <React.Fragment>
            <Box sx={{ border: "1px solid #0000001f", borderRadius: "1px", position: "relative" }}>
              <div style={styles.close} onClick={this.handleOnClickRemove}>
                <IconButton onClick={() => this.handleOnClickRemove(item)} color="primary" component="span">
                  <FavoriteIcon />
                </IconButton>
              </div>

              <LinkBox to={`/View/${item.cloudProductId}`} sx={{ cursor: "pointer" }}>
                <Stack direction={size === "S" ? "column" : "row"}>
                  <Box sx={{ maxWidth: "200px", margin: "auto" }}>
                    <img src={item.colors[0].src} alt="" style={{ width: "100%", height: "100%" }} />
                  </Box>
                  <Box sx={{ p: 2, flex: 1, position: "relative" }}>
                    <Box>
                      <h2 style={styles.title}>{item.title}</h2>
                      <h4 style={styles.subtitle}>{item.subtitle}</h4>
                      <Box sx={styles.line}>
                        Colors:
                        {item.colorways.map((color, i) => {
                          return <Box sx={{ fontSize: "14px", lineHeight: "12px", pl: "50px" }}>{color.colorDescription}</Box>;
                        })}
                      </Box>
                      <Box sx={styles.line}>
                        Sizes:
                        <Box sx={{ pl: "10px", display: "inline-block" }}>
                          {item.skuData.map((size, i) => {
                            return (
                              <Box sx={{ fontSize: "14px", lineHeight: "12px", display: "inline-block" }}>
                                <Box sx={{ display: "inline-block", pr: "4px" }}>{size.size}</Box>
                                {item.skuData.length - 1 !== i && <Box sx={{ display: "inline-block", pr: "2px", pl: "2px" }}>|</Box>}
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </LinkBox>
            </Box>
          </React.Fragment>
        )}
      </Box>
    );
  }
}

const styles = {
  container: {
    mb: 1,
    m: 1,
    width: "100%",
    userSelect: "none",
    position: "relative",
  },
  title: {
    margin: 0,
    fontSize: "18px",
  },
  subtitle: {
    margin: 0,
    fontWeight: "normal",
    fontSize: "12px",
  },
  line: {
    lineHeight: "38px",
  },
  textQty: {
    userSelect: "none",
    cursor: "default",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
  },
  qty: {
    width: "65px",
    border: 0,
    padding: 0,
    margin: 0,
    ml: 2,
  },
  close: {
    cursor: "pointer",
    position: "absolute",
    right: "4px",
    bottom: "4px",
    fontWeight: "bold",
    zIndex: 3000,
  },
};

function mapStateToProps(state, props) {
  return {
    items: state.bagReducer.items,
    size: state.configReducer.dimensions.size,
  };
}

export default connect(mapStateToProps)(ItemWishlist);
