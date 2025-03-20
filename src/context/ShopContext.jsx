import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
import { products } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = '$';
  const delivery_fee = 10;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);                             // New state to hold orders
  const navigate = useNavigate();                                       // to navigate to different pages


  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size", { position: "top-right", autoClose: 2000 });  // ✅ Error toast if no size selected
      return;
    }
  
    let cartData = structuredClone(cartItems); 
  
    if (cartData[itemId]) {
      cartData[itemId][size] 
        ? (cartData[itemId][size] += 1) 
        : (cartData[itemId][size] = 1);
    } else {
      cartData[itemId] = {};  
      cartData[itemId][size] = 1;  
    }
  
    setCartItems(cartData);
  
    toast.success("Your item is added!", { position: "top-right", autoClose: 2000 });  // ✅ Success toast when item is added
  };
  

  const addOrder = () => {
    let tempOrders = structuredClone(orders); // Create a deep copy of the orders
    let newOrder = [];

    for (const item in cartItems) {          //   Loop through the cart items
      for (const size in cartItems[item]) {    // Loop through the sizes of the cart items
        if (cartItems[item][size] > 0) {      // If the quantity of the item is greater than 0
          newOrder.push({                      // Add the item to the new order
            _id: item,
            size,
            quantity: cartItems[item][size],
          });
        }
      }
    }
    setOrders([...tempOrders, ...newOrder]); // Add the new order to the orders
    setCartItems({});               // Clear cart after placing the order
  };

  const getCartCount = () => {                            // Function to get the total number of items in the cart
    let totalCount = 0;
    for (const item in cartItems) {                                        // Loop through the cart items
      for (const size in cartItems[item]) {                    // Loop through the sizes of the cart items
        if (cartItems[item][size] > 0) {                   // If the quantity of the item is greater than 0
          totalCount += cartItems[item][size];                       // Add the quantity to the total count
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {  
    let cartData = structuredClone(cartItems); 
    cartData[itemId][size] = quantity;                             // Update the quantity of the item in the cart
    setCartItems(cartData);
  };

  const getCartAmount = () => {                          // Function to get the total amount of the items in the cart
    let totalAmount = 0;
    for (const item in cartItems) {                                          // Loop through the cart items
      const productInfo = products.find((product) => product._id === item); // Find the product in the products array
      for (const size in cartItems[item]) {                               // Loop through the sizes of the cart items
        try {
          if (cartItems[item][size] > 0) {
            totalAmount += productInfo.price * cartItems[item][size];          // Calculate the total amount
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    addOrder, // Add this to allow placing orders
    orders,
    navigate,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ShopContextProvider;