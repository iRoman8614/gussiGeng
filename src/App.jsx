import {useEffect} from "react";
import {MainPage} from "./pages/main-page/MainPage.jsx";
import { CoinProvider } from './context/CoinContext.jsx';

import './App.css'

function App() {
    useEffect(() => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.setHeaderColor('#183256');
            window.Telegram.WebApp.expand();
        }
    }, []);

    return (
    <CoinProvider>
      <MainPage />
    </CoinProvider>
  )
}

export default App
