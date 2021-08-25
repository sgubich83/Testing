import React, {useEffect} from "react";
import ReactDOM from 'react-dom'
import {CSSTransition} from 'react-transition-group'
import CloseIcon from '@material-ui/icons/Close';
import { AuthorizationUtils } from "utils";
import {Overlay, Wrapper, Dialog, CloseButton, Title, TitleWrapper} from './styles'


const Popup = props => {
    const {isOpen} = props

    useEffect(() => {
        const token = AuthorizationUtils.getSessionToken();
        if (token) {
            // Prepare required data
        } else {
            AuthorizationUtils.redirectToLoginForm();
        }
    });

    const renderContent = ({component: ChildComponent, width, onClose, title}) => (
        <Dialog defaultWidth={width}>
            <CloseButton onClick={onClose}>
                <CloseIcon/>
            </CloseButton>
            {title &&
                <TitleWrapper>
                    <Title>
                        {title}
                    </Title>
                </TitleWrapper>
            }
            <ChildComponent {...props} />
        </Dialog>
    )

    return ReactDOM.createPortal((
        <Overlay isOpen={isOpen}>
            <Wrapper>
                <CSSTransition
                    in={isOpen}
                    classNames='popup'
                    timeout={300}
                    unmountOnExit
                >
                    {renderContent(props)}
                </CSSTransition>
            </Wrapper>
        </Overlay>
    ), document.body)
}


export default Popup;
