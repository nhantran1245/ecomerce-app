import React, { useState, useRef } from "react";
import { numberToVND } from "../../../../services/utils/common";
import { collection, addDoc  } from "firebase/firestore"; 
import { db } from "../../../../services/firebase/firebase";
import { Alert } from "bootstrap";

export default function ShowCartModal(props) {
  const { onClose, itemsInCart, setItemsInCart } = props;
  const customerNameRef = useRef();
  const customerEmailRef = useRef();
  const customerPhoneRef = useRef();
  const customerAddressRef = useRef();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccessfull, setOrderSuccessfull] = useState(false);

  const handleChecked = (index) => {
    const tempListItems = [...itemsInCart];
    tempListItems[index].isChecked = !tempListItems[index].isChecked;
    setItemsInCart(tempListItems);
  }

  const handleChangQuantity = (e, index, isIncreased) => {
    e.preventDefault();
    const tempListItems = [...itemsInCart];
    if (isIncreased) {
      tempListItems[index].quantity = parseInt(tempListItems[index].quantity) + 1;
    } else {
      tempListItems[index].quantity -= 1;
    }
    setItemsInCart(tempListItems);
  }

  const hanldeRemoveFromList = (e, index) => {
    e.preventDefault();
    const tempListItems = [...itemsInCart];
    tempListItems.splice(index, 1);
    setItemsInCart(tempListItems);
  }

  const isHaveCheckedItem = itemsInCart && itemsInCart.some(item => item.isChecked);

  const handleOrder = async (e) => {
    e.preventDefault();
    //TODO: validation
    const errorsObj = {};
    const customerNameValue = customerNameRef.current.value;
    const customerEmailValue = customerEmailRef.current.value;
    const validateEmail = (value) => {
      //Initializing Regex for Email
      const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      return re.test(value);
    }
    const customerPhoneValue = customerPhoneRef.current.value;
    // const validatePhoneNumber = (value) => {
    //   const re = /[a-zA-Z`~!@#$%^&*(){}\[\]|\\;:'"<>,.?/ ]/;
    //   return re.test(value);
    // }
    const customerAddressValue = customerAddressRef.current.value;
    let haveErrors = false;
    if (!customerNameValue || customerNameValue === "") {
      errorsObj.customerName = "Vui lòng nhập tên";
      haveErrors = true;
    }
    if (!customerEmailValue || !validateEmail(customerEmailValue)) {
      errorsObj.customerEmail = "Vui lòng nhập đúng email";
      haveErrors = true;
    }
    if (!customerPhoneValue || customerPhoneValue === "") {
      errorsObj.customerPhone = "Vui lòng nhập đúng số điện thoại";
      haveErrors = true;
    }
    if (!customerAddressValue || customerAddressValue === "") {
      errorsObj.customerAddress = "Vui lòng nhập địa chỉ";
      haveErrors = true;
    }
    setErrors(errorsObj);
    if (!haveErrors) {
      const data = {
        orderedProduct: itemsInCart.map(item => {
          delete item.isChecked;
          return item;
        }),
        customerName: customerNameRef.current.value,
        customerEmail: customerEmailRef.current.value,
        customerPhone: customerPhoneRef.current.value,
        customerAddress: customerAddressRef.current.value,
      };
      setIsLoading(true);
      await addDoc(collection(db, "orders"), data);
      setIsLoading(false);
      setOrderSuccessfull(true);
      setItemsInCart([]);
    }
  }

  return (
    <div 
      className="ShowCartModal modal"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Giỏ hàng
            </h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => onClose()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {itemsInCart.length >=1 ? 
              <>
                {itemsInCart.map((item, index) => {
                  const { product : { isSale, image, productName, originalCost, promoteCost }, quantity, isChecked } = item;
                  return (
                    <div className="row product-details-row" key={index}>
                      <div className="col-md-1">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`product${index}checkbox`}
                            defaultChecked={isChecked}
                            onChange={() => handleChecked(index)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 row">
                        <div className="col-md-5 product-img">
                          <img 
                            src={image}
                            className="img-fluid"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-7 product-info">
                          <p className="text">{productName}</p>
                          <p className="text product-cost">
                            <small className="text-muted">
                              {isSale ? 
                                <p>
                                  <span className="text-danger text-decoration-line-through">{numberToVND(originalCost)}</span><br/>
                                  {numberToVND(promoteCost)}
                                </p>
                                : numberToVND(originalCost)
                              }
                            </small>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3 text-right quantity-col">
                        <p className="text">
                          <button
                            className="quantity-adjust-button btn btn-muted"
                            onClick={(e) => handleChangQuantity(e, index, false)}
                            disabled={quantity === 1}
                          >
                            <i className="fa fa-minus"></i>
                          </button>  
                          <small className="text-muted">&nbsp;{quantity}&nbsp;</small>
                          <button
                            className="quantity-adjust-button btn btn-muted"
                            onClick={(e) => handleChangQuantity(e, index, true)}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </p>
                      </div>
                      <div className="col-md-2">
                        <p className="text-right">{numberToVND(isSale ? promoteCost*quantity : originalCost*quantity)}</p>  
                      </div>
                      <div className="col-md-2 text-right">
                        <button
                          className="btn btn-outline-danger"
                          onClick={(e) => hanldeRemoveFromList(e, index)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  )
                })}
                <div className="row sumary-info">
                  <div className="col-md-1"></div>
                  <div className="col-md-4 row"></div>
                  <div className="col-md-3 text-right">
                    Tổng:
                  </div>
                  <div className="col-md-2 text-right">
                    <p>
                      {numberToVND(itemsInCart.reduce((a, b) => {
                        if (b.isChecked) {
                          return a + b.quantity*(b.product.isSale ? b.product.promoteCost : b.product.originalCost);
                        } else {
                          return a;
                        }
                      }, 0))}
                    </p>
                  </div>
                  <div className="col-md-2"></div>
                </div>
                <form className="customerInfoForm">
                  <div className="row">
                    <div className="col-md-8">
                      <label htmlFor="customerName">
                        Họ tên khách hàng
                      </label>
                      <input 
                        type="text"
                        ref={customerNameRef}
                        className="form-control"
                        id="customerName"
                        placeholder="Họ tên"
                        aria-describedby="customerNameHelp"
                        onBlur={(e) => {
                          e.preventDefault();
                          //validation if have
                        }}
                      />
                      {errors && errors.customerName && (
                        <small
                          id="customerNameHelp"
                          className="form-text text-danger"
                        >
                          {errors.customerName}
                        </small>
                      )}
                    </div>
                    <div className="col-md-7">
                      <label htmlFor="customerEmail">
                        Email
                      </label>
                      <input 
                        type="text"
                        ref={customerEmailRef}
                        className="form-control"
                        id="customerEmail"
                        placeholder="Email"
                        aria-describedby="customerEmailHelp"
                        onBlur={(e) => {
                          e.preventDefault();
                          //validation if have
                        }}
                      />
                      {errors && errors.customerEmail && (
                        <small
                          id="customerEmailHelp"
                          className="form-text text-danger"
                        >
                          {errors.customerEmail}
                        </small>
                      )}
                    </div>
                    <div className="col-md-5">
                      <label htmlFor="customerPhone">
                        Số điện thoại
                      </label>
                      <input 
                        type="text"
                        ref={customerPhoneRef}
                        className="form-control"
                        id="customerPhone"
                        placeholder="Số điện thoại"
                        aria-describedby="customerPhoneHelp"
                        onBlur={(e) => {
                          e.preventDefault();
                          //validation if have
                        }}
                      />
                      {errors && errors.customerPhone && (
                        <small
                          id="customerPhoneHelp"
                          className="form-text text-danger"
                        >
                          {errors.customerPhone}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="customerAddress">
                      Địa chỉ
                    </label>
                    <textarea
                      ref={customerAddressRef}
                      className="form-control"
                      id="customerAddress"
                      rows="2"
                      onBlur={(e) => {
                        e.preventDefault();
                        //validation if have
                      }}
                    />
                    {errors && errors.customerAddress && (
                      <small
                        id="customerAddressHelp"
                        className="form-text text-danger"
                      >
                        {errors.customerAddress}
                      </small>
                    )}
                  </div>
                </form>
              </>
              : orderSuccessfull ? (
                <Alert
                  type={"success"}
                  text={"Dặt hàng thành công! Quý khách vui lòng kiểm tra email"}
                />
              )
                : "Bạn chưa có sản phẩm nào trong giỏ hàng"}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => handleOrder(e)}
              disabled={!isHaveCheckedItem || isLoading}
            >
              Thêm <i className="bi-cart-fill me-1"/>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onClose()}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
