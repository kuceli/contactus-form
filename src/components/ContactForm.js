import React, { useState } from "react";
// import React from "react";
import "../styles/ContactForm.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import axios from "axios";
import { nanoid } from "nanoid";
import { FaRegPaperPlane } from "react-icons/fa";

const initialValues = {
  id: nanoid(),
  name: "",
  email: "",
  subject: "",
  message: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email format").required("Required!"),
  message: Yup.string().required("Required!"),
});

const ContactForm = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    console.log("submit props", onSubmitProps);

    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();

    axios({
      method: "POST",
      url: "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
      values: values,
    })
      .then(function (res) {
        console.log("response", res);
        setSuccess("Successfully Submitted. Thank you for contacting us!");
      })
      .catch(function (err) {
        console.log(err);
        setError(err);
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <div className="formHeader">CONTACT US</div>
            {error && (
              <div className="errorMsg">{`Form submission was unsuccessful - ${error}`}</div>
            )}
            <div className="successMsg">{success} </div>
            <FormikControl
              control="input"
              type="text"
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <FormikControl
              control="input"
              type="email"
              name="email"
              placeholder="E-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <FormikControl
              control="input"
              type="text"
              name="subject"
              placeholder="Subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
            />
            <FormikControl
              control="textarea"
              name="message"
              placeholder="Your Message"
              value={formik.values.message}
              onChange={formik.handleChange}
            />
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              <FaRegPaperPlane className="btnIcon" />
              Send
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ContactForm;
