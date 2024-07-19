import React, { useState } from "react";
import "./ProductsTable.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import DetailModal from "../DetailModal/DetailModal";
import EditModal from "../EditModal/EditModal";
import { AiOutlineDollarCircle } from "react-icons/ai";
import ErrorBox from "../ErrorBox/ErrorBox.jsx";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProductsTable({ allProducts, fetchProducts }) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [productID, setProductID] = useState(null);
  const [mainProductInfos, setMainProductInfos] = useState({});

  const [productNewTitle, setProductNewTitle] = useState("");
  const [productNewPrice, setProductNewPrice] = useState("");
  const [productNewCount, setProductNewCount] = useState("");
  const [productNewImg, setProductNewImg] = useState("");
  const [productNewPopularity, setProductNewPopularity] = useState("");
  const [productNewSale, setProductNewSale] = useState("");
  const [productNewColors, setProductNewColors] = useState("");

  const deleteModalCancelAction = () => {
    setIsShowDeleteModal(false);
  };

  const deleteModalSubmitAction = async () => {
    const res = await axios.delete(
      `http://localhost:3000/api/products/${productID}`
    );

    setIsShowDeleteModal(false);

    if (res.status === 200) {
      toast("محصول با موفقیت حذف شد", {
        position: "top-center",
      });
    } else {
      toast("بعد از 5 ثانیه دوباره امتحان کنید", {
        position: "top-center",
      });
    }
    fetchProducts();
  };

  const closeDetailsModal = () => {
    setIsShowDetailModal(false);
  };

  const updateProductInfos = async (e) => {
    e.preventDefault();

    let newProductInfo = {
      title: productNewTitle,
      price: productNewPrice,
      count: productNewCount,
      img: productNewImg,
      popularity: productNewPopularity,
      sale: productNewSale,
      colors: productNewColors,
    };

    const res = await axios.put(
      `http://localhost:3000/api/products/${productID}`,
      newProductInfo
    );
    if (res.status === 200) {
      toast("محصول با موفقیت ادیت شد", {
        className: "custom-success-bg",
      });
    } else {
      toast("اشتباهی رخ داده.چند ثانیه بعد دوباره امتحان کنید", {
        className: "custom-failed-bg",
      });
    }
    fetchProducts();
    setIsShowEditModal(false);
  };

  return (
    <>
      {allProducts.length ? (
        <table className="products-table">
          <thead>
            <tr className="products-table-heading-tr">
              <th>عکس</th>
              <th>اسم</th>
              <th>قیمت</th>
              <th>موجودی</th>
            </tr>
          </thead>

          <tbody>
            {allProducts.map((product) => {
              return (
                <tr key={product.id} className="products-table-tr">
                  <td>
                    <img
                      src={product.img}
                      alt={product.title}
                      className="products-table-img"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.price} تومان</td>
                  <td>{product.count}</td>
                  <td>
                    <button
                      className="products-table-btn"
                      onClick={() => {
                        setIsShowDetailModal(true);
                        setMainProductInfos(product);
                      }}
                    >
                      جزییات
                    </button>
                    <button
                      className="products-table-btn"
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        setProductID(product.id);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      className="products-table-btn"
                      onClick={() => {
                        setIsShowEditModal(true);
                        setProductID(product.id);
                        setProductNewTitle(product.title);
                        setProductNewPrice(product.price);
                        setProductNewCount(product.count);
                        setProductNewImg(product.img);
                        setProductNewPopularity(product.popularity);
                        setProductNewSale(product.sale);
                        setProductNewColors(product.colors);
                      }}
                    >
                      ویرایش
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <ErrorBox />
      )}

      {isShowDeleteModal && (
        <DeleteModal
          title="آیا از حذف اطمینان دارید؟"
          deleteModalCancelAction={deleteModalCancelAction}
          deleteModalSubmitAction={deleteModalSubmitAction}
        />
      )}
      {isShowDetailModal && (
        <DetailModal onHide={closeDetailsModal}>
          <table className="cms-table">
            <thead>
              <tr>
                <th>محبوبیت</th>
                <th>فروش</th>
                <th>رنگ بندی</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{mainProductInfos.popularity}</td>
                <td>
                  {mainProductInfos.sale
                    .toString()
                    .split("")
                    .reverse()
                    .map((digit, index) => {
                      return index != 0 && index % 3 === 0
                        ? `${digit},`
                        : digit;
                    })
                    .reverse()
                    .join("")}
                </td>
                <td>{mainProductInfos.colors}</td>
              </tr>
            </tbody>
          </table>
        </DetailModal>
      )}
      {isShowEditModal && (
        <EditModal
          onClose={() => setIsShowEditModal(false)}
          onSubmit={updateProductInfos}
        >
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="عنوان جدید را وارد کنید"
              className="edit-product-input"
              value={productNewTitle}
              onChange={(e) => setProductNewTitle(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="مبلغ جدید را وارد کنید"
              className="edit-product-input"
              value={productNewPrice}
              onChange={(e) => setProductNewPrice(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="موجودی جدید را وارد کنید"
              className="edit-product-input"
              value={productNewCount}
              onChange={(e) => setProductNewCount(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="آدرس کاور جدید را وارد کنید"
              className="edit-product-input"
              value={productNewImg}
              onChange={(e) => setProductNewImg(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder=" محبوبیت جدید را وارد کنید"
              className="edit-product-input"
              value={productNewPopularity}
              onChange={(e) => setProductNewPopularity(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder=" میزان فروش جدید را وارد کنید"
              className="edit-product-input"
              value={productNewSale}
              onChange={(e) => setProductNewSale(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder=" تعداد رنگ بندی جدید را وارد کنید"
              className="edit-product-input"
              value={productNewColors}
              onChange={(e) => setProductNewColors(e.target.value)}
            />
          </div>
        </EditModal>
      )}
    </>
  );
}
