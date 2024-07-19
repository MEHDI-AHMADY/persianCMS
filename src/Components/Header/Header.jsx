import React from "react";
import "./Header.css";
import { FaBell } from "react-icons/fa";
import { CiBrightnessUp } from "react-icons/ci";

export default function Header() {
  return (
    <header className="header">
      <div className="admin-profile">
        <img src="./img/pic3.jpg" alt="admin profile" />

        <div>
          <h1>مهدی احمدی</h1>
          <h3>Frontend developer</h3>
        </div>
      </div>

      <div className="header-left-section">
        <div className="search-box">
          <input type="text" placeholder="جستجو ..." />
          <button>جستجو</button>
        </div>

        <button className="header-left-icon">
          <FaBell />
        </button>
        <button className="header-left-icon">
          <CiBrightnessUp />
        </button>
      </div>
    </header>
  );
}
