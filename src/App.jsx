import {useEffect} from "react";
import {HashRouter, Route, Routes} from 'react-router-dom';
import {MainPage} from "./pages/main-page/MainPage.jsx";
import { CoinProvider } from './context/CoinContext.jsx';
import './App.css';
import {PvpPage} from "./pages/pvp-page/PvpPage.jsx";
import {Loader} from "./components/loader/Loader.jsx";

function App() {
    useEffect(() => {
        // Работа с WebApp Telegram (заголовок и расширение WebView)
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.setHeaderColor('#183256');
            window.Telegram.WebApp.expand();
        }

        // Функция для вычисления высоты видимой части экрана
        function setTelegramHeight() {
            const windowHeight = window.innerHeight; // Общая высота окна
            const availableHeight = document.documentElement.clientHeight; // Высота видимой части контента

            const telegramTopBarHeight = windowHeight - availableHeight; // Разница между полной высотой и видимой частью

            // Устанавливаем значения для CSS переменных
            document.documentElement.style.setProperty('--telegram-top-bar-height', `${telegramTopBarHeight}px`);
            document.documentElement.style.setProperty('--available-height', `${availableHeight}px`);
        }

        // Вызываем функцию при загрузке страницы
        setTelegramHeight();

        // Обновляем высоту при изменении размеров окна
        window.addEventListener('resize', setTelegramHeight);

        // Убираем обработчик при размонтировании компонента
        return () => {
            window.removeEventListener('resize', setTelegramHeight);
        };
    }, []);

    return (
        <CoinProvider>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/pvp' element={<PvpPage />} />
                    <Route path='/loader' element={<Loader />} />
                </Routes>
            </HashRouter>
        </CoinProvider>
    )
}

export default App;
