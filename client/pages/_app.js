import "bootstrap/dist/css/bootstrap.css";

export default ({ Component, pageProps }) => {
  // how nextjs shows the matched route:
  // show on default component: app.js  (_app.js is custom default component)
  // Component corresponds to either apple, index or any matched routes
  // to import bootstarp: import in this default component
  return <Component {...pageProps} />;
};
