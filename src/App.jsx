import { Toaster } from "sonner";
import Sidebar from "./components/Sidebar";
import Tasks from "./components/Tasks";

function App() {
  return (
    <>
      <Toaster toastOptions={{ style: { color: "#35383E" } }} />
      <Sidebar />
      <Tasks />
    </>
  );
}

export default App;
