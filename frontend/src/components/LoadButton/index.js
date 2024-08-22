function LoadButton({ fetchFunction, isFetchingNextPage, hasNextPage, isFetching }) {
    return (
        <div w="%100" className="grid  justify-items-center m-2">
            <button
                className="btn rounded-lg btn-sm "
                onClick={fetchFunction}
                // isLoading={isFetchingNextPage}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                        ? 'Load More'
                        : 'Nothing more to load'}
            </button>
            <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
        </div>
    )
}

export default LoadButton;

