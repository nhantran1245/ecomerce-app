import React from "react";
import { numberToVND } from "../../../../services/utils/common";

export default function ProductItem(props) {
  const { product,  onSelected } = props;
  const { isSale, productName, image, originalCost, promoteCost } = product;
  return (
    <div className="col mb-5">
      <div className="card h-100">
        {isSale ? (<div
          className="badge bg-dark text-white position-absolute"
          style={{ top: "0.5rem", right: "0.5rem" }}
        >
          Sale
        </div>) : null}
        <img
          className="card-img-top"
          src={image}
          alt="..."
        />
        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder">{productName}</h5>
            {isSale ? (
              <>
                <span className="text-muted text-decoration-line-through">{numberToVND(originalCost)}</span>
                <br/>
                {numberToVND(promoteCost)}
              </>
            ) : numberToVND(originalCost)}
            
          </div>
        </div>
        {/* Product actions*/}
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <button className="btn btn-outline-dark mt-auto" onClick={(e) => onSelected(product)}>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
