import React from "react";
import { TbCurrencyRupee } from "react-icons/tb";
import styled from "styled-components";

function Receipt_student({}) {
  const receiptBgColor = "bg-red-600";
  const receiptTextColor = "text-red-600";

  return (
    <ReceiptMainDiv
      className={`border-4 rounded-3xl border-red-600 mx-auto mt-4`}
    >
      <div className="p-5">
        <div className="flex justify-between">
          <img src="/images/logo.png" style={{ maxWidth: "250px" }} alt="" />
          <div className={`${receiptTextColor} w-48 font-bold`}>
            <p>
              E-35, Sumel-8, Safal Market, Nr. Ajit Mill Char Rasta, Rakhial,
              Ahmedabad.
            </p>
            <p className="pt-2">Mobile: 8747382919</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-5">
          <div
            className={`${receiptBgColor} w-26 rounded-md flex justify-center items-center`}
          >
            <p className="text-sm text-white  py-1 px-2 ">STUDENT RECEIPT</p>
          </div>
          <div>
            <p className={`${receiptTextColor} font-bold`}>
              Receipt No: <span className="text-black">03</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-5">
          <div>
            <p className={`${receiptTextColor} font-bold italic`}>
              Stream: <span className="text-black">Commerce</span>
            </p>
          </div>
          <div>
            <p className={`${receiptTextColor} font-bold italic`}>
              Date: <span className="text-black">07 / 08 / 22</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-5">
          <div>
            <p className={`${receiptTextColor} font-bold italic`}>
              Roll No: <span className="text-black">01</span>
            </p>
          </div>
          <div>
            <p className={`${receiptTextColor} font-bold italic`}>
              class: <span className="text-black">9th</span>
            </p>
          </div>
          <div>
            <p className={`${receiptTextColor} font-bold italic`}>
              Batch: <span className="text-black">2022-23</span>
            </p>
          </div>
        </div>
        <div className="mt-5">
          <p className={`${receiptTextColor} font-bold italic`}>
            Name: <span className="text-black">Nasir Sir</span>
          </p>
        </div>
        <div className="mt-5">
          <p className={`${receiptTextColor} font-bold italic`}>
            The sum of Rupees:{" "}
            <span className="text-black">Twenty Six Thousand</span>
          </p>
        </div>
        <div className="mt-5">
          <p className={`${receiptTextColor} font-bold italic`}>
            by Cash/UPI/Cheque No: <span className="text-black">676899</span>{" "}
          </p>
        </div>
        <div className="flex justify-between items-center mt-5">
          <div className="flex flex-col">
            <div className=" relative flex justify-center items-center">
              <div className="absolute left-0 rounded-full border-2 border-red-600">
                <div
                  className={`w-12 h-12 rounded-full border-2 border-white ${receiptBgColor} flex justify-center items-center`}
                  style={{ marginTop: "-0.4px" }}
                >
                  <TbCurrencyRupee className="font-bold text-3xl text-white" />
                </div>
              </div>
              <div className="border-2 border-red-600 rounded-full ml-2">
                <input
                  type="text"
                  className="w-48 h-10 border-2 p-2 pl-14 border-red-600 rounded-full text-2xl font-bold"
                  disabled
                  value="25000/-"
                  style={{ margin: "1px" }}
                />
              </div>
            </div>
            <div className="pt-2">
              <p className={`${receiptTextColor} font-bold text-sm ml-1 mt-3`}>
                Admin: <span className="text-black">xyz</span>
              </p>
            </div>
          </div>
          <div>
            <p className={`${receiptTextColor} font-bold`}>
              Signature with stamp
            </p>
          </div>
        </div>
      </div>
    </ReceiptMainDiv>
  );
}

const ReceiptMainDiv = styled.div`
  max-width: 700px;
  position: relative;
  &:before {
    content: "";
    background: url("/images/logo.png");
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
  }
`;

export default Receipt_student;
