import React, { Component } from "react";
import { connect } from "react-redux";

import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

import * as ecommerceActions from "../Actions/ecommerceActions";

class Pagination extends Component {
  handleOnClick = (page) => this.props.dispatch(ecommerceActions.setPage(page));

  render() {
    return (
      <Stack direction="row" spacing={0}>
        <CreateLink
          i={this.props.page - 1}
          label={`<`}
          totalPages={this.props.totalPages}
          page={this.props.page}
          onClick={() => this.handleOnClick(this.props.page - 1)}
        />
        {[...Array(this.props.totalPages + 1)].map((row, i) => (
          <React.Fragment key={i}>
            {i !== 0 && (i === this.props.page - 1 || i === this.props.page + 1 || i === this.props.page) && (
              <CreateLink i={i} label={i} totalPages={this.props.totalPages} page={this.props.page} onClick={() => this.handleOnClick(i)} />
            )}
          </React.Fragment>
        ))}
        <CreateLink
          i={this.props.page + 1}
          label={`>`}
          totalPages={this.props.totalPages}
          page={this.props.page}
          onClick={() => this.handleOnClick(this.props.page + 1)}
        />
      </Stack>
    );
  }
}

const CreateLink = (props) => {
  return (
    <React.Fragment>
      {(props.i <= 0 || props.i > props.totalPages || props.page === props.i) && (
        <React.Fragment>
          {props.page === props.i && (
            <Link
              sx={{ padding: "5px 8px", userSelect: "none", color: "#222", textDecoration: "none", cursor: "default", fontWeight: "bold" }}
            >
              {props.label}
            </Link>
          )}
          {props.page !== props.i && (
            <Link sx={{ padding: "5px 8px", userSelect: "none", color: "#222", textDecoration: "none", cursor: "default" }}>
              {props.label}
            </Link>
          )}
        </React.Fragment>
      )}

      {props.i > 0 && props.i <= props.totalPages && props.page !== props.i && (
        <Link sx={{ padding: "5px 8px", userSelect: "none" }} href="#top" onClick={props.onClick}>
          {props.label}
        </Link>
      )}
    </React.Fragment>
  );
};

function mapStateToProps(state, props) {
  return {
    totalPages: state.ecommerceReducer.totalPages,
    page: state.ecommerceReducer.filters.page,
  };
}

export default connect(mapStateToProps)(Pagination);
