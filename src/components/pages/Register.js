import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { register_content } from "./content";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { register_user } from "../MainApi/MainApi";

const schema = yup.object().shape({
  first_name: yup.string().required("Name is a required field"),
  last_name: yup.string().required("Last Name is a required field"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is a required field"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
  password2: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default function Register(props) {
  const [prevPage, setPrevPage] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setshow] = useState(false);
  const authUser = useSelector((state) => state.user).isAuthUser;
  if (props.history.location.state) {
    if (prevPage !== props.history.location.state.from.pathname) {
      setPrevPage(props.history.location.state.from.pathname);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const res = await register_user(
      data.email,
      data.password,
      data.first_name,
      data.last_name
    );
    let message = "";
    document.getElementById("register-form").reset();
    setshow(true);
    if (res.status === 201) {
      message = "Account Created. Check your email to activate your account.";
    } else {
      message = "Something went wrong!";
    }
    setMsg(message);
  };

  if (show) {
    setTimeout(() => {
      setshow(false);
    }, 4000);
  }

  return (
    <div className="relative flex flex-col w-full">
      {!authUser ? (
        <div className="relative mt-6 flex justify-center items-center min-h-screen px-2  py-10 text-gray-600 dark:text-gray-100">
          <div className="shadow-lg overflow-hidden border-gray-200 w-full sm:w-10/12 md:w-9/12 lg:w-7/12 xl:w-5/12 rounded-lg border dark:border-gray-600">
            {show ? (
              <div
                class="transition duration-75 ease-in-out absolute top-12 px-4 py-3 leading-normal text-green-700 bg-green-100 rounded-lg"
                role="alert"
              >
                <p class="transition duration-75 ease-in-out font-bold">
                  {msg}
                </p>
              </div>
            ) : (
              <div></div>
            )}
            <div className="min-w-full">
              <div className="bg-gray-50 dark:bg-gray-800">
                <div>
                  <div className="font-bold text-center px-10 py-3 text-gray-500 dark:text-gray-200 text-2xl dark:border-gray-600">
                    Register
                  </div>
                </div>
              </div>
              <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-center bg-gray-300 dark:bg-gray-700">
                  <div className="w-10/12 md:w-3/5 flex flex-col  space-y-3 ">
                    <p className="py-2 px-3">
                      Fill in this form to create an account.
                    </p>
                    {register_content.inputs.map((input, key) => {
                      return (
                        <div key={key}>
                          <input
                            {...register(input.name)}
                            name={input.name}
                            className="dark:bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-grey-500 dark:text-gray-600"
                            type={input.type}
                            placeholder={input.label}
                          />
                          <p className="pl-2 pt-2 text-red-500">
                            {errors[input.name]?.message}
                          </p>
                        </div>
                      );
                    })}
                    <div className="flex items-center justify-between pb-5">
                      <button
                        className="shadow bg-blue-500 hover:bg-blue-600 text-gray-100 font-bold py-2 px-4 rounded"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="text-center bg-gray-200 dark:bg-gray-800">
                <p className="py-3">
                  Already have an Account?{" "}
                  <a
                    href="/login"
                    className="text-blue-600 font-bold underline"
                  >
                    Sign in.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={prevPage} />
      )}
    </div>
  );
}
