import Box from "@mui/material/Box";

const NoElements = (props) => {
  return (
    <Box sx={{ m: 5, textAlign: "center", fontSize: "25px" }}>{`${
      props.search !== "" ? `Oops, no results for "${props.search}"` : "No elements found"
    }`}</Box>
  );
};

export default NoElements;
