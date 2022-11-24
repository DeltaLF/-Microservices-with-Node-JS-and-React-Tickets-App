const OrderIndex = ({ orders }) => {
  console.log(orders);
  return (
    <ul>
      {orders &&
        orders.map((order) => {
          return (
            <li key={order.id}>
              {order.ticket.title} - {order.status}
            </li>
          );
        })}
    </ul>
  );
};

OrderIndex.getInitialProps = async (context, axiosInstance) => {
  const { data } = await axiosInstance.get("/api/orders");
  return { orders: data };
};

export default OrderIndex;
