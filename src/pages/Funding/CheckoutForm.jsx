import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const amountRef = useRef();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (amount > 0) {
      axios
        .post("http://localhost:5000/create-payment-intent", {
          amount: Number(amount),
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess("");

    if (!stripe || !elements || !clientSecret) return;
    setProcessing(true);

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email,
          },
        },
      }
    );

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      setError("");
      //   setSuccess("Payment successful!");
      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: "Thank you for your donation.",
      });

      // Save payment to DB (optional)
      console.log("PaymentIntent:", paymentIntent);
      const donationInfo = {
        donorName: user?.displayName,
        email: user?.email,
        amount,
        date: new Date(),
        transactionId: paymentIntent.id,
      };

      await axios.post("http://localhost:5000/donations", donationInfo);

      setProcessing(false);
      amountRef.current.value = "";
      setAmount("");
      elements.getElement(CardElement).clear();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Donor Name</label>
        <input
          type="text"
          value={user?.displayName || ""}
          disabled
          className="w-full px-4 py-2 border rounded-md bg-gray-100"
        />
      </div>

      <div>
        <label className="block font-medium">Donation Amount (USD)</label>
        <input
          type="number"
          min="1"
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
          ref={amountRef}
        />
      </div>

      <div>
        <label className="block font-medium">Date</label>
        <input
          type="text"
          value={new Date().toLocaleDateString()}
          disabled
          className="w-full px-4 py-2 border rounded-md bg-gray-100"
        />
      </div>

      <div className="border p-3 rounded-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="bg-red-500 text-white w-full py-2 mt-4 rounded hover:bg-red-600 transition font-semibold"
      >
        {processing ? "Processing..." : "Donate Now"}
      </button>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
    </form>
  );
};

export default CheckoutForm;
