import React from "react";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./logReg.scss";
import { history } from "../../redux/store";
import { fetchApi } from "../../utils/api/fetchApi";
export const Register: React.FC = () => {

  const validationSchema = Yup.object({
    email: Yup.string().email("error").required("error"),
    name: Yup.string().required("error"),
    password: Yup.string().required("error"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "error")
      .required("error"),
  });
  interface IvalidationSchema {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
  }

  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values: IvalidationSchema, propsSubmit: any) => {
    const postData =  {
      email: values.email,
      fullname: values.name,
      password: values.confirmPassword,
    };
    const response = await fetchApi("POST", "", "user/signup", postData, "");
    propsSubmit.resetForm();

    if (response.message === 'Пользователь создан') {
      history.push("/");
    }

   
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        console.log(formik);
        console.log(`block__input--${formik.errors.email}`);

        return (
          <>
            <div className="title">
              <h1 className="title__offer">Регистрация</h1>
              <span className="title__text">
                Для входа в чат, вам нужно зарегистрироваться
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
                    placeholder="Your Email"
                  />
                </div>
                <div className="block__form-control">
                  <Field
                    className={
                      formik.errors.name
                        ? `block__input block__input--${formik.errors.name}`
                        : "block__input"
                    }
                    type="name"
                    id="name"
                    name="name"
                    placeholder="Your Name"
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
                <div className="block__form-control">
                  <Field
                    className={
                      formik.errors.confirmPassword
                        ? `block__input block__input--${formik.errors.confirmPassword}`
                        : "block__input"
                    }
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="ConfirmPassword"
                  />
                </div>
                <button
                  type="submit"
                  className="block__button"
                  disabled={!formik.isValid}
                >
                  Зарегистрироваться
                </button>
                <NavLink className="block__link" to="/">
                  Войти в аккаунт
                </NavLink>
              </Form>
            </div>
          </>
        );
      }}
    </Formik>
  );
};
