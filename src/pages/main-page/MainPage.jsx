import styles from './MainPage.module.scss'
import {NavBar} from "../../components/nav-bar/NavBar.jsx";
import {MainHeader} from "../../components/main-header/MainHeader.jsx";
import {CharacterImage} from "../../components/character/CharacterImage.jsx";
import {CollectBar} from "../../components/bars/collect-bar/CollectBar.jsx";
import {ClainButton} from "../../components/buttons/claim/ClainButton.jsx";

export const MainPage = () => {
    return(
        <div className={styles.root}>
            <MainHeader />
            <CharacterImage />
            <CollectBar />
            <ClainButton />
            <NavBar />
        </div>
    )
}