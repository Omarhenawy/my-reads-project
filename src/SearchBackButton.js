import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

const SearchBackButton = () => {
  return (
    <Link to="/">
      <button className="close-search">Close</button>
    </Link>
  );
};
export default SearchBackButton;
