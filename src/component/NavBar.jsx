import {
  AppBar,
  Badge,
  Button,
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

const NavBar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(categoriesSelector);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
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
          <Typography variant="h6" noWrap className="title">
            E-commerce Company
          </Typography>
          <IconButton color="inherit" aria-label="shopping cart">
            <Badge badgeContent={4} color="error">
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
                  <Button variant="text">{item}</Button>
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
