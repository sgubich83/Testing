import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { decreaseValue, getWallet } from "modules/Main/reducers/main";
import BaseForm from "./BaseForm";

const DecreaseValue = ({ onClose, id, number }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWallet(id))
    }, [dispatch, id])

    const { decreasedValue, currentWallet } = useSelector((state) => ({
        decreasedValue: state.main.decreasedValue,
        currentWallet: state.main.currentWallet,
    }));

    const handleSubmit = values => {
        dispatch(decreaseValue({ id, value: values.value }))
        onClose && onClose()
    }

    const VALIDATION_SCHEMA = yup.object().shape({
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
            currentValue={decreasedValue}
            onClose={onClose}
            currentName="value"
            number={number}
            type='decrease'
        />
    )
}

export default DecreaseValue;
