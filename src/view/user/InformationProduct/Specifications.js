import React from "react";
const Specifications = ({ Specification }) => {
  const TdStyle = {
    ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-2 px-1 text-lg font-medium text-white lg:py-3 lg:px-4`,
    TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-2 px-2 text-center text-base font-normal`,
    TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-2 px-2 text-center text-base font-medium`,
  };

  return (
    <section className="grow bg-white dark:bg-dark py-20 lg:py-[30px]">
      <div className="">
        <div className="flex justify-start">
          <div className="w-full ">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="text-center bg-primary">
                  <tr>
                    <th className={TdStyle.ThStyle}> </th>
                    <th className={TdStyle.ThStyle}> Duration </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className={TdStyle.TdStyle}>.com</td>
                    <td className={TdStyle.TdStyle2}>1 Year</td>
                  </tr>
                  <tr>
                    <td className={TdStyle.TdStyle}>.com</td>
                    <td className={TdStyle.TdStyle2}>1 Year</td>
                  </tr>
                  <tr>
                    <td className={TdStyle.TdStyle}>.com</td>
                    <td className={TdStyle.TdStyle2}>1 Year</td>
                  </tr>
                  <tr>
                    <td className={TdStyle.TdStyle}>.com</td>
                    <td className={TdStyle.TdStyle2}>1 Year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specifications;
