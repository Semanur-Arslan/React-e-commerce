import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoadButton from "../../components/LoadButton";


import { fetchProductList } from "../../Api"
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
      <div className="container mx-auto p-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {
          data && data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {
                group.map((item) => (
                  <div key={item._id} >
                    <Card item={item} />
                  </div>

                ))
              }
            </React.Fragment>
          ))
        }

      </div>
      <LoadButton
        fetchFunction={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
      />
    </>
  );
}

export default Products;
