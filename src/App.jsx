import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";

function App() {
	return (
		<div className="min-h-screen flex flex-col">
  <div className="w-full">
    <Navbar />
  </div>
  <div className="flex flex-grow">
    <div className="w-1/4 h-full sticky top-20 border-r-2 border-purple-500">
      <Sidebar />
    </div>
    <main className="flex-grow p-2">
      <Outlet />
    </main>
  </div>
</div>


	);
}

export default App;
