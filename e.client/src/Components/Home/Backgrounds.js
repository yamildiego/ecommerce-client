import React, { Component } from "react";
import { connect } from "react-redux";

import Box from "@mui/material/Box";

import CircleShop from "./CircleShop";

import Background_0 from "../../Assets/Images/christopher-campbell-kFCdfLbu6zA-unsplash.jpg";
import Background_1 from "../../Assets/Images/victor-freitas-hOuJYX2K5DA-unsplash.jpg";
import Background_2 from "../../Assets/Images/fachry-zella-devandra-Yta-zdP9PVM-unsplash.jpg";
import Background_3 from "../../Assets/Images/bruce-mars-oLStrTTMz2s-unsplash.jpg";

const backgrounds = [
  { backgroundImage: Background_0, styleBall: { right: "22%", bottom: "28%" } },
  { backgroundImage: Background_1, styleBall: { right: "30%", bottom: "6%" } },
  { backgroundImage: Background_2, styleBall: { right: "16%", bottom: "10%" } },
  { backgroundImage: Background_3, styleBall: { right: "16%", bottom: "10%" } },
];

class Backgrounds extends Component {
  state = { randomBackground: Math.floor(Math.random() * 4) };

  componentDidMount() {
    this.reloadBackgrounds();
  }

  reloadBackgrounds = () => {
    let randomBackground = Math.floor(Math.random() * 4);
    if (randomBackground !== this.state.randomBackground)
      setTimeout(() => {
        this.setState({ randomBackground });
      }, 15000);
    else this.reloadBackgrounds();
  };

  render() {
    return (
      <Box
        sx={{
          backgroundImage: `url(${backgrounds[this.state.randomBackground].backgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          marginTop: "-116px",
          zIndex: 2,
          position: "relative",
          minHeight: "520px",
        }}
      >
        <CircleShop style={backgrounds[this.state.randomBackground].styleBall} />
      </Box>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(Backgrounds);
