import {useContext, useEffect, useState} from "react";
import {NavBar} from "../../components/nav-bar/NavBar.jsx";
import {MainHeader} from "../../components/main-header/MainHeader.jsx";
import {CharacterImage} from "../../components/character/CharacterImage.jsx";
import {CollectBar} from "../../components/bars/collect-bar/CollectBar.jsx";
import {ClainButton} from "../../components/buttons/claim/ClainButton.jsx";
import {CoinContext} from "../../context/CoinContext.jsx";
import axios from '../../utils/axios.js'
import  {Loader} from '../../components/loader/Loader.jsx'

import styles from './MainPage.module.scss'


//Telegram WebApp Get User
const search = window.Telegram.WebApp.initData
const urlParams = new URLSearchParams(search);
const userParam = urlParams.get('user');
const decodedUserParam = decodeURIComponent(userParam);
const userObject = JSON.parse(decodedUserParam);
// const userTG = userObject.username || '';
const userId = userObject.id || '';


export const MainPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { updateTeamData } = useContext(CoinContext);

    useEffect(() => {
        const fetchData = async (userId) => {
            try {
                const response = await axios.get(`/profile/init?profileId=${userId}`);
                const data = response.data;
                if (data && data.Group && data.Group.Id) {
                    updateTeamData(data.Group.Id);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
                setIsLoading(false);
            }
        }
        console.log('fetchData', fetchData)
    }), [updateTeamData];

    return(
        <>
            {isLoading && <Loader />}
            <div className={styles.root}>
                <MainHeader />
                <CharacterImage />
                <CollectBar />
                <ClainButton />
                <NavBar />
            </div>
        </>

    )
}