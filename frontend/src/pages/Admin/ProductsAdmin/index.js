import React, { useState, useMemo } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProductList, deleteProduct } from "../../../Api";
import { formatDate } from "../../../utils/dateFormetter";
import LoadButton from "../../../components/LoadButton";
import Modal from '../../../components/Modal/index';
import { Link } from "react-router-dom";

function ProductsAdmin() {

  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['productsAdmin'],
    queryFn: fetchProductList,
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 12;

      if (!morePagesExist) {
        return;
      }
      return allGroups.length + 1;
    }
  });


  const deleteMutation = useMutation({
    mutationFn: (productId) => deleteProduct(productId),
    onSuccess: () => {
      handleModalClose();
      queryClient.invalidateQueries('productsAdmin');
    }
  });


  if (status === "loading") return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      deleteMutation.mutate(selectedProduct._id);
    }
  };

  const handleEditClick = (id) => {

  }

  return (
    <div className="mb-8">
      <div className="container overflow-x-auto p-4">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Created at</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data && data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {
                  group.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className=" h-24 w-24">
                              <img
                                src={item.photos[0]}
                                alt="product" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.title}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        ${item.price}
                      </td>
                      <td>{formatDate(item.createdAt)}</td>
                      <td>
                        <div className="flex flex-nowrap flex-center">
                          <Link to={`${item._id}`}> <button className="btn btn-outline btn-success btn-xs me-2">Edit</button> </Link>
                          <button className="btn btn-outline btn-error btn-xs" onClick={() => handleDeleteClick(item)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </React.Fragment>
            ))
            }
          </tbody>

        </table>
      </div>

      <LoadButton
        fetchFunction={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
      />
      {isOpen == true &&
        <Modal
          isOpen={isOpen}
          onClose={handleModalClose}
          title="Delete Product"
          text={`Are you sure you want to delete the product "${selectedProduct?.title}"?`}
          onConfirm={handleDeleteConfirm}
        />
      }
    </div>
  );
}

export default ProductsAdmin;
