import React, { useEffect, useState } from "react";
import "./AddNewProduct.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddNewProduct({ fetchProducts }) {
  const initialProductState = {
    title: "",
    price: "",
    count: "",
    img: "",
    popularity: "",
    sale: "",
    colors: "",
  };

  const [newProduct, setNewProduct] = useState(initialProductState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addNewProductHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:3000/api/products",
      newProduct
    );
    
    if (res.status === 200) {
      toast("محصول با موفقیت اضافه شد");
      setNewProduct(initialProductState);
    } else {
      toast("دقایقی دیگر دوباره امتحان کنید");
    }

    fetchProducts();
  };

  return (
    <div className="product-main">
      <h1 className="products-title">افزودن محصول جدید</h1>

      <div>
        <form className="add-products-form" onSubmit={addNewProductHandler}>
          <div className="add-products-form-wrapper">
            <div className="add-products-form-group">
              <input
                type="text"
                name="title"
                placeholder="اسم محصول را بنویسید"
                className="add-products-input"
                value={newProduct.title}
                onChange={handleChange}
              />
            </div>
            <div className="add-products-form-group">
              <input
                type="text"
                name="price"
                placeholder="قیمت محصول را بنویسید"
                className="add-products-input"
                value={newProduct.price}
                onChange={handleChange}
              />
            </div>
            <div className="add-products-form-group">
              <input
                type="text"
                name="count"
                placeholder="موجودی محصول را بنویسید"
                className="add-products-input"
                value={newProduct.count}
                onChange={handleChange}
              />
            </div>
            <div className="add-products-form-group">
              <input
                type="text"
                name="img"
                placeholder="آدرس عکس محصول را بنویسید"
                className="add-products-input"
                value={newProduct.img}
                onChange={handleChange}
              />
            </div>
            <div className="add-products-form-group">
              <input
                type="text"
                name="popularity"
                placeholder="میزان محبوبیت محصول را بنویسید"
                className="add-products-input"
                value={newProduct.popularity}
                onChange={handleChange}
              />
            </div>
            <div className="add-products-form-group">
              <input
                type="text"
                name="sale"
                placeholder="میزان فروش محصول را بنویسید"
                className="add-products-input"
                value={newProduct.sale}
                onChange={handleChange}
              />
            </div>
            <div className="add-products-form-group">
              <input
                type="text"
                name="colors"
                placeholder="تعداد رنگ بندی محصول را بنویسید"
                className="add-products-input"
                value={newProduct.colors}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="admin-product-btn" type="submit">
            ثبت محصول
          </button>
        </form>
      </div>
    </div>
  );
}
