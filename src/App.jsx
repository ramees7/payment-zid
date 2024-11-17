import React, { useState } from "react";
import QRCode from "react-qr-code"; // Install this package with: npm install qrcode.react

const App = () => {
  const [showGateway, setShowGateway] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showQRCode, setShowQRCode] = useState(false); // New state for QR code
  const [screenshot, setScreenshot] = useState(null); // New state for screenshot upload
  const amount = 1; // Fixed amount

  const handleBuyNow = () => {
    if (!email || !name || !phone) {
      alert("Please fill all fields before proceeding.");
      return;
    }
    setShowGateway(true);
  };

  const handleFileUpload = (e) => {
    setScreenshot(e.target.files[0]);
    alert("You will receive your certificate within one working day.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm">
        <img
          src="https://digitaldeepak.com/content/images/wp-content/uploads/2017/12/cert.png"
          alt="Product"
          className="rounded w-full"
        />
        <div className="text-center mt-4">
          <p className="text-xl font-semibold">Price: ₹{amount}</p>
          <input
            type="text"
            placeholder="Enter your name"
            className="border rounded w-full p-2 mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="border rounded w-full p-2 mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your phone number"
            className="border rounded w-full p-2 mt-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            onClick={handleBuyNow}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
          >
            Buy Now
          </button>
        </div>
      </div>
      {showGateway && (
        <PaymentGateway
          name={name}
          email={email}
          phone={phone}
          amount={amount}
          showQRCode={showQRCode}
          setShowQRCode={setShowQRCode}
          handleFileUpload={handleFileUpload}
        />
      )}
    </div>
  );
};

const PaymentGateway = ({
  name,
  amount,
  showQRCode,
  setShowQRCode,
  handleFileUpload,
}) => {
  const upiId = "8075041503@ibl"; // Define UPI ID

  // Updated handlePayment function
  // const handlePayment = (gateway) => {
  //   let appLink;

  //   // Set app link based on the selected payment gateway
  //   switch (gateway) {
  //     case "GPay":
  //       appLink = `https://gpay.app.goo.gl/pay?pa=${upiId}&pn=${encodeURIComponent(
  //         name
  //       )}&am=${amount}&cu=INR`;
  //       break;

  //     case "Paytm":
  //       appLink = `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(
  //         name
  //       )}&am=${amount}&cu=INR`;
  //       break;
  //     default:
  //       return;
  //   }

  //   // Redirect to the constructed UPI link
  //   window.location.href = appLink;
  // };

  const handlePayment = (gateway) => {
    const upiId = "8075041503@ibl";
    const merchantName = "Merchant";
    const amount = 1; // Amount in INR

    let appLink = ""; // Initialize a single link variable

    switch (gateway) {
      case "GPay":
        appLink = `https://gpay.app.goo.gl/pay?pa=${upiId}&pn=${encodeURIComponent(
          merchantName
        )}&am=${amount}&cu=INR`;
        break;

      case "Paytm":
        appLink = `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(
          merchantName
        )}&am=${amount}&cu=INR`;
        break;
      default:
        alert("Unsupported gateway.");
        return;
    }

    // Redirect to the constructed UPI link
    window.location.href = appLink;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-4 max-w-sm">
      <h2 className="text-lg font-semibold mb-4">Select Payment Gateway</h2>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handlePayment("GPay")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Google Pay
        </button>

        <button
          onClick={() => handlePayment("Paytm")}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Paytm
        </button>
        <button
          onClick={() => setShowQRCode(!showQRCode)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mt-2"
        >
          {showQRCode ? "Hide QR Code" : "Show QR Code"}
        </button>
        {showQRCode && (
          <div className="mt-4 flex justify-center">
            <QRCode
              value={`upi://pay?pa=${upiId}&pn=${encodeURIComponent(
                name
              )}&am=${amount}&cu=INR`}
              size={150}
            />
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Upload Payment Screenshot</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default App;
