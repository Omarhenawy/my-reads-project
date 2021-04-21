import React, { useState } from "react";

const BookShelfChanger = ({ shelf, book, onMove }) => {
  const [currentShelf, setShelf] = useState(shelf);

  const HandleChange = (e) => {
    setShelf(e.target.value);
    onMove(book, e.target.value);
  };
  return (
    <div className="book-shelf-changer">
      <select value={currentShelf} onChange={HandleChange}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookShelfChanger;
