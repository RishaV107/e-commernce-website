import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProductCard = ({ title, price, category, image, rating, count }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    console.log("Click");
    navigate("/products", {
      state: { title, price, category, image, rating, count },
    });
  };
  return (
    <CardActionArea onClick={handleCardClick}>
      <Card sx={{ height: "100%" }}>
        <CardMedia
          component="img"
          height="150"
          image={image}
          alt={title}
          sx={{ objectFit: "scale-down" }}
        />
        <CardContent>
          <Typography variant="subtitle1" color="text.secondary">
            {category}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            {title}
          </Typography>
          <Stack direction="row" sx={{ marginLeft: "-10px" }}>
            <Rating name="read-only" value={rating} readOnly />
            <Chip label={count} />
          </Stack>
          <Typography variant="h6" color="primary">
            ₹{price}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default ProductCard;
