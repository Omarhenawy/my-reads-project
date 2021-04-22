import { BrowserRouter as Router, Link } from "react-router-dom";

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
