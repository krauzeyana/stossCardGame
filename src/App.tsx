import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StartPage } from "./pages/startPage";
import { MainPage } from "./pages/mainPage";
import { StatisticPage } from "./pages/statisticPage";
import { SettingPage } from "./pages/settingPage";
import { RootStoreContext, rootStore } from "./store";

function App() {
    return (
        <RootStoreContext.Provider value={rootStore}>
            <BrowserRouter>
                <div className="app">
                    <Routes>
                        <Route path="/" element={<StartPage />} />
                        <Route path="/game" element={<MainPage />} />
                        <Route path="/statistics" element={<StatisticPage />} />
                        <Route path="/settings" element={<SettingPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </RootStoreContext.Provider>
    );
}
export default App;
