import React, { useEffect, useState } from 'react';
import styles from './AddProduct.module.scss';
import { addNewJob, getSingleProduct, updateSingleProduct } from '../services/allApi';
import Navbar from '../Components/Navbar';
import { useParams } from 'react-router-dom';
import serverUrl from '../services/serverUrl';


const AddProduct = () => {
    const [productDetails, setProductDetails] = useState({
        title: "",
        description: "",
        price: "",
        img: "",
        category: "",
        rating: ""
    });

    const [preview, setPreview] = useState("");
    const [imageFileStatus, setImgFileStatus] = useState(false);
    const [editJob, setEditJob] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setEditJob(true);
            getSingleProductData();
        }
    }, [id]);

    useEffect(() => {
        if (productDetails.img instanceof File) {
            const objectUrl = URL.createObjectURL(productDetails.img);
            setPreview(objectUrl); // ✅ Set preview correctly

            return () => URL.revokeObjectURL(objectUrl); // ✅ Cleanup on unmount
        } else {
            setPreview(""); // Reset preview if img is invalid
        }
    }, [productDetails.img]);




    const getSingleProductData = async () => {
        try {
            if (id) {
                const result = await getSingleProduct(id);
                if (result.status === 200) {
                    setProductDetails(result.data);
                }
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = async () => {
        const { title, description, price, img, category, rating } = productDetails;
        if (title && description && price && img && category && rating) {
            const reqBody = new FormData();
            reqBody.append("title", title);
            reqBody.append("description", description);
            reqBody.append("price", price);
            reqBody.append("category", category);
            reqBody.append("rating", rating);
            reqBody.append("img", img);
            const reqHeader = {
                "Content-Type": "multipart/form-data",
            };
            try {
                const result = await addNewJob(reqBody, reqHeader);
                if (result.status === 200) {
                    alert("Product added successfully");
                    setProductDetails({
                        title: "",
                        description: "",
                        price: "",
                        img: "",
                        category: "",
                        rating: ""
                    });
                    setPreview("");
                } else {
                    alert(result.response.data);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Please fill the form completely");
        }
    };

    const handleUpdate = async () => {
        const { title, description, price, img, category, rating } = productDetails;
        if (!title || !description || !price || !img || !category || !rating) {
            alert("Please fill the form completely");
            return;
        }
        if (!id) {
            alert("Invalid product ID");
            return;
        }
        try {
            const reqBody = new FormData();
            reqBody.append("title", title);
            reqBody.append("description", description);
            reqBody.append("price", price);
            reqBody.append("category", category);
            reqBody.append("rating", rating);
            if (img instanceof File) {
                reqBody.append("img", img);
            }
            const result = await updateSingleProduct(id, reqBody);
            if (result.status === 200) {
                alert("Product Updated successfully");
                getSingleProductData();
            } else {
                alert(result.response?.data || "Failed to update product");
            }
        } catch (error) {
            console.error("Update failed:", error);
            alert("Something went wrong, check console for details.");
        }
    };


    return (
        <>
            <Navbar />
            <div className={styles.productCard}>
                <div className={styles.container}>
                    <div className={styles.productImage}>
                        <label>
                            <input
                                onChange={(e) => setProductDetails({ ...productDetails, img: e.target.files[0] })}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            {
                                editJob ?
                                    <img
                                        height={'200px'}
                                        className='img-fluid'
                                        src={`${serverUrl}/uploads/${productDetails.img}` ? `${serverUrl}/uploads/${productDetails.img}` : `https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg`}
                                        alt="Product"
                                    />
                                    :
                                    <img
                                        height={'200px'}
                                        className='img-fluid'
                                        src={preview ? preview : `https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg`}
                                        alt="Product"
                                    />
                            }
                        </label>
                    </div>
                    <div className={styles.productInfo}>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={productDetails.title}
                            onChange={handleChange}
                            className={styles.productTitle}
                            placeholder="Enter title"
                        />
                        <label>Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={productDetails.description}
                            onChange={handleChange}
                            className={styles.productDescription}
                            placeholder="Enter description"
                        />
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={productDetails.category}
                            onChange={handleChange}
                            className={styles.productCategory}
                            placeholder="Enter category"
                        />
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={productDetails.price}
                            onChange={handleChange}
                            className={styles.productPrice}
                            placeholder="Enter price"
                        />

                        <label>Rating:</label>
                        <input
                            type="number"
                            name="rating"
                            value={productDetails.rating}
                            onChange={handleChange}
                            min="1"
                            max="5"
                            className={styles.productRating}
                            placeholder="Enter rating (1-5)"
                        />
                        <button
                            onClick={editJob ? handleUpdate : handleAddProduct}
                            className={styles.button}
                        >
                            {editJob ? "Update Product" : "Post"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
