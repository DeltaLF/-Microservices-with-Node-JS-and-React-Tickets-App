import Router from "next/router";
import { useEffect, useState } from "react";
import StripeChecktout from "react-stripe-checkout";
import useRequestHook from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequestHook({
    url: "/api/payments",
    method: "post",
    body: { orderId: order.id },
    onSuccess: (payment) => {
      Router.push("/orders");
    },
  });
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft(); // update time right away
    const timerId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }
  return (
    <div>
      Time left to pay {timeLeft} seconds
      <StripeChecktout
        token={({ id }) => {
          doRequest({ token: id });
        }}
        stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, axiosInstance, currentUser) => {
  const { orderId } = context.query;
  const { data } = await axiosInstance.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default OrderShow;
