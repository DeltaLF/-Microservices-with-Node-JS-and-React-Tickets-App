import axios from "axios";
import { useState } from "react";

const useRequestHook = ({ url, method, body }) => {
  // method = 'get' | 'post' | 'patch'
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
      setErrors(null);
      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops....</h4>
          <ul className="my-0">
            {err.response.data.errors.map((error) => (
              <li key={error.message}> {error.message} </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequestHook;
