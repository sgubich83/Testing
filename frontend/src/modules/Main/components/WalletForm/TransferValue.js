import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { transferValue, getWallet } from "modules/Main/reducers/main";
import BaseForm from "./BaseForm";

const TransferValue = ({ onClose, id, number, walletList }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWallet(id))
    }, [dispatch, id])

    const { transferedValue, currentWallet } = useSelector((state) => ({
        transferedValue: state.main.transferedValue,
        currentWallet: state.main.currentWallet,
    }));

    const handleSubmit = values => {
        dispatch(transferValue({ fromWalletId: id, value: values.value, toWalletId: values.toWalletId }))
        onClose && onClose()
    }

    const VALIDATION_SCHEMA = yup.object().shape({
        toWalletId: yup.string().required("required"),
        value: yup.number().required("required"),
    });

    if (currentWallet.isLoading) {
        return null
    }

    return (
        <BaseForm
            validationSchema={VALIDATION_SCHEMA}
            initialValues={{ name: currentWallet?.data?.result?.value }}
            onSubmit={handleSubmit}
            currentValue={transferedValue}
            onClose={onClose}
            currentName="value"
            number={number}
            type='transfer'
            walletList={walletList}
        />
    )
}

export default TransferValue;
