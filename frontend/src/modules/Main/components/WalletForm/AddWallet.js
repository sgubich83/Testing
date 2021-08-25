import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { addWallet } from "modules/Main/reducers/main";
import BaseForm from "./BaseForm";

const AddWallet = ({ onClose }) => {
    const dispatch = useDispatch();

    const { walletAdded } = useSelector((state) => ({
        walletAdded: state.main.walletAdded,
    }));

    const handleSubmit = values => {
        dispatch(addWallet({ name: values.name, value: 0.0 }))
    }

    const VALIDATION_SCHEMA = yup.object().shape({
        name: yup.string().required("required"),
    });

    const INITIAL_VALUES = {
        name: "",
    };

    return (
        <BaseForm
            validationSchema={VALIDATION_SCHEMA}
            initialValues={INITIAL_VALUES}
            onSubmit={handleSubmit}
            currentValue={walletAdded}
            onClose={onClose}
        />
    )
}

export default AddWallet;
