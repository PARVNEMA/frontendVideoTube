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
				<div className="hidden md:block md:w-1/4 md:h-full md:sticky md:top-20 md:border-r-2 md:border-purple-500">
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
