import React, { useRef } from "react";
import "./styles.scss";

export default function AddToCardModal(props) {
  const { onClose, selectedProduct, onSave } = props;
  const { image, productName } = selectedProduct;
  const quantityRef = useRef();

  const handleAddToCart = (e) => {
    e.preventDefault();
    onSave({
      product: selectedProduct,
      quantity: quantityRef.current.value,
      isChecked: false,
    });
  }
  return (
    <div 
      className="AddToCartModal modal"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Thêm sản phẩm vào giỏ hàng
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
            <div className="row">
              <div className="col-md-6">
                <img 
                  src={image}
                  className="img-fluid"
                  alt="..."
                />
              </div>
              <div className="col-md-6">
                <h5>{productName}</h5>
                <form>
                  <div className="form-group product-quantity">
                    <label htmlFor="productQuantity">Chọn số lượng</label>
                    <select 
                      className="form-control" 
                      id="productQuantity"
                      ref={quantityRef}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => handleAddToCart(e)}
            >
              Thêm <i className="bi-cart-fill me-1" />
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
