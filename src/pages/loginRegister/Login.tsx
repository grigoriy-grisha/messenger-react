import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./logReg.scss";
import { UserContext } from "../../helpers/UserContext";
import { fetchApi } from "../../utils/api/fetchApi";

export const Login: React.FC = () => {
  const auth = useContext(UserContext);
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string().email("error").required("error"),
    password: Yup.string().required("error"),
  });

  interface IvalidationSchema {
    email: string;
    password: string;
  }

  const onSubmit = async (values: IvalidationSchema, propsSubmit: any) => {
    const postData = {
      email: values.email,
      password: values.password,
    };
    const response = await fetchApi("POST", "", "user/signin", postData, "");

    if (response) {
      propsSubmit.resetForm();
      setMessage(response.status);
      auth.login(response.token, response._id);
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <>
            <div className="title">
              <h1 className="title__offer">Войдите в аккаунт</h1>
              <span className="title__text">
                {" "}
                Пожалуйста, войдите в свой аккаунт
              </span>
            </div>
            <div className="block">
              <Form>
                <div className="block__form-control">
                  <Field
                    className={
                      formik.errors.email
                        ? `block__input block__input--${formik.errors.email}`
                        : "block__input"
                    }
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your E-mail"
                  />
                </div>
                <div className="block__form-control">
                  <Field
                    className={
                      formik.errors.password
                        ? `block__input block__input--${formik.errors.password}`
                        : "block__input"
                    }
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Your Password"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!formik.isValid}
                  className="block__button"
                >
                  Войти
                </button>
                {message ? (
                  <p
                    className={`message--${
                      message === "succses" ? "succses" : "error"
                    }`}
                  >
                    {message}
                  </p>
                ) : null}
                <NavLink className="block__link" to="/register">
                  Зарегестрироваться
                </NavLink>
              </Form>
            </div>
          </>
        );
      }}
    </Formik>
  );
};
