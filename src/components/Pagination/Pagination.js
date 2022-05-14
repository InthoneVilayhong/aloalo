import "./Pagination.scss";

const Pagination = ({ page, setPage, setSkip, data, pageLimit }) => {
    return (
        <div className="container-pagination">
            <button
                className="btn-pagination"
                disabled={page === 1 && true}
                onClick={() => {
                    setPage(page - 1);
                    setSkip((previousState) => previousState - data.limit);
                }}
            >
                Précédent
            </button>
            <span>
                {page}/{pageLimit}
            </span>
            <button
                className="btn-pagination"
                disabled={page === pageLimit && true}
                onClick={() => {
                    setPage(page + 1);
                    setSkip((previousState) => previousState + data.limit);
                }}
            >
                Suivant
            </button>
        </div>
    );
};

export default Pagination;
