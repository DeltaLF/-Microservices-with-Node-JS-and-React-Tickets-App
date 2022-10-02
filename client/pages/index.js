import buildClient from "../api/build-client";

const HomePage = ({ currentUser }) => {
  console.log(currentUser);
  // make request in client
  return <div>Home Page </div>;
};

HomePage.getInitialProps = async (context) => {
  // nextJS client servre is a proxy server
  // what the browser has is appended on the nextJS client server
  const axiosInstance = buildClient(context);
  const { data } = await axiosInstance.post("/api/users/currentuser");

  return data;
};

export default HomePage;
