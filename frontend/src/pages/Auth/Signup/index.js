import React from "react";
import { useFormik } from "formik";
import validationShema from "./validations";
import { fetchRegister } from "../../../Api";
import { useAuth } from "../../../contexts/AuthContext";

function Signup() {

  const {login} = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationShema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister(values);
        console.log(registerResponse);
        login(registerResponse)
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });

  return (
    <div className="flex justify-center pt-8  h-screen bg-base-200">
    <div className="container mx-auto max-w-md">
    <div className="w-full">
      <h3 className="mb-2 text-center">Merhaba</h3>
      <h5  className="mb-6 text-center">Üye Olun, Alışverişin Keyfini Çıkarın!</h5>



      <form class="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4" onSubmit={formik.handleSubmit}>
      {formik.errors.general && (
        <div role="alert" className="alert alert-error mb-5 rounded-md text-slate-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{formik.errors.general}</span>
        </div>
      )}

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
           E-mail
          </label>
          <input
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="name@flowbite.com"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.onBlur}
            value={formik.values.email}
            isInvalid={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:base-200 focus:border-base-200 block w-full p-2.5 "
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.onBlur}
            value={formik.values.password}
            isInvalid={formik.touched.password && formik.errors.password}
          />
        </div>

        {/* <div className="flex items-start mb-5">
    <div className="flex items-center h-5">
      <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>
    <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
  </div> */}
        <button
          type="submit"
          className="w-full text-white bg-private1 hover:bg-private1Hover focus:ring-4 focus:outline-none focus:ring-bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
        >
          Sing Up
        </button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Signup;

