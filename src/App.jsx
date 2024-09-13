import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="min-h-sc flex flex-wrap content-between">
            <div className="w-full block">
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default App;
