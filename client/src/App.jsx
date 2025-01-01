import { Toaster } from "react-hot-toast";
import AppRouter from "./router/AppRouter";

const App = () => (
  <>
    <Toaster position="top-center" />
    <AppRouter />
  </>
);

export default App;
