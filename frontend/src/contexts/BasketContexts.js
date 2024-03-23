import React, { useState, useContext, createContext, useEffect } from 'react';

const BasketContext = createContext();

const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

const BasketProvider = ({ children }) => {
    const [basketItems, setBasketItems] = useState(defaultBasket);

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basketItems))
    }, [basketItems])

    const addToBasket = (data) => {
        setBasketItems((prev) => {
            const updatedItems = { ...prev };
            if (updatedItems[data._id]) {
                updatedItems[data._id].quantity += 1; // Ürün adetini arttır
            } else {
                updatedItems[data._id] = { ...data, quantity: 1 }; // Yeni ürünü ekle, adet 1 olarak başla
            }
            return updatedItems;
        });
    };

    const removeFromBasket = (data) => {
        setBasketItems((prev) => {
            const updatedItems = { ...prev };
            if (updatedItems[data._id] && updatedItems[data._id].quantity > 1) {
                updatedItems[data._id].quantity -= 1; // Ürün adetini azalt
            } else {
                delete updatedItems[data._id]; // Ürünü sepette bulunan tüm bilgileriyle birlikte sil
            }
            return updatedItems;
        });
    };

    const values = {
        basketItems,
        setBasketItems,
        addToBasket,
        removeFromBasket
    };

    return (
        <BasketContext.Provider value={values}>
            {children}
        </BasketContext.Provider>
    );
};

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };
