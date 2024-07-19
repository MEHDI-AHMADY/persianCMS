import React , { useEffect , useState } from 'react'
import axios from 'axios';
import AddNewProduct from '../../Components/AddNewProduct/AddNewProduct'
import ProductsTable from '../../Components/ProductsTable/ProductsTable'

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    await axios.get("http://localhost:3000/api/products").then((res) => {
      const products = res.data;
      setAllProducts(products.reverse());
    });
  };

  return (
    <>
        <AddNewProduct fetchProducts={fetchProducts}/>
        <ProductsTable allProducts={allProducts} fetchProducts={fetchProducts}/>
    </>
  )
}
