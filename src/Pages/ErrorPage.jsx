import { useRouteError } from "react-router-dom";
import "../App.css";

export default function ErrorPage({errorText}) {
  const error = useRouteError();
  console.error(errorText);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>{errorText}</p>
      <p>
        
          {error ? (
            <>
            <i>{error.statusText || error.message}</i>
            </>
          ):(
            <></>
          )}
      </p>
    </div>
  );
}