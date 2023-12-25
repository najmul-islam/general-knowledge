import { Toaster } from "react-hot-toast";
import Themeprovider from "./theme/Themeprovider";
import Router from "./routes/router";

const App = () => {
  return (
    <Themeprovider>
      <Router />
      <Toaster position="top-right" />
    </Themeprovider>
  );
};
export default App;
