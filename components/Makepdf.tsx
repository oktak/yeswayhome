import React, {useRef, useState, useEffect} from "react"
import Link from "next/link"
import Image from "next/image"
import Layout, { siteTitle } from '../components/layout'

import ReactToPdf from "react-to-pdf";

const ref = React.createRef();

const myLoader = ({ src, width }: any) => {
  return `${process.env.customAssetPath}${src}`
}
/**
 * TODO: switch to use: https://www.npmjs.com/package/@react-pdf/renderer
 */
export const Makepdf = ({
  pay,
  headCount,
  headCountExtend,
  monthlyIncome,
  monthlyExpense,
}: any) => {
  const options = {
    orientation: "portrait",
    unit: "in",
    format: [8.25, 11.75]
  };


  return (<div>
    <ReactToPdf
      targetRef={ref}
      filename="paywayhome-report.pdf"
      options={options}
      x={0} y={0} scale={1}>
      {({toPdf}: any) => (
        <button
          className="px-4 py-2 font-bold text-white bg-indigo-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          // type="submit"
          onClick={toPdf}
        >
          Get the report in PDF
        </button>
      )}
    </ReactToPdf>
    
    <div className="PdfContainer my-4 h-0 overflow-hidden">
      <div
        className=""
        style={{
          // "transform": " scale(0.3)",
          // "transformOrigin": "0 0",
        }}
      >
        <div
          className="p-16 bg-gray-100"
          style={{
            "width": "8.25in"
          }}
          ref={ref as React.RefObject<HTMLDivElement>}
        >
          <Image width={160} height={160} src="/default-thumb.png" loader={myLoader} alt="logo" />
          <h1 style={{"fontSize": "56pt"}}>{siteTitle}</h1>
          <p className="">Have to pay</p>
          <p className="mb-6 text-2xl">USD$ {pay} per month.</p>
          <hr />

          <div className="p-4 pb-8 flex flex-col justify-center bg-gray-50">
            <p className="p-2 font-bold">Your situation</p>
            <table className="w-4/5 m-auto text-center">
              <thead>
                <tr>
                  <th className="p-2 border">Field</th>
                  <th className="p-2 border">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">headCount</td>
                  <td className="p-2 border">{"" + headCount}</td>
                </tr>
                <tr>
                  <td className="p-2 border">headCountExtend</td>
                  <td className="p-2 border">{"" + headCountExtend}</td>
                </tr>
                <tr>
                  <td className="p-2 border">monthlyIncome</td>
                  <td className="p-2 border">{"" + monthlyIncome}</td>
                </tr>
                <tr>
                  <td className="p-2 border">monthlyExpense</td>
                  <td className="p-2 border">{"" + monthlyExpense}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>)
}
