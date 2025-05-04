import { Routing } from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routing />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;
