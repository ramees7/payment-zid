// // import React, { useState } from "react";

// // const App = () => {
// //   const [showGateway, setShowGateway] = useState(false);

// //   const handleBuyNow = () => {
// //     setShowGateway(true);
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
// //       <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm">
// //         <img
// //           src="https://digitaldeepak.com/content/images/wp-content/uploads/2017/12/cert.png"
// //           alt="Product"
// //           className="rounded w-full"
// //         />
// //         <div className="text-center mt-4">
// //           <p className="text-xl font-semibold">Price: ₹500</p>
// //           <button
// //             onClick={handleBuyNow}
// //             className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
// //           >
// //             Buy Now
// //           </button>
// //         </div>
// //       </div>
// //       {showGateway && <PaymentGateway />}
// //     </div>
// //   );
// // };

// // const PaymentGateway = () => {
// //   const handlePayment = (gateway) => {
// //     if (gateway === "GPay") {
// //       window.location.href =
// //         "https://gpay.app.goo.gl/pay?pa=8075041503@ibl&pn=Merchant&am=1&cu=INR";
// //     } else if (gateway === "Paytm") {
// //       window.location.href =
// //         "paytmmp://pay?pa=8075041503@ibl&pn=Merchant&am=1&cu=INR";
// //     }
// //   };
// //   // const handlePayment = (gateway) => {
// //   //   let upiLink =
// //   //     "upi://pay?pa=8075041503@ibl&pn=Merchant&am=1&cu=INR";

// //   //   if (gateway === "GPay") {
// //   //     upiLink += "&mc=GPayCode&mode=00";
// //   //   } else if (gateway === "Paytm") {
// //   //     upiLink += "&mc=PaytmCode&mode=03";
// //   //   }

// //   //   // Redirect to the payment link
// //   //   window.location.href = upiLink;
// //   // };
// //   return (
// //     <div className="bg-white shadow-lg rounded-lg p-6 mt-4 max-w-sm">
// //       <h2 className="text-lg font-semibold mb-4">Select Payment Gateway</h2>
// //       <div className="flex flex-col gap-2">
// //         <button
// //           onClick={() => handlePayment("GPay")}
// //           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
// //         >
// //           Google Pay
// //         </button>
// //         <button
// //           onClick={() => handlePayment("Paytm")}
// //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //         >
// //           Paytm
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default App;




// import React, { useState } from "react";

// const App = () => {
//   const [showGateway, setShowGateway] = useState(false);
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");

//   const handleBuyNow = () => {
//     if (!email || !name || !phone) {
//       alert("Please fill all fields before proceeding.");
//       return;
//     }
//     setShowGateway(true);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm">
//         <img
//           src="https://digitaldeepak.com/content/images/wp-content/uploads/2017/12/cert.png"
//           alt="Product"
//           className="rounded w-full"
//         />
//         <div className="text-center mt-4">
//           <p className="text-xl font-semibold">Price: ₹500</p>
//           <input
//             type="text"
//             placeholder="Enter your name"
//             className="border rounded w-full p-2 mt-2"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="border rounded w-full p-2 mt-2"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Enter your phone number"
//             className="border rounded w-full p-2 mt-2"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//           <button
//             onClick={handleBuyNow}
//             className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
//           >
//             Buy Now
//           </button>
//         </div>
//       </div>
//       {showGateway && (
//         <PaymentGateway name={name} email={email} phone={phone} />
//       )}
//     </div>
//   );
// };

// const PaymentGateway = ({ name, email, phone }) => {
//   const handlePayment = async (gateway) => {
//     const upiId = "8075041503@ibl";
//     const amount = 1;

//     // Generate UPI link
//     const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
//       name
//     )}&mc=0000&tid=123456789&tr=TXN1234&tn=Purchase&am=${amount}&cu=INR`;

//     // Redirect to UPI app
//     window.location.href = upiLink;

//     // Simulate backend receipt generation (replace with actual transaction verification)
//     setTimeout(async () => {
//       const response = await fetch("http://localhost:5000/send-receipt", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, phone, amount }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         alert("Payment successful! Receipt sent to your email.");
//       } else {
//         alert("Failed to send receipt. Please contact support.");
//       }
//     }, 5000);
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 mt-4 max-w-sm">
//       <h2 className="text-lg font-semibold mb-4">Select Payment Gateway</h2>
//       <div className="flex flex-col gap-2">
//         <button
//           onClick={() => handlePayment("GPay")}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Google Pay
//         </button>
//         <button
//           onClick={() => handlePayment("Paytm")}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Paytm
//         </button>
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState } from "react";

const App = () => {
  const [showGateway, setShowGateway] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const amount = 1; // Fixed amount

  const handleBuyNow = () => {
    if (!email || !name || !phone) {
      alert("Please fill all fields before proceeding.");
      return;
    }
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
        <PaymentGateway name={name} email={email} phone={phone} amount={amount} />
      )}
    </div>
  );
};

const PaymentGateway = ({ name, email, phone, amount }) => {
  const handlePayment = (gateway) => {
    const upiId = "8075041503@ibl";
    const commonUPILink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;

    // Define app-specific UPI links
    let appLink;
    switch (gateway) {
      case "GPay":
        appLink = `intent://${commonUPILink}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end;`;
        break;
      case "Paytm":
        appLink = `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
        break;
      case "WhatsApp":
        appLink = `https://wa.me/?text=${encodeURIComponent(
          `Please pay ₹${amount} to ${upiId} via UPI`
        )}`;
        break;
      default:
        appLink = commonUPILink;
    }

    // Navigate to the specified payment link
    window.location.href = appLink;

    // Simulate backend receipt generation
    setTimeout(async () => {
      const response = await fetch("http://localhost:5000/send-receipt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, amount }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Payment successful! Receipt sent to your email.");
      } else {
        alert("Failed to send receipt. Please contact support.");
      }
    }, 5000);
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Paytm
        </button>
        <button
          onClick={() => handlePayment("WhatsApp")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          WhatsApp
        </button>
      </div>
    </div>
  );
};

export default App;
