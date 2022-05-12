import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import StripeCheckout from "../../components/stripe_checkout/StripeCheckout";

// load stripe outside our component render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = () => {
  return (
    <main>
      <div className="row">
        <div className="col d-flex text-center flex-column justify-content-center">
          <Elements stripe={promise}>
            <StripeCheckout />
          </Elements>
        </div>
      </div>
    </main>
  );
};

export default Payment;
