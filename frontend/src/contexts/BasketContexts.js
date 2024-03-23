import {useState, useContext, createContext, useEffect} from 'react';

const BasketContext = createContext()

const BasketProvider = ({ children }) => {
    const [basketItems, setBasketItems] = useState({});

    const addToBasket = (data) => {
        setBasketItems((prev) => {
            const updatedItems = { ...prev };
            if (updatedItems[data._id]) {
                updatedItems[data._id] += 1;
            } else {
                updatedItems[data._id] = 1;
            }
            return updatedItems;
        });
    };

    
    const removeFromBasket = (data) => {
        setBasketItems((prev) => {
            const updatedItems = { ...prev };
            if (updatedItems[data._id] && updatedItems[data._id] > 1) {
                updatedItems[data._id] -= 1;
            } else {
                delete updatedItems[data._id];
            }
            return updatedItems;
        });
    };
    
    const values = {
        basketItems,
        setBasketItems,
        addToBasket,
        removeFromBasket
    }

    return (
        <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
    )
}

const useBasket = () => useContext(BasketContext);

export {BasketProvider, useBasket} ; 