import React, { useState } from "react";
import ShowCartModal from "../modals/ShowCartModal";
import "./styles.scss";

export default function Navigation(props) {
  const [isShowCartModal, setIsShowCartModal] = useState(false);
  const { itemsInCart, setItemsInCart } = props;
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light AppNavbar">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="/">
            Start Bootstrap
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                About
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  href="/"
                >
                Shop
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/">
                      All Products
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                        Popular Items
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                        New Arrivals
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <button 
              className="btn btn-outline-dark"
              onClick={() => setIsShowCartModal(true)}
            >
              <i className="bi-cart-fill me-1" />
              Giỏ hàng 
              <span className="badge bg-dark text-white ms-1 rounded-pill">{itemsInCart.length}</span>
            </button>
          </div>
        </div>
      </nav>
      {isShowCartModal ? 
        <ShowCartModal 
          itemsInCart={itemsInCart}
          onClose={() => setIsShowCartModal(false)}
          setItemsInCart={setItemsInCart}
        /> : null}
    </>
  )
}
