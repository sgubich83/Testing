import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { editWallet, getWallet } from "modules/Main/reducers/main";
import BaseForm from "./BaseForm";

const EditWallet = ({ onClose, id }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWallet(id))
    }, [dispatch, id])

    const { walletEdited, currentWallet } = useSelector((state) => ({
        walletEdited: state.main.walletEdited,
        currentWallet: state.main.currentWallet,
    }));

    const handleSubmit = values => {
        dispatch(editWallet({ id, name: values.name }))
    }

    const VALIDATION_SCHEMA = yup.object().shape({
        name: yup.string().required("required"),
    });

    if (currentWallet.isLoading || !currentWallet.data || !currentWallet.data.result || !currentWallet.data.result.name) {
        return null
    }

    return (
        <BaseForm
            validationSchema={VALIDATION_SCHEMA}
            initialValues={{ name: currentWallet.data.result.name }}
            onSubmit={handleSubmit}
            currentValue={walletEdited}
            onClose={onClose}
        />
    )
}

export default EditWallet;
