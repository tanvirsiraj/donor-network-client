import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm";


const Donate = () => {


  const stripePromise= loadStripe(import.meta.env.VITE_STRIPE_PK);
  return (
      <div className="max-w-xl mx-auto mt-20 bg-white shadow-lg p-8 rounded-lg mb-10">
      <h2 className="text-3xl font-bold text-center text-red-500 mb-6">Make a Donation</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Donate;
