import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProductDetailsPage = () => {
  const { state: product } = useLocation();

  useEffect(() => {
    console.log("###", product);
  }, [product]);

  //   const product = {
  //     title: "Product Title",
  //     price: 49.99,
  //     category: "Electronics",
  //     image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //   };

  const handleAddToCart = () => {
    console.log("Add to cart clicked!");
    // Perform add to cart action
  };

  const handleBuyNow = () => {
    console.log("Buy now clicked!");
    // Perform buy now action
  };

  return (
    <Grid container alignItems="center" justifyContent="center" height="100vh">
      <Grid item xs={12} sm={6}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "80vh",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "50%",
              minWidth: 200,
              height: "60%",
              marginTop: "150px",
            }}
            image={product.image}
            alt={product.title}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              objectFit: "scale-down",
            }}
          >
            <Typography variant="h5" component="div" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Category: {product.category}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              Price: ₹{product.price}
            </Typography>
            <Stack direction="row">
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                sx={{ marginRight: "1rem" }}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProductDetailsPage;
