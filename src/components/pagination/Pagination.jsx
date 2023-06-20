import "./pagination.css";
function Pagination({
  disablePrev = false,
  disabledNext = false,
  onChangePagination = (type = "next") => {},
}) {
  return (
    <div className='pagination'>
      <div className='pagination-button'>
        <nav className='pagination-nav'>
          <button
            className='pagination-nav-button'
            disabled={disablePrev}
            onClick={() => {
              onChangePagination("prev");
              window.scrollTo({ top: 410, behavior: "smooth" });
            }}
          >
            <i className='bx bxs-skip-previous-circle pagination-icon'></i>
          </button>

          <button
            className='pagination-nav-button'
            disabled={disabledNext}
            onClick={() => {
              onChangePagination("next");
              window.scrollTo({ top: 410, behavior: "smooth" });
            }}
          >
            <i className='bx bxs-skip-next-circle pagination-icon'></i>
          </button>
        </nav>
      </div>
      <div className='pagination-span'></div>
    </div>
  );
}

export default Pagination;
