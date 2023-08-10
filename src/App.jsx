import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

async function makeFakeApiCall() {
  const STATUS = ["SUCCESS", "FAIL"];

  try {
    let response = await fetch("/api/fakeApi");

    let results = await response.json();

    return {
      status: STATUS[0],
      data: results,
    };
  } catch (error) {
    let errors = [error];
    return {
      status: STATUS[1],
      errors,
    };
  }
}

function App() {
  const [count, setCount] = useState(0);
  const [apiResponse, setApiResponse ] = useState(() => {
    let _apiResponse = {}
    
    let returnData = makeFakeApiCall()
      .then((val) => {
        Object.assign(_apiResponse, val);
        return;
      })
      .catch((err) => {
        return;
      });

    console.log(_apiResponse);
    return _apiResponse;
  });

  useEffect(
    () => {
      // console.log( 'API response changed' );
      // console.log( apiResponse );
    },
    [apiResponse]
  )

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>Working With Netlify Functions: {apiResponse.data.function_data || `no data found`}</p>
        <p>Secret Key: {apiResponse.data.secret_key || `no key found`}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
