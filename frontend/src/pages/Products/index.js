import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";


import {fetchProductList} from "../../Api"
import Card from "../../components/Card";

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProductList,
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 12;
  
      if (!morePagesExist) {
        return;
      }
      return allGroups.length + 1;
    }
  });
  


  if (status === "loading") return "Loading...";

  if (error) return "An error has occurred: " + error.message;


  return (
    <>
    <div className="container mx-auto p-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-10  justify-items-center">
      {
        data && data.pages.map((group, i ) => (
          <React.Fragment key={i}>
            {
              group.map((item) => (
                <div w="%100" key={item._id} >
                  <Card item= {item} />
                </div>

              ))
            }
          </React.Fragment>
        ))
      }

    </div>
    
<div w="%100" className="grid  justify-items-center m-2">
<button
className="btn rounded-lg btn-sm "
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
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
</>
  );
}

export default Products;
