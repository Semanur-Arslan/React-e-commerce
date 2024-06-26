import React from "react";
import { useFormik } from "formik";
import validationShema from "./validation";
import { fetchLogin } from "../../../Api";
import { useAuth } from "../../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {

  const navigate = useNavigate();
  const {login} = useAuth();
  const [redirectToProduct, setRedirectToProduct] = useState(false); 

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationShema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin(values);

        login(loginResponse);
        setRedirectToProduct(true); 

      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });

  if (redirectToProduct) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="flex justify-center pt-8  h-screen bg-base-200">
    <div className="container mx-auto max-w-md">
    <div className="w-full">
      <h3 className="mb-2 text-center">Hello !</h3>
      <h5  className="mb-6 text-center">Sign In, Enjoy Shopping!</h5>



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

        <button
          type="submit"
          className="w-full text-white btn btn-primary  "
        >
          Sing In
        </button>
      </form>

      <div>
        <p className="text-center">Not a member? <span  className="underline underline-offset-1 cursor-pointer ms-2 text-primary text-md"
                onClick={() => navigate("/signup")}>Sign Up</span></p>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Signin;


