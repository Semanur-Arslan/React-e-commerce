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
                updatedItems[data._id].quantity += 1;
            } else {
                updatedItems[data._id] = { ...data, quantity: 1 };
            }
            return updatedItems;
        });
    };

    const removeFromBasket = (data) => {
        setBasketItems((prev) => {
            const updatedItems = { ...prev };
            if (updatedItems[data._id] && updatedItems[data._id].quantity > 1) {
                updatedItems[data._id].quantity -= 1;
            } else {
                delete updatedItems[data._id];
            }
            return updatedItems;
        });
    };


    const emptyBasket = () => setBasketItems([])

    const values = {
        basketItems,
        setBasketItems,
        addToBasket,
        removeFromBasket,
        emptyBasket
    };

    return (
        <BasketContext.Provider value={values}>
            {children}
        </BasketContext.Provider>
    );
};

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };
