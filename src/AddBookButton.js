import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

const AddBookButton = () => {
  return (
    <div className="open-search">
      <Link to="search">
        <button>Add a book</button>
      </Link>
    </div>
  );
};
export default AddBookButton;
