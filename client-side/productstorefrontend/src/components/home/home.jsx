import './home.css';
import React, { useEffect, useState } from "react";
import { fetchProducts } from '../../api/products';
import { Link } from 'react-router-dom';
const Home = () => {

    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [filters, setFilters] = useState({
        category_name: '',
        SKU: '',
        price: '',
        created_date: '',
        name: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchProducts(searchQuery);
            setProducts(response.data);
        };

        fetchData();
    }, [searchQuery]);


    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            try {
                const response = await fetchProducts('', filters);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchFilteredProducts();
    }, [filters]); 

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };
    return (


        <div className="container my-3">

        <div className="  ">
           
            <label>Filter :</label>
            <div className="d-flex">
            <input className='form-control m-3' type="text" name="category_name" placeholder="Category Name" onChange={handleFilterChange} />
            <input className='form-control m-3' type="text" name="SKU" placeholder="SKU" onChange={handleFilterChange} />
            <input className='form-control m-3' type="number" name="price" placeholder="Price" onChange={handleFilterChange} />
            <input className='form-control m-3' type="date" name="created_date" placeholder="Created Date" onChange={handleFilterChange} />
            </div>
        </div>


            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group my-3 ">
                        <label>Search :</label>
                        <input type="text" placeholder='search For Name' className='form-control' onChange={handleInputChange} />
                      
                    </div>
                </div>
            </div>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">SKU</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Price in Store A</th>
                        <th scope="col">Price in Store B</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>

                    {products.length > 0 ?(
                    
                    products.map(product => (

                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.SKU}</td>
                            <td>{product.category.name}</td>
                            <td>{product.price}</td>
                            <td>{product.price * (1 + product.category.B_percentage / 100)}</td>
                            <td>{product.description}</td>
                        </tr>
                    ))):(
                        <tr>
                        <td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                            No products found
                        </td>
                    </tr>
                    )}

                </tbody>
                <Link to="/product" className="btn btn-primary addBtn ">Add Product</Link>
            </table>
        </div>
    );

}

export default Home;