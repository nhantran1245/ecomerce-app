import React from "react";

const SpecialOffers = ({ specialOffers }) => {
  return (
    <div className="flex flex-col inline-block max-w-sm">
      <div className="border-solid border-[1px] border-sky-500 inline-block p-2 bg-[#439eef] max-w-sm">
        <p className="text-xl block font-semibold text-white text-center">
          <b></b>
          ƯU ĐÃI ĐẶT BIỆT
          <b></b>
        </p>
      </div>
      <div className="border-solid border-[1px] border-sky-600 inline-block p-6 ">
        <div>nguyen minh triet dep trai</div>
        <div>nguyen minh triet dep trai</div>
        <div>nguyen minh triet dep trai</div>
        <div>nguyen minh triet dep trai</div>
      </div>
    </div>
  );
};

export default SpecialOffers;
