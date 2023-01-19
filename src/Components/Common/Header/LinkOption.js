import { Link } from "react-router-dom";

import "./LinkOption.css";

const LinkOption = (props) => {
  return (
    <li className="LinkOption" onClick={props.onClick}>
      <Link className="LinkOptionLink" variant="inherit" to={"/Shop"} style={{ textDecoration: "none" }}>
        {props.label}
      </Link>
    </li>
  );
};
export default LinkOption;
