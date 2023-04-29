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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
