import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ContactForm from "./components/ContactForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContactForm />
  </React.StrictMode>
);
