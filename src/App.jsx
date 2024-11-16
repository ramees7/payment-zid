import React, { useState } from "react";

const App = () => {
  const [showGateway, setShowGateway] = useState(false);

  const handleBuyNow = () => {
    setShowGateway(true);
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
          <p className="text-xl font-semibold">Price: ₹500</p>
          <button
            onClick={handleBuyNow}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
          >
            Buy Now
          </button>
        </div>
      </div>
      {showGateway && <PaymentGateway />}
    </div>
  );
};

const PaymentGateway = () => {
  // const handlePayment = (gateway) => {
  //   window.location.href = `upi://pay?pa=muhammedramees09876-2@oksbi&pn=Merchant&am=500&cu=INR&tn=Payment via ${gateway}`;
  // };
  // const handlePayment = (gateway) => {
  //   let upiLink =
  //     "upi://pay?pa=muhammedramees09876-2@oksbi&pn=Merchant&am=1&cu=INR";
  //   if (gateway === "GPay") {
  //     upiLink += "&mc=GPayCode&mode=00";
  //   } else if (gateway === "PhonePe") {
  //     upiLink += "&mc=PhonePeCode&mode=02";
  //   } else if (gateway === "Paytm") {
  //     upiLink += "&mc=PaytmCode&mode=03";
  //   }

  //   // Redirect to the payment link
  //   window.location.href = upiLink;
  // };

  const handlePayment = (gateway) => {
    if (gateway === "GPay") {
      window.location.href = "https://gpay.app.goo.gl/pay?pa=muhammedramees09876-2@oksbi&pn=Merchant&am=1&cu=INR";
    } else if (gateway === "PhonePe") {
      window.location.href = "https://phon.pe/upi/pay?pa=muhammedramees09876-2@oksbi&pn=Merchant&am=1&cu=INR";
    } else if (gateway === "Paytm") {
      window.location.href = "paytmmp://pay?pa=muhammedramees09876-2@oksbi&pn=Merchant&am=1&cu=INR";
    }
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
          onClick={() => handlePayment("PhonePe")}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          PhonePe
        </button>
        <button
          onClick={() => handlePayment("Paytm")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Paytm
        </button>
      </div>
    </div>
  );
};

export default App;
