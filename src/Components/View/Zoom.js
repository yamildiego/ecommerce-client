import React, { Component, createRef } from "react";
import styles from "./Zoom.css";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const imageRef = createRef();

class Zoom extends Component {
  state = {
    img: this.props.img,
    zoom: false,
    mouseX: null,
    mouseY: null,
    blur: 0,
  };

  componentDidUpdate(oldProps) {
    if (oldProps.img !== this.props.img) {
      this.setState({ ...this.state, img: this.props.img });
      this.blur(8);
    }
  }

  blur = (blur) => {
    setTimeout(() => {
      if (blur >= 0) {
        this.setState({ blur });
        this.blur(blur - 1);
      }
    }, 20);
  };

  handleMouseOver = () => this.setState({ zoom: true });

  handleMouseOut = () => this.setState({ zoom: false });

  handleMouseMovement = (e) => {
    const { left: offsetLeft, top: offsetTop } = imageRef.current.getBoundingClientRect();
    const {
      current: {
        style: { height, width },
      },
    } = imageRef;

    const x = ((e.pageX - offsetLeft) / parseInt(width, 10)) * 100;
    const y = ((e.pageY - offsetTop) / parseInt(height, 10)) * 100;

    this.setState({
      mouseX: x,
      mouseY: y,
    });
  };

  render() {
    const { height, width, transitionTime, zoomScale, isLoading } = this.props;
    const { mouseX, mouseY, zoom, img, blur } = this.state;

    const innerDivStyle = {
      height: `${height}px`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "auto 100%",
      backgroundImage: `url("${img}")`,
      transition: `transform ${transitionTime}s ease-out`,
    };

    if (blur > 0) {
      innerDivStyle.filter = `blur(${blur}px)`;
    }

    const outerDivStyle = { backgroundColor: "#f2f3f2", height: `${height}px`, width: `${width}px`, overflow: "hidden" };

    const transform = { transformOrigin: `${mouseX}% ${mouseY}%` };

    return (
      <div
        style={outerDivStyle}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onMouseMove={this.handleMouseMovement}
        ref={imageRef}
      >
        {!img && isLoading && (
          <Box sx={{ justifyContent: "center", display: "flex", height: "100%", alignItems: "center", backgroundColor: "#f2f3f2" }}>
            <CircularProgress size={45} />
          </Box>
        )}
        <div
          style={{
            ...transform,
            ...innerDivStyle,
            transform: zoom ? `scale(${zoomScale})` : "scale(1.0)",
          }}
          className={styles.zoomImg}
        />
      </div>
    );
  }
}

export default Zoom;
