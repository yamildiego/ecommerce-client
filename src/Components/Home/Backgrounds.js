import React from "react";
import { isMobile } from "react-device-detect";

import Box from "@mui/material/Box";

import CircleShop from "./CircleShop";

import useRecursiveTimeout from "../../Functions/useRecursiveTimeout";

import Background_0 from "../../Assets/Images/christopher-campbell-kFCdfLbu6zA-unsplash.jpg";
import Background_1 from "../../Assets/Images/victor-freitas-hOuJYX2K5DA-unsplash.jpg";
import Background_2 from "../../Assets/Images/fachry-zella-devandra-Yta-zdP9PVM-unsplash.jpg";

const backgrounds = [
  { backgroundImage: Background_0, styleBall: isMobile ? { right: "2%", bottom: "28%" } : { right: "22%", bottom: "28%" } },
  {
    backgroundImage: Background_1,
    styleBall: isMobile ? { right: "4%", bottom: "8%" } : { right: "30%", bottom: "6%" },
  },
  {
    backgroundImage: Background_2,
    styleBall: isMobile ? { left: "50%", bottom: "2%", transform: "translateX(-50%)" } : { right: "16%", bottom: "10%" },
  },
];

const Backgrounds = () => {
  const getBackgroundRandom = (lastBackground: number | null) => {
    let randomBackground = Math.floor(Math.random() * backgrounds.length);
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
