import React, { useState } from "react";
import "../DetailCard/style.css";
import { useBasket } from "../../contexts/BasketContexts";
import { useAuth } from "../../contexts/AuthContext";
import { formatDate } from "../../utils/dateFormetter";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ImageModal from "../ImageModal/index";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from '../../components/Modal/index';
import { deleteProduct } from "../../Api";


function DetailCard(props) {
  const { detailData } = props;
  const { addToBasket, removeFromBasket, basketItems } = useBasket();
  const { user } = useAuth();

  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState(detailData.photos[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hideShow, setHideShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const product = basketItems[detailData._id];
  const quantity = product ? product.quantity : 0;

  const handleAddToBasket = () => {
    addToBasket(detailData);
  };

  const handleIncreaseQuantity = () => {
    addToBasket(detailData);
  };

  const handleDecreaseQuantity = () => {
    removeFromBasket(detailData);
  };


  const handlePrevImage = () => {
    const currentIndex = detailData.photos.indexOf(selectedImage);
    const prevIndex = currentIndex === 0 ? detailData.photos.length - 1 : currentIndex - 1;
    setSelectedImage(detailData.photos[prevIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = detailData.photos.indexOf(selectedImage);
    const nextIndex = currentIndex === detailData.photos.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(detailData.photos[nextIndex]);
  };

  const openModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
    console.log(selectedImage)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteMutation = useMutation({
    mutationFn: (productId) => deleteProduct(productId),
    onSuccess: () => {
      handleModalClose();
      queryClient.invalidateQueries('productsAdmin');
    }
  });

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

  return (
    <div className="grid lg:grid-cols-2 grid sm:grid-cols-1 lg:gap-4 ">
      <div>
        <div className="relative">
          <button
            className="absolute top-1/2 z-10 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 hover:bg-gray-100"
            onClick={handlePrevImage}
          >
            <IoIosArrowBack />
          </button>
          <figure className="product-image-detail m-4 rounded-md ">

            <img
              src={selectedImage}
              alt={detailData.title}
              loading="lazy"
              className="detail-image "
              onClick={openModal}
            />
          </figure>

          <button
            className="absolute  top-1/2 z-10 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 hover:bg-gray-100"
            onClick={handleNextImage}
          >
            <IoIosArrowForward />
          </button>
        </div>

        <div className="flex justify-center flex-wrap">
          {detailData.photos.map((photo, index) => (
            <div
              className="previews m-2"
              key={index}
            >
              <img
                src={photo}
                alt={detailData.title}
                className={`mb-4 cursor-pointer image-preview rounded-md ${selectedImage === photo
                  ? "selected-image"
                  : "unselected-image"
                  }`}
                onClick={() => setSelectedImage(photo)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-sm text-slate-300 my-4">{formatDate(detailData.createdAt)}</h4>
        <h2 className="text-xl font-bold my-4">{detailData.title}</h2>
        <div className="my-6">
          <p className="text-gray text-xs">1 piece</p>
          <div className="flex items-center ">
            <p className="pe-12 text-lg">{detailData.price} $</p>
            {user?.role !== 'admin' ? (
              quantity === 0 ? (
                <button className="btn btn-primary btn-sm text-white text-base" onClick={handleAddToBasket}>
                  {" "}
                  Add to cart
                </button>
              ) : (
                <div className="grid justify-end content-center ">
                  <div className="grid grid-cols-3 border border-primary rounded-md text-primary w-32  ">
                    <button onClick={handleDecreaseQuantity}>-</button>
                    <span className="text-center text-lg">{quantity}</span>
                    <button onClick={handleIncreaseQuantity}>+</button>
                  </div>
                </div>
              )
            ) : (
              <div className="flex flex-nowrap flex-center">
                <Link to={`${detailData._id}`}> <button className="btn btn-outline btn-success btn-xs me-2">Edit Product</button> </Link>
                <div>
                  <button className="btn btn-outline btn-error btn-xs " onClick={() => handleDeleteClick(detailData)}>Delete Product</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <p className={hideShow == false ? 'mt-4 line-clamp-6' : 'mt-4'}>{detailData.description}</p>
        <div className="flex justify-end">
          <button className="btn btn-link" onClick={() => setHideShow(!hideShow)}>
            {hideShow == true ? (
              'Hide'
            ) : ('See more')}
          </button>
        </div>

      </div>
      <ImageModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalImage={selectedImage}
        handlePrevImage={handlePrevImage}
        handleNextImage={handleNextImage}
      />

      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        title="Delete Product"
        text={`Are you sure you want to delete the product "${selectedProduct?.title}"?`}
        onConfirm={handleDeleteConfirm}
      />


    </div>
  );
}

export default DetailCard;
