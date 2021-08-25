import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { increaseValue, getWallet } from "modules/Main/reducers/main";
import BaseForm from "./BaseForm";

const IncreaseValue = ({ onClose, id }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWallet(id))
    }, [dispatch, id])

    const { increasedValue, currentWallet } = useSelector((state) => ({
        increasedValue: state.main.increasedValue,
        currentWallet: state.main.currentWallet,
    }));

    const handleSubmit = values => {
        dispatch(increaseValue({ id, value: values.value }))
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
            currentValue={increasedValue}
            onClose={onClose}
            currentName="value"
        />
    )
}

export default IncreaseValue;
