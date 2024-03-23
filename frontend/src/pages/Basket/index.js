import React from 'react';
import { useBasket } from '../../contexts/BasketContexts';
import { Link } from 'react-router-dom';

function Basket() {
    const { basketItems, addToBasket, removeFromBasket } = useBasket();

    const basketItemsArray = Object.keys(basketItems).map(itemId => ({
        id: itemId,
        ...basketItems[itemId] // Sepete eklenen ürünün tüm bilgilerini al
    }));

    const totalBasketPrice = basketItemsArray.reduce((total, basketItem) => {
        return total + (basketItem.price * basketItem.quantity);
    }, 0);

    
    const handleIncreaseQuantity = (itemId) => {
        addToBasket(basketItems[itemId]); // Ürünün adetini bir arttır
    };

    const handleDecreaseQuantity = (itemId) => {
        removeFromBasket(basketItems[itemId]); // Ürünün adetini bir azalt
    };

    return (
        <div>
            {basketItemsArray.length < 1 ? (
                <p>Sepetinizde Ürün Yok</p>
            ) : (
                <>
                    <ul>
                        {basketItemsArray.map(basketItem => (
                            
                            <li key={basketItem.id}>
                                <Link to={`/${basketItem._id}`}>
                                    {basketItem.title} - {basketItem.price} tl - Adet: {basketItem.quantity}
                                    <img width={50} src={basketItem.photos[0]} alt={basketItem.title} />
                                </Link>
                                <div className="quantity-controls">
              <button onClick={() => handleDecreaseQuantity(basketItem.id)}>-</button>
              <span>{basketItem.quantity}</span>
              <button onClick={() => handleIncreaseQuantity(basketItem.id)}>+</button>
            </div>
                            </li>
                        ))}
                    </ul>
                    <div>total = {totalBasketPrice}</div>
                </>
            )}
        </div>
    )
}

export default Basket;
