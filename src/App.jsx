import './App.css'
import {MainPage} from "./pages/main-page/MainPage.jsx";
import { CoinProvider } from './context/CoinContext.jsx';

function App() {
  return (
    <CoinProvider>
      <MainPage />
    </CoinProvider>
  )
}

export default App
