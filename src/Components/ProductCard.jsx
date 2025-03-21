import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./ProductCard.module.scss";
import { FaHeart, FaEllipsisV, FaStar, FaRegStar } from "react-icons/fa";
import { deleteProduct, getAllProducts } from "../services/allApi";
import { useNavigate } from "react-router-dom";
import serverUrl from '../services/serverUrl';

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState(null); // Tracks which dropdown is open
    const [preview, setPreview] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const result = await getAllProducts();
            if (result.status === 200) {
                setProducts(result.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-product/${id}`);
    };

    const handleDelete = async (id) => {
        console.log("Deleting product with ID:", id);
        try {
            const result = await deleteProduct(id);
            if (result.status === 200) {
                alert("Deleted successfully");
                getProducts(); // Refresh product list
            } else {
                alert(result.data?.message || "Error deleting product");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };


    return (
        <Container>
            <Row>
                {products?.length > 0 ? (
                    products.map((item, index) => (
                        <Col key={index} sm={12} md={6} lg={3} className="d-flex justify-content-center mb-4">
                            <div className={styles.productCard}>
                                {/* Favorite & View Icons */}
                                <div className={styles.actions}>
                                    <button
                                        className={styles.icon}
                                        onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                                    >
                                        <FaEllipsisV />
                                    </button>

                                    {activeDropdown === index && (
                                        <div className={styles.optionsDropdown}>
                                            <button onClick={() => handleEdit(item._id)}>Edit</button>
                                            <button onClick={() => handleDelete(item._id)}>Delete</button>
                                        </div>
                                    )}

                                    <button className={styles.icon}><FaHeart /></button>
                                </div>

                                {/* Product Image */}
                                <div className={styles.productImage}>
                                    <img
                                        src={preview ? preview : `${serverUrl}/uploads/${item.img}`}
                                        alt={item.title || "Product Image"}
                                    />
                                </div>

                                {/* Product Info */}
                                <div className={styles.productInfo}>
                                    <p className={styles.title}><strong>Title:</strong> {item.title || "Product Name"}</p>
                                    <p className={styles.category}><strong>Category:</strong> {item.category || "Uncategorized"}</p>
                                    <p className={styles.description}><strong>Description:</strong> {item.description || "No description available."}</p>
                                    <p className={styles.priceContainer}>
                                        <strong>Price:</strong> <span className={styles.price}>${item.price || "0.00"}</span>
                                    </p>

                                    {/* Star Rating */}
                                    {Array.from({ length: 5 }, (_, idx) =>
                                        idx < item.rating ? (
                                            <FaStar key={idx} className={styles.filledStar} />
                                        ) : (
                                            <FaRegStar key={idx} />
                                        )
                                    )}
                                    {/* Add to Cart Button */}
                                    <button className={styles.addToCart}>Add To Cart</button>
                                </div>
                            </div>
                        </Col>
                    ))
                ) : (
                    <Col sm={12}><div className="text-center">No Products Available</div></Col>
                )}
            </Row>
        </Container>
    );
};

export default ProductCard;
