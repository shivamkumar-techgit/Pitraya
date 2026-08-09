import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_TK1hVe2mSUe9EV",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "OQ3zaFhXsXAgI63DWX3x5hbt",
});

export default razorpay;
