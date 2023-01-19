import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Men from "../../Assets/Images/men.jpg";
import Women from "../../Assets/Images/women.jpg";
import Kids from "../../Assets/Images/kids.jpg";

import LinkBox from "../Common/LinkBox";

import * as ecommerceActions from "../../Actions/ecommerceActions";

const categories = [
  { key: 1, id: "MEN", src: Men, title: "Men" },
  { key: 2, id: "WOMEN", src: Women, title: "Women" },
  { key: 3, id: "KIDS", src: Kids, title: "Kids" },
];

class Categories extends Component {
  handleOnClick = (category) => {
    let filter = {};
    if (category === "MEN" || category === "WOMEN") filter.gender = [category];
    if (category === "KIDS") filter.kids = ["BOYS", "GIRLS"];
    this.props.dispatch(ecommerceActions.resetFilter(filter, "FILTER"));
  };

  render() {
    return (
      <Box sx={{ ...styles.container, flexDirection: this.props.size === "S" ? "column" : "row" }}>
        {categories.map((category, index) => {
          return (
            <LinkBox key={index} onClick={() => this.handleOnClick(category.id)} to={"/Shop"} variant="contained" style={styles.link}>
              <Box sx={styles.containerImage}>
                <img src={category.src} alt={category.title} loading="lazy" style={styles.image} />
                <Button sx={styles.btn} variant="contained">
                  {category.title}
                </Button>
              </Box>
            </LinkBox>
          );
        })}
      </Box>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    ml: 4,
    mr: 4,
  },
  link: {
    textDecoration: "none",
  },
  containerImage: {
    margin: 2,
    position: "relative",
    cursor: "pointer",
  },
  image: {
    width: "100%",
  },
  btn: {
    position: "absolute",
    bottom: "8%",
    zIndex: 100,
    left: "50%",
    transform: "translateX(-50%)",
  },
};

function mapStateToProps(state, props) {
  return {
    size: state.configReducer.dimensions.size,
  };
}

export default connect(mapStateToProps)(Categories);
