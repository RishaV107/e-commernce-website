import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  ButtonGroup,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, setCart } from "../slices/cart";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(cartSelector);

  const [cartItems, setCartItems] = useState([]);
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  useEffect(() => {
    const tempArr = [...new Set(cart)];
    const arr = tempArr.map((obj, idx) => {
      return {
        id: idx,
        image: obj.image,
        name: obj.title,
        price: obj.price,
        quantity: 1,
      };
    });
    setCartItems(arr);
  }, [cart]);

  // Calculate the total price of all items in the cart
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const increaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: Math.max(item.quantity - 1, 0) };
      }
      return item;
    });
    for (let i = 0; i < updatedCartItems.length; i++) {
      if (updatedCartItems[i].quantity === 0) {
        updatedCartItems.splice(i, 1);
      }
    }
    const arr = [];
    for (let i = 0; i < localCart.length; i++) {
      for (let j = 0; j < updatedCartItems.length; j++) {
        if (localCart[i].image === updatedCartItems[j].image) {
          arr.push(localCart[i]);
        }
      }
    }
    dispatch(setCart(arr));

    setCartItems(updatedCartItems);
  };

  return (
    <Grid container spacing={3} sx={{ p: 3, mt: 5 }}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Shopping Cart
        </Typography>
      </Grid>
      {cartItems.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            Your cart is empty.
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Price: $${item.price.toFixed(2)}`}
                  />
                  <ListItemSecondaryAction>
                    <ButtonGroup
                      variant="text"
                      aria-label="outlined primary button group"
                    >
                      <Button
                        variant="contained"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </Button>

                      <Button variant="outlined">{item.quantity}</Button>

                      <Button
                        variant="contained"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align="right">
              Total Price: ₹{totalPrice.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" size="large" sx={{ mr: 2 }}>
              Checkout
            </Button>
            <Button component={Link} to="/" variant="outlined" size="large">
              Continue Shopping
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default CartPage;
