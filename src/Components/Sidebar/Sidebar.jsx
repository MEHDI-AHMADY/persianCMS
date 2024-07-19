import React from "react";
import "./Sidebar.css";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { CiDollar } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  let location = useLocation();
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">به داشبورد خود خوش آمدید</h1>

      <ul className="sidebar-links">
        <li className={`${location.pathname === "/" ? "active" : ""}`}>
          <Link to="/">
            <IoHomeOutline />
            صفحه اصلی
          </Link>
        </li>
        <li className={`${location.pathname === "/products" ? "active" : ""}`}>
          <Link to="/products">
            <MdOutlineProductionQuantityLimits />
            محصولات
          </Link>
        </li>
        <li className={`${location.pathname === "/users" ? "active" : ""}`}>
          <Link to="/users">
            <FaRegUser />
            کاربران
          </Link>
        </li>
        <li className={`${location.pathname === "/orders" ? "active" : ""}`}>
          <Link to="/orders">
            <MdOutlineShoppingCart />
            سفارشات
          </Link>
        </li>
        <li className={`${location.pathname === "/comments" ? "active" : ""}`}>
          <Link to="/comments">
            <FaCommentDots />
            کامنت ها
          </Link>
        </li>
        <li className={`${location.pathname == "/offs" ? "active" : ""}`}>
          <Link to="/offs">
            <CiDollar />
            تخفیفات
          </Link>
        </li>
      </ul>
    </div>
  );
}
