import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
    return (
        <div className="min-h-sc flex flex-wrap content-between">
            <div className="w-full block">
                <main>
                    <Navbar />
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default App;
