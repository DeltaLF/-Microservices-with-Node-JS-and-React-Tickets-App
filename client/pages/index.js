import axios from "axios";

const HomePage = ({ currentUser }) => {
  console.log(currentUser);
  // make request in client
  return <div>Home Page </div>;
};

HomePage.getInitialProps = async ({ req }) => {
  // req is the initila request to the nextjs

  // make request in server
  // const response = await axios.get("/api/users/currentuser");
  // cause some errors
  // no domain specified axios will assuem it is current domain
  // and waht exactly the 'current domain' is?
  // it's the client pod docker container

  if (typeof window === "undefined") {
    // we are on the server nextjs
    // reqeusts should be made to
    // http://SERVICENAME.NAMESPACE.svc.cluster.local

    const response = await axios
      .post(
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
        {},
        {
          headers: req.headers,
          // headers: {
          //   host: "ticketing.dev", // for specifying host in ingress
          // },
        }
      )
      .catch((err) => {
        console.log("error in nextjs server getInitialProps", err);
        return {};
      });

    console.log("succes in nextjs server getInitialProps", response.data);
    return response.data || {};
  } else {
    // we are on the browser
    // requests can be made with a base url of ''
    const response = await axios.post("/api/users/currentuser");
    // {currentuser:{}}
    console.log(
      "window not undefined, it's a redirect getInitialProps",
      response.data
    );
    return response.data;
  }
};

export default HomePage;
