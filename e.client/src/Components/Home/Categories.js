import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Men from "../../Assets/Images/men.jpg";
import Women from "../../Assets/Images/women.jpg";
import Kids from "../../Assets/Images/kids.jpg";

const categories = [
  { key: 1, id: "MEN", src: Men, title: "Men" },
  { key: 2, id: "WOMEN", src: Women, title: "Women" },
  { key: 3, id: "KIDS", src: Kids, title: "Kids" },
];

class Categories extends Component {
  render() {
    return (
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", ml: 4, mr: 4 }}>
        {categories.map((category, index) => {
          return (
            <Link key={index} variant="contained" to={"/Shop/" + category.id} style={{ textDecoration: "none" }}>
              <Box sx={{ margin: 2, position: "relative", cursor: "pointer" }}>
                <img src={category.src} alt={category.title} loading="lazy" style={{ width: "100%" }} />
                <Button sx={{ position: "absolute", bottom: "8%", zIndex: 100, left: "40%" }} variant="contained">
                  {category.title}
                </Button>
              </Box>
            </Link>
          );
        })}
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(Categories);
