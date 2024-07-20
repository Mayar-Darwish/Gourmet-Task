import './product.css';
import React, { useEffect, useState } from "react";
import { addProduct, fetchCategories } from '../../api/products';
import { useNavigate } from 'react-router-dom';

const Product = () => {

    const [form, setForm] = useState({
        name: '',
        price: '',
        SKU: '',
        description: '',
        category_id: ''
    });

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch categories for the dropdown
        fetchCategories().then(response => {
            setCategories(response.data);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(form)
            .then(response => {
                
                setForm({
                    name: '',
                    price: '',
                    SKU: '',
                    description: '',
                    category_id: ''
                });
                navigateHome();
            })
            .catch(error => {
                console.error('There was an error adding the product!', error);
            });
    };
    const navigateHome = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <form className='mx-auto my-4 w-50  border p-5' onSubmit={handleSubmit}  >
                <div className="form-group mb-5">
                    <label>Name:</label>
                    <input className="form-control mt-3" type="text" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group mb-5">
                    <label>Price:</label>
                    <input className="form-control mt-3" type="number" name="price" value={form.price} onChange={handleChange} required />
                </div>
                <div className="form-group mb-5">
                    <label>SKU:</label>
                    <input className="form-control mt-3" type="text" name="SKU" value={form.SKU} onChange={handleChange} required />
                </div>
                <div className="form-group mb-5">
                    <label>Description:</label>
                    <textarea className="form-control mt-3" name="description" value={form.description} onChange={handleChange} required></textarea>
                </div>
                <div className="form-group mb-5">
                    <label>Category:</label>
                    <select className="form-control mt-3" name="category_id" value={form.category_id} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <button className='btn btn-primary' type="submit">Add Product</button>
            </form>
        </div>
    )

}

export default Product;