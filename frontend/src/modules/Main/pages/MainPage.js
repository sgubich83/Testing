import React, {useState} from "react";
import { Container, Button } from "@material-ui/core";
import { Popup } from "components/common";
import { Wallets } from 'modules/Main/components'
import { AddWallet } from 'modules/Main/components/WalletForm'
import { AuthorizationUtils } from "utils";
import styles from "./styles.module.scss";

const MainPage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    function handleOpenPopup() {
        setIsPopupOpen(true)
    }

    function handleClosePopup() {
        setIsPopupOpen(false)
    }

    function handleLogout() {
        AuthorizationUtils.redirectToLoginForm()
    }

    return (
        <Container>
            <div className={styles.wrapper}>
                <div className={styles.header}>Estonian test</div>
                <div className={styles.buttons}>
                    <Button
                        className={styles.button}
                        onClick={handleOpenPopup}
                    >
                        Add wallet
                    </Button>
                    <Button
                        className={styles.button}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            </div>
            <Wallets />
            <Popup
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                component={AddWallet}
                title='Add wallet'
            />
        </Container>
    );
};

export default MainPage;
