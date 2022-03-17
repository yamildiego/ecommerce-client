import React, { Component, createRef } from "react";
import styles from "./Zoom.css";

const imageRef = createRef();

class Zoom extends Component {
  state = {
    img: this.props.img,
    zoom: false,
    mouseX: null,
    mouseY: null,
  };

  componentDidUpdate(oldProps) {
    if (oldProps.img !== this.props.img) {
      this.setState({ ...this.state, img: this.props.img });
    }
  }

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
    const { height, width, transitionTime, zoomScale } = this.props;
    const { mouseX, mouseY, zoom, img } = this.state;

    const innerDivStyle = {
      height: `${height}px`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "auto 100%",
      backgroundImage: `url('${img}')`,
      transition: `transform ${transitionTime}s ease-out`,
    };

    const outerDivStyle = { height: `${height}px`, width: `${width}px`, overflow: "hidden" };

    const transform = { transformOrigin: `${mouseX}% ${mouseY}%` };

    return (
      <div
        style={outerDivStyle}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onMouseMove={this.handleMouseMovement}
        ref={imageRef}
      >
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
