import { createContext, useState } from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Favorites from './pages/Favorites';
import Footer from './components/Footer';

// create a'context' for theme flexibility
export const ThemeContext = createContext(null)

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                path: "favorites",
                element: <Favorites />,
            },
        ],
    },
    {
        future: {
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
        },
    },
]);

function App() {

    const [theme, setTheme] = useState(false)

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className="App" style={theme ? { backgroundColor: "#07131c" } : {}}>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
