function LoadButton({ fetchFunction, isFetchingNextPage, hasNextPage, isFetching }) {
    return (
        <div className="w-full grid justify-items-center m-2 pb-8">
            {hasNextPage ? (
                <button
                    className="btn rounded-lg btn-sm"
                    onClick={fetchFunction}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : 'Load More'}
                </button>
            ) : (
                <div>{isFetching ? "Fetching..." : "Nothing more to load"}</div>
            )}
        </div>
    );
}

export default LoadButton;
