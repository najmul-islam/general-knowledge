import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routers/router";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
