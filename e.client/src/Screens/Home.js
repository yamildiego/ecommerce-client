import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ScreenLayout from "./ScreenLayout";
import CircleShop from "../Components/CircleShop";

import * as configActions from "../Actions/configActions";

import Background_0 from "../Assets/Images/christopher-campbell-kFCdfLbu6zA-unsplash.jpg";
import Background_1 from "../Assets/Images/victor-freitas-hOuJYX2K5DA-unsplash.jpg";
import Background_2 from "../Assets/Images/fachry-zella-devandra-Yta-zdP9PVM-unsplash.jpg";
import Background_3 from "../Assets/Images/bruce-mars-oLStrTTMz2s-unsplash.jpg";

import Men from "../Assets/Images/men.jpg";
import Women from "../Assets/Images/women.jpg";
import Kids from "../Assets/Images/kids.jpg";

const backgrounds = [
  { backgroundImage: Background_0, styleBall: { right: "22%", bottom: "28%" } },
  { backgroundImage: Background_1, styleBall: { right: "30%", bottom: "6%" } },
  { backgroundImage: Background_2, styleBall: { right: "16%", bottom: "10%" } },
  { backgroundImage: Background_3, styleBall: { right: "16%", bottom: "10%" } },
];

const categories = [
  { key: 1, id: "MEN", src: Men, title: "Men" },
  { key: 2, id: "WOMEN", src: Women, title: "Women" },
  { key: 3, id: "KIDS", src: Kids, title: "Kids" },
];

class Home extends React.Component {
  state = { randomBackground: Math.floor(Math.random() * 4), products: [] };

  componentDidMount() {
    this.reloadBackgrounds();
  }

  // calculateProducts = () => {
  //   let products = [];
  //   let ids = [];
  //   datas.forEach((data) => {
  //     files.forEach((file) => {
  //       if (file.cloudProductId == data.cloudProductId && !ids.includes(data.cloudProductId)) {
  //         products.push({ ...data, ...file });
  //         ids.push(data.cloudProductId);
  //       }
  //     });
  //   });
  //   this.setState({ ...this.state, products });
  // };

  toggleOptions = () => this.props.dispatch(configActions.toggleOptionsMenu());

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
      <ScreenLayout>
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
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", ml: 4, mr: 4 }}>
          {categories.map((category) => {
            return <CategoryOption {...category} />;
          })}
        </Box>
      </ScreenLayout>
    );
  }
}

class CategoryOption extends Component {
  render() {
    return (
      <Link variant="contained" to={"/Shop/" + this.props.id} style={{ textDecoration: "none" }}>
        <Box sx={{ margin: 2, position: "relative", cursor: "pointer" }}>
          <img src={this.props.src} alt={this.props.title} loading="lazy" style={{ width: "100%" }} />
          <Button sx={{ position: "absolute", bottom: "8%", zIndex: 100, left: "40%" }} variant="contained">
            {this.props.title}
          </Button>
        </Box>
      </Link>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    isLoading: state.appReducer.isLoading,
    user: state.apiReducer.user,
  };
}

export default connect(mapStateToProps)(Home);
