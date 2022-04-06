import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Heart from "../Components/Common/Heart";
import LinkBox from "../Components/Common/LinkBox";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Recommendations extends Component {
  componentDidMount() {}

  state = { currentSlice: 0 };
  render() {
    const slices = [0, 1, 2];
    return (
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
              <Box sx={styles.slice}>
                <Stack direction="row" sx={{ m: 2, mb: 4 }}>
                  {this.props.items.map((item, index) => {
                    return (
                      <Box key={index} sx={styles.box}>
                        <Box sx={{ position: "absolute", right: 0 }}>
                          <Heart item={item} />
                        </Box>
                        <LinkBox to={`/View/${item.cloudProductId}`} sx={{ cursor: "pointer" }}>
                          <Box>
                            <div>{JSON.stringify()}</div>
                            <img style={styles.image} src={item.colors[0].src} alt="" />
                            <Box sx={styles.title}>{item.title}</Box>
                          </Box>
                        </LinkBox>
                      </Box>
                    );
                  })}
                </Stack>
              </Box>
            );
          })}
        </Carousel>
      </React.Fragment>
    );
  }
}

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
    width: "25%",
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
