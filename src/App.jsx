import { useState } from "react";
import "./App.css";
import Body from "./components/Body";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Browse from "./components/Browse";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Body />}>
                        <Route path="/" element={<Login />} />
                        <Route path="/browse" element={<Browse />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
