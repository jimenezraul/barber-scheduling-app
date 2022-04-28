import React, { useState } from "react";
import GLogin from "../GoogleButton/Login";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login_content } from "./content";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api_login } from "../MainApi/MainApi";
import { setCurrentUser } from "../../redux/index";
import { bindActionCreators } from "redux";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is a required field"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

export default function Login(props) {
  const [prevPage, setPrevPage] = useState("");
  const [msg, setMsg] = useState("");
  const authUser = useSelector((state) => state.user).isAuthUser;
  const dispatch = useDispatch();
  const { login } = bindActionCreators(setCurrentUser, dispatch);

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
    let res = await api_login(data.email, data.password);
    console.log(res);
    if (res.detail) {
      setMsg(res.detail);
    } else {
      const response = JSON.parse(Cookies.get("user"));
      login(response);
    }
  };
  
  return (
    <div className="relative flex flex-col w-full">
      {!authUser ? (
        <div className="flex justify-center items-center min-h-screen p-2 text-gray-600 dark:text-gray-100">
          <div className="shadow-lg overflow-hidden border-gray-200 w-full sm:w-10/12 md:w-9/12 lg:w-6/12 xl:w-5/12 rounded-lg border dark:border-gray-600">
            <div className="min-w-full">
              <div className="bg-gray-50 dark:bg-gray-800">
                <div>
                  <div className="font-bold text-center px-10 py-3 text-gray-500 dark:text-gray-200 text-2xl dark:border-gray-600">
                    Login
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col justify-center items-center bg-gray-300 dark:bg-gray-700">
                  <div className="w-full pt-8">
                    <div className="text-center text-red-500">{msg}</div>
                  </div>
                  <div className="w-10/12 md:w-3/5 flex flex-col  space-y-3 py-10">
                    {login_content.inputs.map((input, key) => {
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
                        Login
                      </button>
                      <a
                        className="inline-block align-baseline font-bold text-sm hover:text-blue-500 underline"
                        href="/forgot"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <div className="relative z-auto block text-center border-t border-gray-400 pt-5">
                      <div className="flex justify-center">
                        <div className="px-2 bg-gray-300 dark:bg-gray-700 absolute -top-4 text-lg mb-2">
                          or
                        </div>
                      </div>
                      <div className="pt-5 pb-5 ">
                        <GLogin />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div className="text-center bg-gray-200 dark:bg-gray-800">
                <p className="py-3">
                  Need an Account? Click{" "}
                  <a
                    href="/register"
                    className="text-blue-600 font-bold underline"
                  >
                    here.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}
