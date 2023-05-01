import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { StartPage } from "./pages/startPage";
import { MainPage } from "./pages/mainPage";
import { StatisticPage } from "./pages/statisticPage";
import { SettingPage } from "./pages/settingPage";
import { RootStoreContext, rootStore } from "./store";
import { NavBar } from "./components/navBar";

function App() {
    return (
        <RootStoreContext.Provider value={rootStore}>
            <BrowserRouter>
                <div className="app">
                    <Routes>
                        <Route element={<WithoutNav />}>
                            <Route path="/" element={<StartPage />} />
                        </Route>
                        <Route element={<WithNav />}>
                            <Route path="/game" element={<MainPage />} />
                            <Route path="/statistics" element={<StatisticPage />} />
                            <Route path="/settings" element={<SettingPage />} />
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </RootStoreContext.Provider>
    );
}

const WithNav: React.FC = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

const WithoutNav: React.FC = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default App;
