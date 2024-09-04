import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../services/firebaseconfig';

const ProductForm = ({ onAdd, onUpdate, currentProduct }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    colors: [],
    sizes: [], // Updated to hold multiple sizes
    imageUrl: '',
    stock: 0,
    price: 0,
    category: '', // Added category
  });
  const [imageFile, setImageFile] = useState(null);
  const [newColor, setNewColor] = useState('#000000');
  const [newSize, setNewSize] = useState('S'); // Default size
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentProduct) {
      setProduct(currentProduct);
    }
  }, [currentProduct]);

  const handleImageUpload = async () => {
    if (!imageFile) return '';

    const imageRef = ref(storage, `products/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    return getDownloadURL(imageRef);
  };

  const addColor = () => {
    if (!product.colors.includes(newColor)) {
      setProduct({
        ...product,
        colors: [...product.colors, newColor],
      });
    }
    setNewColor('#000000');
  };

  const removeColor = (color) => {
    setProduct({
      ...product,
      colors: product.colors.filter((c) => c !== color),
    });
  };

  const addSize = () => {
    if (!product.sizes.includes(newSize)) {
      setProduct({
        ...product,
        sizes: [...product.sizes, newSize],
      });
    }
  };

  const removeSize = (size) => {
    setProduct({
      ...product,
      sizes: product.sizes.filter((s) => s !== size),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) return; // Prevent double submission
    setUploading(true);
    setError('');

    try {
      const imageUrl = await handleImageUpload();
      const finalProduct = { ...product, imageUrl };

      if (currentProduct) {
        onUpdate(currentProduct.id, finalProduct);
      } else {
        await addDoc(collection(db, 'products'), finalProduct);
        onAdd(finalProduct);
      }

      setProduct({
        name: '',
        description: '',
        colors: [],
        sizes: [],
        imageUrl: '',
        stock: 0,
        price: 0,
        category: '',
      });
      setImageFile(null);
    } catch (error) {
      setError('Failed to add product. Please try again.');
      console.error('Error adding product:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Colors</label>
        <div className="color-picker-container">
          <input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
          />
          <button type="button" onClick={addColor}>Add Color</button>
        </div>
        <div className="selected-colors">
          {product.colors.map((color, index) => (
            <div key={index} className="color-item" style={{ backgroundColor: color }}>
              <span>{color}</span>
              <button type="button" onClick={() => removeColor(color)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Sizes</label>
        <div className="size-picker-container">
          <select value={newSize} onChange={(e) => setNewSize(e.target.value)}>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="XXXL">XXXL</option>
          </select>
          <button type="button" onClick={addSize}>Add Size</button>
        </div>
        <div className="selected-sizes">
          {product.sizes.map((size, index) => (
            <div key={index} className="size-item">
              <span>{size}</span>
              <button type="button" onClick={() => removeSize(size)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          placeholder="Category"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />
      </div>

      <div className="form-group">
        <label>Number in Stock</label>
        <input
          type="number"
          placeholder="Number in Stock"
          value={product.stock}
          onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })}
          required
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" className="submit-button" disabled={uploading}>
        {uploading ? 'Uploading...' : currentProduct ? 'Update' : 'Add'} Product
      </button>
    </form>
  );
};

export default ProductForm;
