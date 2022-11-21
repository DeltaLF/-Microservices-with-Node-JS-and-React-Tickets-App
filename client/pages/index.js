const HomePage = ({ currentUser }) => {
  return <h1>{currentUser ? "You are signed in" : "You are not signed in"}</h1>;
};

HomePage.getInitialProps = async (context, client, currentUser) => {
  return {};
  /* currentUser will be fetched in APP component
  // nextJS client server is a proxy server
  // what the browser has is appended on the nextJS client server
  const axiosInstance = buildClient(context);
  const { data } = await axiosInstance.post("/api/users/currentuser");
  return data;
  */
};

export default HomePage;
