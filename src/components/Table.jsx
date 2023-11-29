import View from "./View";

const Table = ({ columns, data, currentPage, totalPages, onPageChange }) => {
  return (
    <>
      <div className="overflow-x-auto bg-white p-2 rounded-lg shadow-sm mb-4 mt-8">
        <table className="table table-sm">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column.key]}</td>
                ))}
                <td>
                  <button
                    className="btn btn-circle btn-sm"
                    onClick={() =>
                      document
                        .getElementById(`my_modal_${rowIndex}`)
                        .showModal()
                    }
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <dialog id={`my_modal_${rowIndex}`} className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <View data={row} />
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      <div className="join w-full flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`join-item btn btn-sm ${
              currentPage === index + 1 ? "btn btn-outline" : ""
            }`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Table;
