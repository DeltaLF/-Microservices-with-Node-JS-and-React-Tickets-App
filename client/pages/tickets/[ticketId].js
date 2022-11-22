import Router from "next/router";
import useRequestHook from "../../hooks/use-request";

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequestHook({
    url: "/api/orders",
    method: "post",
    body: { ticketId: ticket.id },
    onSuccess: (order) => {
      Router.push("/orders/[orderId]", `/orders/${order.id}`);
    },
  });

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors}
      <button onClick={doRequest} className="btn btn-primary">
        Purchase
      </button>
    </div>
  );
};

TicketShow.getInitialProps = async (context, axiosInstance, currentUser) => {
  const { ticketId } = context.query;
  const { data } = await axiosInstance.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
