import { useState } from "react";
import QRCode from "react-qr-code";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import certificate from "./assets/certificate.jpg";
import { FaGooglePay, FaQrcode } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import PropTypes from "prop-types"; // Import PropTypes

const App = () => {
  const [showGateway, setShowGateway] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState(null); // For success/error messages

  const amount = 999;

  // Form validation schema with Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .length(10, "Phone number must be exactly 10 digits")
      .matches(/^[0-9]+$/, "Phone number must contain only digits"),
  });

  const handleBuyNow = (values) => {
    setFormValues(values); // Save form values to state
    setShowGateway(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    setScreenshot(file); // Set the screenshot in state
  };

  const handleSubmit = () => {
    console.log("FormData to be sent:", {
      name: formValues.name,
      email: formValues.email,
      phone: formValues.phone,
      screenshot: screenshot,
    });
    if (!screenshot) {
      alert("Please upload the screenshot before submitting.");
      return;
    }

    // Create a new FormData object to append the screenshot file
    const formData = new FormData();
    formData.append("screenshot", screenshot); // Append the screenshot file
    formData.append("name", formValues.name); // Append form fields
    formData.append("email", formValues.email);
    formData.append("phone", formValues.phone);

    // Send the data to the backend
    axios
      .post(
        "https://payment-backend-certificate.onrender.com/send-receipt",
        formData
      )
      .then((response) => {
        if (response.data.success) {
          setSubmissionStatus(
            "Your certificate will be processed for issuance within one business day of screenshot verification."
          );
          alert(
            "Your certificate will be processed for issuance within one business day of screenshot verification."
          );
          setScreenshot(null); // Clear the screenshot state
        } else {
          setSubmissionStatus(
            "Error: " + (response.data.message || "Unknown error occurred")
          );
        }
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setSubmissionStatus(
          "An error occurred while uploading the screenshot. Please try again."
        );
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm">
        <img src={certificate} alt="Product" className="rounded w-full" />
        <div className="text-center mt-4">
          <p className="text-xl font-semibold">Price: ₹{amount}</p>
          <Formik
            initialValues={{ name: "", email: "", phone: "" }}
            validationSchema={validationSchema}
            onSubmit={handleBuyNow}
          >
            {() => (
              <Form>
                <Field
                  type="text"
              name="name"
                  placeholder="Enter your name"
                  className="border rounded w-full p-2 mt-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />

                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="border rounded w-full p-2 mt-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />

                <Field
                  type="number"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="border rounded w-full p-2 mt-2"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500"
                />

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
                >
                  Buy Now
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {showGateway && (
        <PaymentGateway
          amount={amount}
          showQRCode={showQRCode}
          setShowQRCode={setShowQRCode}
          handleFileUpload={handleFileUpload}
          handleSubmit={handleSubmit}
          screenshot={screenshot} // Pass screenshot to PaymentGateway component
        />
      )}

      {/* Show the status message after form submission */}
      {submissionStatus && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 border border-green-200 rounded">
          {submissionStatus}
        </div>
      )}
    </div>
  );
};

const PaymentGateway = ({
  amount,
  showQRCode,
  setShowQRCode,
  handleFileUpload,
  handleSubmit,
}) => {
  const upiId = "muhammedramees09876-2@oksbi";
  // const upiId = "8075041503@ibl";

  const handlePayment = (gateway) => {
    let appLink;

    switch (gateway) {
      case "GPay":
        appLink = `https://gpay.app.goo.gl/pay?pa=${upiId}&am=${amount}&cu=INR`;
        break;
      case "Paytm":
        appLink = `paytmmp://pay?pa=${upiId}&am=${amount}&cu=INR`;
        break;
      default:
        return;
    }

    window.location.href = appLink;
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-6 mt-4 max-w-sm w-[384px]">
        <h2 className="text-lg font-semibold mb-4">Select Payment Gateway</h2>
        <div className="flex flex-col gap-2 w-[100%]">
          <button
            onClick={() => handlePayment("GPay")}
            className="bg-green-500 text-white px-4  rounded hover:bg-green-600 flex items-center justify-center"
          >
            <FaGooglePay className="mr-2 text-6xl" />
          </button>
          <button
            onClick={() => handlePayment("Paytm")}
            className="bg-red-500 text-white px-4  rounded hover:bg-red-600 flex items-center justify-center"
          >
            <SiPaytm className="mr-2 text-6xl" />
          </button>
          <button
            onClick={() => setShowQRCode(!showQRCode)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mt-2 flex items-center justify-center"
          >
            <FaQrcode className="mr-2 text-4xl" />
            {showQRCode ? "Hide QR Code" : "Show QR Code"}
          </button>
          {showQRCode && (
            <div className="mt-4 flex justify-center">
              <QRCode
                value={`upi://pay?pa=${upiId}&am=${amount}&cu=INR`}
                size={150}
              />
            </div>
          )}
        </div>
      </div>
      <div className=" bg-white shadow-lg rounded-lg p-6 mt-4 max-w-sm">
        <h3 className="text-lg font-semibold">Upload Payment Screenshot</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="mt-2"
          key={Date.now()} // Reset the input field after each submission
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
        >
          Submit Payment and Screenshot
        </button>
      </div>
    </>
  );
};


export default App;

PaymentGateway.propTypes = {
  amount: PropTypes.number.isRequired,
  showQRCode: PropTypes.bool.isRequired,
  setShowQRCode: PropTypes.func.isRequired,
  handleFileUpload: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};