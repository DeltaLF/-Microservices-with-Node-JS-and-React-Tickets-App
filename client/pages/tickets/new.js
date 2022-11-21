import { useState } from "react";
import useRequestHook from "../../hooks/use-request";
import Router from "next/router";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors } = useRequestHook({
    url: "/api/tickets",
    method: "post",
    body: { title, price },
    onSuccess: (ticket) => Router.push("/"),
  });

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2)); // rounding the nubmer
  };

  const onSubmit = (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            value={price}
            // when use unfocus (click out after click the form)
            onBlur={onBlur}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary" style={{ marginTop: "2rem" }}>
          Submit
        </button>
        {errors}
      </form>
    </div>
  );
};

export default NewTicket;
