interface needPageIndex {
    pageNum: number;
    totalPage: number;
    setPageNum(count: any): void;
}

function Pagenation(props: needPageIndex) {
    const { pageNum, totalPage, setPageNum } = props;

    const canNextPage = pageNum === totalPage ? false : true;
    const canPreviousPage = pageNum === 1 ? false : true;

    const handleClickPreviousPage = () => {
        setPageNum((count: number) => {
            const newCount = count - 1;
            return newCount;
        });
    };

    const handleClickNextPage = () => {
        setPageNum((count: number) => {
            const newCount = count + 1;
            return newCount;
        });
    };

    const handleClickGotoPage = (number: number) => {
        setPageNum(number === 0 ? 1 : number);
    };

    return (
        <div className="pagination">
            <button className="first" onClick={() => handleClickGotoPage(1)} disabled={!canPreviousPage} />
            <button className="prev" onClick={handleClickPreviousPage} disabled={!canPreviousPage} />

            {[...Array(5)].map((_, i) => {
                const pageNumber =
                    totalPage <= 5 || pageNum <= 3 ? i + 1 : Math.min(pageNum - 2 + i, totalPage - 4 + i);
                if (pageNumber > totalPage) return null;
                return (
                    <button
                        key={pageNumber}
                        onClick={() => handleClickGotoPage(pageNumber)}
                        disabled={pageNum === pageNumber}
                    >
                        {pageNumber}
                    </button>
                );
            })}
            <button className="next" onClick={handleClickNextPage} disabled={!canNextPage} />
            <button className="last" onClick={() => handleClickGotoPage(totalPage)} disabled={!canNextPage} />
            <span>
                Page{' '}
                <strong>
                    {pageNum} of {totalPage}
                </strong>{' '}
            </span>
        </div>
    );
}

export default Pagenation;
