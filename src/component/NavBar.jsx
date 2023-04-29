import {
  AppBar,
  Badge,
  Button,
  CardActionArea,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";

import { fetchCategories, categoriesSelector } from "../slices/categories";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartSelector } from "../slices/cart";
import { fetchProducts } from "../slices/products";

const NavBar = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector(categoriesSelector);
  const { cart } = useSelector(cartSelector);
  const [localCart, setLocalCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setLocalCart([...new Set(cart)]);
  }, [cart]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleClick = () => {
    navigator("/");
  };
  const handleCartClick = () => {
    navigator("/cart");
  };
  const handleDrawerClick = (e) => {
    // console.log(e.target.value);
    setIsDrawerOpen(false);
    dispatch(fetchProducts(e.target.value));
  };

  return (
    <>
      <AppBar position="fixed" className="appBar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className="menuButton"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <CardActionArea onClick={handleClick}>
            <Typography variant="h6" noWrap className="title">
              E-commerce Company
            </Typography>
          </CardActionArea>
          <IconButton
            color="inherit"
            aria-label="shopping cart"
            onClick={handleCartClick}
          >
            <Badge badgeContent={localCart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        classes={{
          paper: "drawerPaper",
        }}
      >
        <List>
          {categories.map((item) => {
            return (
              <ListItem key={item}>
                <ListItemText key={item}>
                  <Button
                    value={item}
                    variant="text"
                    onClick={handleDrawerClick}
                  >
                    {item}
                  </Button>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
