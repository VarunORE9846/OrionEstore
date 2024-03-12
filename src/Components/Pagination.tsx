import { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";

export const Pagination = ({ nPages, currentPage, setCurrentPage }: any) => {
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);
  const pageNumbers: number[] = Array.from(Array(nPages), (_, i) => i + 1);
  useEffect(() => {
    if (currentPage > 3) {
      // toast.error("You have reached the end of the page");
      setDisableNext(true);
    } else if (currentPage === 3) {
      setDisableNext(true);
      // toast.error("You have reached the end of the page");
    } else {
      setDisableNext(false);
      setDisablePrev(false);
    }
    if (currentPage === 1) {
      setDisablePrev(true);
      // toast.error("You Are Already On First Page");
    } else if (currentPage < 1) {
      // toast.error("You Are on first Page");
      setDisablePrev(true);
    } else {
      setDisablePrev(false);
      setDisableNext(false);
    }
  }, [currentPage]);
  //==========================================================================================
  const goToNextPage = () => {
    if (currentPage > 3) {
      // toast.error("You have reached the end of the page");
      setDisableNext(true);
    } else if (currentPage === 3) {
      setDisableNext(true);
      // toast.error("You have reached the end of the page");
    } else {
      setCurrentPage(currentPage + 1);
      setDisableNext(false);
      setDisablePrev(false);
    }
  };
  //===================================================================================================
  const goToPrevPage = () => {
    if (currentPage === 1) {
      setDisablePrev(true);
      // toast.error("You Are Already On First Page");
    } else if (currentPage < 1) {
      // toast.error("You Are on first Page");
      setDisablePrev(true);
    } else {
      setCurrentPage(currentPage - 1);
      setDisablePrev(false);
      setDisableNext(false);
    }
  };
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={goToPrevPage}
              disabled={disablePrev}
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((pgNumber) => (
            <li
              key={pgNumber}
              className={`page-item ${
                currentPage == pgNumber ? "active" : ""
              } `}
            >
              <a
                // onClick={() => setCurrentPage(pgNumber)}
                className="page-link"
                href="#"
              >
                {currentPage}
              </a>
            </li>
          ))}
          <li className="page-item">
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={goToNextPage}
              disabled={disableNext}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      {/* <ToastContainer /> */}
    </>
  );
};
