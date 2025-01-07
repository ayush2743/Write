interface PaginationProps {
    totalBlogs: number;
    setPage: (page: number) => void;
    page: number;
}

const Pagination = ({ totalBlogs, setPage, page }: PaginationProps) => {
    const totalPages = Math.ceil(totalBlogs / 4); // Assuming 4 blogs per page
    const maxVisiblePages = 3; // Maximum number of page buttons to show


    const startPage = page - ((page - 1) % maxVisiblePages);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);    

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <nav className="mt-20 flex items-center justify-center gap-x-6" aria-label="Pagination">
            <button
                type="button"
                className={`min-h-[38px] min-w-[38px] py-3 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm font-head rounded-lg text-white   focus:outline-none  ${page === 1 ? 'opacity-50' : ''}`}
                aria-label="Previous"
                onClick={handlePrevious}
                disabled={page === 1}
            >
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
                <span>Previous</span>
            </button>

            <div className="flex items-center gap-x-2">
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        type="button"
                        className={`min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm font-head rounded-lg focus:outline-none ${page === pageNumber ? 'border border-gray-100/20 bg-gray-100/10 text-white' : 'text-white hover:bg-gray-100/10'}`}
                        onClick={() => setPage(pageNumber)}
                        aria-current={page === pageNumber ? 'page' : undefined}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>

            <button
                type="button"
                className={`min-h-[38px] min-w-[38px] py-3 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm font-head rounded-lg text-white   focus:outline-none  ${page === totalPages ? 'opacity-50' : ''}`}
                aria-label="Next"
                onClick={handleNext}
                disabled={page === totalPages}
            >
                <span>Next</span>
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
            </button>
        </nav>
    );
};

export default Pagination;