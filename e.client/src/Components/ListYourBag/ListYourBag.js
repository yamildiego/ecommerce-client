import React, { Component } from "react";
import { connect } from "react-redux";

class ListYourBag extends Component {
  render() {
    return <div>LISTADO</div>;
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(ListYourBag);
