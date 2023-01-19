import React, { Component } from "react";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Heart from "../../Components/Common/Heart";
import LinkBox from "../../Components/Common/LinkBox";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Recommendations extends Component {
  componentDidMount() {}

  state = { currentSlice: 0 };
  render() {
    const slices = isMobile ? [0, 1, 2, 3, 4, 5] : [0, 1, 2];

    return (
      <React.Fragment>
        {this.props.items.length > 0 && (
          <React.Fragment>
            <Typography variant="h4" sx={{ color: "primary.main", mb: 0 }} gutterBottom component="div">
              You might also like
            </Typography>
            <Carousel
              style={{
                width: "100%",
              }}
              thumbWidth={38}
              infiniteLoop={true}
              renderThumbs={() => {}}
              showStatus={false}
              selectedItem={this.state.currentSlice}
            >
              {slices.map((slice, i) => {
                return (
                  <Box key={i} sx={styles.slice}>
                    <Stack direction="row" sx={{ m: 2, mb: 4 }}>
                      <RowRecomendations row={i} items={this.props.items} />
                    </Stack>
                  </Box>
                );
              })}
            </Carousel>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const RowRecomendations = (props) => {
  const rows = isMobile
    ? [2 * props.row + 0, 2 * props.row + 1]
    : [3 * props.row + 0, 3 * props.row + 1, 3 * props.row + 2, 3 * props.row + 3];
  return (
    <React.Fragment>
      {rows.map((row, index) => {
        const item = props.items[row];
        return (
          <Box key={index} sx={{ ...styles.box, width: isMobile ? "50%" : "25%" }}>
            <Box sx={{ position: "absolute", right: 0 }}>
              <Heart item={item} />
            </Box>
            <LinkBox to={`/View/${item.cloudProductId}`} sx={{ cursor: "pointer" }}>
              <Box>
                <div>{JSON.stringify()}</div>
                <img style={styles.image} src={item.colorways[0].images.squarishURL} alt="" />
                <Box sx={styles.title}>{item.title}</Box>
              </Box>
            </LinkBox>
          </Box>
        );
      })}
    </React.Fragment>
  );
};

const styles = {
  slice: {
    width: "100%",
    // backgroundColor: "red",
  },
  title: {
    fontSize: "14px",
  },
  box: {
    margin: "10px",
    position: "relative",
  },
  image: {
    width: "100%",
  },
};

function mapStateToProps(state, props) {
  return {
    items: state.viewProductReducer.recomendations,
  };
}

export default connect(mapStateToProps)(Recommendations);
