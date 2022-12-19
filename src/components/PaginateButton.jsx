import "./paginateButton.css";
function paginateButton({ data, prevPage, nextPage, handlePage, page }) {
  return (
    <div id="container">
      <div id="pagination">
        <button onClick={() => prevPage()} className="btn btn-dark mx-2">
          Prev
        </button>
        {data.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => handlePage(index)}
              className={`blocks ${index === page ? "active" : null}`}
            >
              {index + 1}
            </button>
          );
        })}

        <button onClick={() => nextPage()} className="btn btn-dark ms-2">
          Next
        </button>
      </div>
    </div>
  );
}

export default paginateButton;
