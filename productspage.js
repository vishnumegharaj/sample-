import React, { useEffect, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'; // Import ToggleButtonGroup
import "./productspage.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Productspage({ navigateToProductDetail }) {
    const [products, setProducts] = useState([]);
    const [productCategory, setProductCategory] = useState([]);
    const [sortOption, setSortOption] = useState('Default');
    const [sortedProducts, setSortedProducts] = useState([]);
    const [alignment, setAlignment] = useState('All');

    const dispatch = useDispatch();

    async function loadProducts() {
        const url = "http://localhost:3001/api/v1/products";
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        dispatch({
            "type" : "SET_PRODUCTS",
            payload : result
        })
       
        setProducts(result);
    }

    async function loadProductsCategories() {
        const url = "http://localhost:3001/api/v1/products/categories";
        const response = await fetch(url);
        const result = await response.json();
        setProductCategory(result); 
    }

    useEffect(() => {
        loadProducts();
        loadProductsCategories();
    }, []);

    useEffect(() => {
        const sortProducts = () => {
            switch (sortOption) {
                case 'Price high to low':
                    return [...products].sort((a, b) => b.price - a.price);
                case 'Price low to high':
                    return [...products].sort((a, b) => a.price - b.price);
                case 'Newest':
                    return [...products].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                default:
                    return products;
            }
        };
        setSortedProducts(sortProducts());
    }, [sortOption, products]);

    const handleSortChange = (event, newSortOption) => {
        setSortOption(newSortOption);
    };

    const handleCategoryChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <div>



            <span className="filterProducts">

                {/* FILTER */}
                <div className="sortingFilter">
                    <h2>Filter</h2>
                    <ToggleButtonGroup
                        color="primary"
                        size="small"
                        value={sortOption}
                        exclusive
                        onChange={handleSortChange}
                        aria-label="Sort products"
                        fontSize='0rem'
                    >
                        <ToggleButton sx={{ minWidth: 'auto', padding: '4px', fontSize: '0.7rem' }} value="Default">Default</ToggleButton>
                        <ToggleButton sx={{ minWidth: 'auto', padding: '4px', fontSize: '0.7rem' }} value="Price high to low">Price high to low</ToggleButton>
                        <ToggleButton sx={{ minWidth: 'auto', padding: '4px', fontSize: '0.7rem' }} value="Price low to high">Price low to high</ToggleButton>
                        <ToggleButton sx={{ minWidth: 'auto', padding: '4px', fontSize: '0.7rem' }} value="Newest">Newest</ToggleButton>
                    </ToggleButtonGroup>
                </div>

                {/* CATEGORY */}
                <div className="categoryFilter">
                    <h2> categories </h2>
                    <ToggleButtonGroup
                        color="primary"
                        size="small"
                        value={alignment}
                        exclusive
                        onChange={handleCategoryChange}
                        aria-label="Category"
                    >
                        <ToggleButton sx={{ minWidth: 'auto', padding: '4px', fontSize: '0.7rem' }} value="All">All</ToggleButton>
                        {productCategory.map(category => (
                            <ToggleButton key={category} sx={{ minWidth: 'auto', padding: '4px', fontSize: '0.7rem' }} value={category}>{category}</ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </div>
            </span>


            <div className="cardContainer">
                {sortedProducts.map(product => {
                    if (alignment === 'All' || product.category === alignment) {
                        return (
                            <div  >
                                <Card className="cardComponent" key={product._id} sx={{ maxWidth: 345 }}>
                                    <CardActionArea>

                                        <CardMedia className="product-Image" image={product.imageURL} component="img" sizes="" alt="green iguana" />

                                        <CardContent className="cardContent">

                                            <Typography  className="cardComponent" gutterBottom variant="h5" component="div"  style={{ fontFamily: '"El Messiri", sans-serif', fontSize: '1.8rem', fontWeight: 'bold' }}>
                                                {product.name}
                                            </Typography>

                                            <Typography className="product-Prize" gutterBottom variant="h6" component="div"  style={{ fontFamily: '"El Messiri", sans-serif', fontSize: '1.3rem',fontWeight: 'bold' }}>
                                                Price: {product.price}/-
                                            </Typography>

                                            <Typography className="product-Discription" variant="body2" color="text.secondary"  style={{ fontFamily: '"El Messiri", sans-serif' }}>
                                                Description: {product.description}
                                            </Typography>

                                            <Typography className="product-Discription" variant="body2" color="text.secondary"  style={{ fontFamily: '"El Messiri", sans-serif' }}>
                                                Available Items: {product.availableItems}
                                            </Typography>

                                          <button className="buyButton" onClick={(e) => {
                                                e.preventDefault(); // Prevent default button behavior
                                                e.stopPropagation(); // Stop event propagation
                                                navigateToProductDetail(product._id); // Call navigateToProductDetail with product ID
                                            }}>Buy Now</button>  

                                        </CardContent>

                                    </CardActionArea>
                                </Card>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

        </div>
    );
};
