import React from "react";
import { useDispatch } from "react-redux";
import { deleteWallet } from "modules/Main/reducers/main";
import {Button} from "@material-ui/core";

const DeleteWallet = ({ onClose, id }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(deleteWallet(id))
        onClose && onClose()
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={onClose}
            >
                No
            </Button>
            <Button
                size="large"
                variant="contained"
                color="primary"
                style={{ marginLeft: 15 }}
                onClick={handleClick}
            >
                Yes
            </Button>
        </div>
    )
}

export default DeleteWallet;
