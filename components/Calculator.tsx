import React, {useRef, useState, useEffect} from 'react'
import Link from 'next/link'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Makepdf } from "./Makepdf";

interface ParamTypes {
  id: string;
  name: string;
}

type UserType = {
  headCount: number;
  headCountExtend: number;
  monthlyIncome: number;
  monthlyExpense: number;
};

const schema = yup
  .object({
    headCount: yup
      .number()
      .positive()
      .integer()
      .min(1)
      .max(4)
      .required(),
    headCountExtend: yup
      .number()
      .positive()
      .integer()
      .min(0)
      .max(8)
      .required(),
    monthlyIncome: yup
      .number()
      .positive()
      .integer()
      .min(0)
      .max(99999999)
      .required(),
    monthlyExpense: yup
      .number()
      .positive()
      .integer()
      .min(0)
      .max(99999999)
      .required(),
  })
  .required();

function computation (params: any) {
  const {
    headCount,
    headCountExtend,
    monthlyIncome,
    monthlyExpense
  } = params;

  let result = (monthlyIncome - monthlyExpense) / headCount / 10 * headCountExtend
  let resultStr = "";
  try {
    resultStr = parseFloat("" + result).toFixed(1);
  } catch (err) {
    resultStr = "Oops";
  }

  return resultStr
}

const onSubmit = async (data: UserType) => {
  console.log(`Form `, data);
};

const unitOptions = ["USD", "HKD", "RMB", "NTW", "NZD", "BTC"];

export const Calculator = () => {
  const [headCount, setHeadCount] = useState(1);
  const [headCountExtend, setHeadCountExtend] = useState(6);
  const [monthlyIncome, setMonthlyIncome] = useState(1000);
  const [monthlyExpense, setMonthlyExpense] = useState(500);
  const [unit, setUnit] = useState("USD");

  const [pay, setPay] = useState("0");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({
    resolver: yupResolver(schema),
    defaultValues: {
      headCount: 1,
      headCountExtend: 6,
      monthlyIncome: 1000,
      monthlyExpense: 500,
    }
  });

  useEffect(() => {
    let result = computation({
      headCount,
      headCountExtend,
      monthlyIncome,
      monthlyExpense
    });

    setPay(result)
    handleSubmit(onSubmit)
  }, [
    headCount,
    headCountExtend,
    monthlyIncome,
    monthlyExpense,
    handleSubmit
  ]);



  return (
    <>
      {/* <h1 className="w-full p-4 text-2xl font-bold text-indigo-400">
        Title
      </h1> */}

      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full bg-white p-5 rounded-lg lg:rounded-l-none">
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-4 md:flex md:justify-between">
                  <div className="md:w-1/2 mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="headCount"
                    >
                      headCount
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="headCount"
                      type="number"
                      min="1"
                      max="4"
                      placeholder={"" + headCount}
                      {...register("headCount")}
                      onChange={(event) => {
                        setHeadCount(parseInt(event.target.value))
                      }}
                    />
                    <p>{errors.headCount?.message}</p>
                  </div>
                  <div className="md:w-1/2 md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="headCountExtend"
                    >
                      headCountExtend
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="headCountExtend"
                      type="number"
                      min="0"
                      max="8"
                      placeholder={"" + headCountExtend}
                      {...register("headCountExtend")}
                      onChange={(event) => {
                        setHeadCountExtend(parseInt(event.target.value))
                      }}
                    />
                    <p>{errors.headCountExtend?.message}</p>
                  </div>
                </div>


                <div className="mb-4 md:flex md:justify-between">
                  <div className="md:w-1/2 mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="monthlyIncome"
                    >
                      monthlyIncome
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="monthlyIncome"
                      type="number"
                      min="0"
                      placeholder={"" + monthlyIncome}
                      {...register("monthlyIncome")}
                      onChange={(event) => {
                        setMonthlyIncome(parseInt(event.target.value))
                      }}
                    />
                    <p>{errors.monthlyIncome?.message}</p>
                  </div>
                  <div className="md:w-1/2 md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="monthlyExpense"
                    >
                      monthlyExpense
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="monthlyExpense"
                      type="number"
                      min="0"
                      placeholder={"" + monthlyExpense}
                      {...register("monthlyExpense")}
                      onChange={(event) => {
                        setMonthlyExpense(parseInt(event.target.value))
                      }}
                    />
                    <p>{errors.monthlyExpense?.message}</p>
                  </div>
                </div>


                <div>
                  <span>Monetary unit: </span>
                  <select onChange={(event) => setUnit(event.target.value)}>
                    {
                      unitOptions.map((o :any, idx: number) => {
                        return (
                          <option key={idx} value={o}>{o}</option>
                        )
                      })
                    }
                  </select>
                </div>


                <h3>Result:</h3>
                <p>Have to pay: {unit} {pay} per month.</p>

                <hr className="mb-6 border-t" />

                <div className="mb-6 text-center">
                  <Makepdf
                    pay={pay}
                    headCount={headCount}
                    headCountExtend={headCountExtend}
                    monthlyIncome={monthlyIncome}
                    monthlyExpense={monthlyExpense}
                  />
                </div>


                <div className="text-center">
                  <Link href="/">
                    <a
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    >
                      Other reference
                    </a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* {hasError ? (
          <Modal
            setHasError={setHasError}
            msg={"Chosen userid is not available. Please use another one."}
          />
        ) : null} */}
      </div>

  </>)
}
