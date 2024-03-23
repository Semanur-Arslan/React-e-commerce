import React from "react";
import { useState } from "react";
import "../DetailCard/style.css";
import { useBasket } from "../../contexts/BasketContexts";

function DetailCard(props) {
  const { detailData } = props;
  const { addToBasket, basketItems, removeFromBasket} = useBasket();

  const [selectedImage, setSelectedImage] = useState(detailData.photos[0]);
  const [quantity, setQuantity] = useState(0);

  const date = new Date(detailData.createdAt);
  const formattedDate = date.toLocaleDateString("tr-TR");



 const handleAddToBasket = () => {
    if (quantity === 0) {
      setQuantity(1);
    } else {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
    addToBasket(detailData); 
  };



  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    addToBasket(detailData);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1);
      removeFromBasket(detailData);
    }
  };


  return (
    <div className="card card-side bg-base-100 shadow-xl grid lg:grid-cols-2 grid sm:grid-cols-1 gap-0 ">
        <div className="grid justify-center items-center p-4">
      <figure className="product-image-detail m-4 rounded-md">
        <img src={selectedImage} alt={detailData.title} loading="lazy" className="detail-image " />
      </figure>

      <div className="grid grid-cols-6 gap-2 ">
      {detailData.photos.map((photo, index) => (
        <div className="previews grid justify-center items-center" key={index}> 
          <img

            src={photo}
            alt={detailData.title}
            className={`mb-4 cursor-pointer image-preview rounded-md ${selectedImage === photo ? 'selected-image' : 'unselected-image'}`}
            onClick={() => setSelectedImage(photo)}
          />
          </div>
        ))}
        </div>
        </div>
        <div className="card-body grid justify-center items-center p-4">
        <h4 className="text-sm text-slate-300">{formattedDate}</h4>
        <h2 className="card-title">{detailData.title}</h2>
        <p>{detailData.description}</p>
        <div className="grid grid-cols-2 content-center">
          <p className="py-4">{detailData.price} tl</p>
          {quantity === 0 ? (
            <button className="btn btn-primary" onClick={handleAddToBasket}>Sepete Ekle</button>
          ) : (
            <div className="quantity-controls">
              <button onClick={handleDecreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncreaseQuantity}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailCard;
