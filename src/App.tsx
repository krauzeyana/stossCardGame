import React, { PropsWithChildren, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StartPage } from "./pages/startPage";
import { MainPage } from "./pages/mainPage";
import { StatisticPage } from "./pages/statisticPage";
import { SettingPage } from "./pages/settingPage";
import { BankStoreContext, bankStore } from "./store/bankStore/bankStore";

function App() {
    return (
        <BankStoreContext.Provider value={bankStore}>
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
        </BankStoreContext.Provider>
    );
}
export default App;
