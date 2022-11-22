import Link from "next/link";

const HomePage = ({ tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>view</a>
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h1>tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Titke</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

HomePage.getInitialProps = async (context, axiosInstance, currentUser) => {
  const { data } = await axiosInstance.get("/api/tickets");
  return { tickets: data };
  /* currentUser will be fetched in APP component
  // nextJS client server is a proxy server
  // what the browser has is appended on the nextJS client server
  const axiosInstance = buildClient(context);
  const { data } = await axiosInstance.post("/api/users/currentuser");
  return data;
  */
};

export default HomePage;
