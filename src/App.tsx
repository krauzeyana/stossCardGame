import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navBar/NavBar";
import { StartPage } from "./pages/startPage";
import { MainPage } from "./pages/mainPage";
import { StatisticPage } from "./pages/statisticPage";
import { SettingPage } from "./pages/settingPage";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                
                <Routes>
                    <Route path="/" element={<StartPage/>} />
                    <Route path="/game" element={<MainPage/>} />
                    <Route path="/statistics" element={<StatisticPage/>} />
                    <Route path="/settings" element={<SettingPage/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
export default App;
