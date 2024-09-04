    // src/pages/Products.js
    import React, { useState, useEffect } from 'react';
    import Navbar from '../components/navbar';
    import ProductForm from '../components/Prodectform';
    import ProductList from '../components/prodectlist';
    import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/prodectService';

    const Products = () => {
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
        const productsData = await getProducts();
        setProducts(productsData);
        };

        fetchProducts();
    }, []);

    const handleAddProduct = async (product) => {
        await addProduct(product);
        setProducts(await getProducts());
    };

    const handleUpdateProduct = async (id, updatedProduct) => {
        await updateProduct(id, updatedProduct);
        setProducts(await getProducts());
    };

    const handleDeleteProduct = async (id) => {
        await deleteProduct(id);
        setProducts(await getProducts());
    };

    return (
        <div className='text-center'>
        <Navbar />
        <h1>Manage Products</h1>
        <ProductForm onAdd={handleAddProduct} onUpdate={handleUpdateProduct} currentProduct={currentProduct} />
        <ProductList products={products} onEdit={setCurrentProduct} onDelete={handleDeleteProduct} />
        </div>
    );
    };

    export default Products;
