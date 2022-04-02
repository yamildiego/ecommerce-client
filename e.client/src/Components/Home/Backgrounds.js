import React from "react";

import Box from "@mui/material/Box";

import CircleShop from "./CircleShop";

import useRecursiveTimeout from "./../useRecursiveTimeout";

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

const Backgrounds = () => {
  const getBackgroundRandom = (lastBackground: number | null) => {
    let randomBackground = Math.floor(Math.random() * 4);
    if (randomBackground !== lastBackground) return randomBackground;
    else return getBackgroundRandom(lastBackground);
  };

  const [randomBackground, setRandomBackground] = React.useState(getBackgroundRandom());

  useRecursiveTimeout(() => setRandomBackground(getBackgroundRandom(randomBackground)), 8000);

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgrounds[randomBackground].backgroundImage})`,
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
      <CircleShop style={backgrounds[randomBackground].styleBall} />
    </Box>
  );
};

export default Backgrounds;
