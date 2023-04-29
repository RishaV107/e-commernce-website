import { Grid, Container } from "@mui/material";
import ProductCard from "./productCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts, productsSelector } from "../slices/products";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(productsSelector);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  //   useEffect(() => {
  //     console.log("###", products);
  //   }, [products]);
  return (
    <Container maxWidth="lg" sx={{ marginTop: 15 }}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ProductCard
              title={product.title}
              price={product.price}
              category={product.category}
              image={product.image}
              rating={product.rating.rate}
              count={product.rating.count}
            />
            {/* <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Category: {product.category}
                </Typography>
                <Typography variant="h6" color="primary">
                  Price: ${product.price}
                </Typography>
              </CardContent>
            </Card> */}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
