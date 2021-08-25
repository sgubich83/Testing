import React from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./styles.module.scss";

const Input = (props) => {
    const {
        form,
        field,
        type = "text",
        label,
        placeholder,
        disabled,
        className,
        helperText,
        size,
        required = false,
    } = props;
    const fieldError = form.errors[field.name];
    const isTouched = form.touched[field.name];
    const isShowError = !!(fieldError && isTouched);

    function onValueChange(e) {
        form.setFieldValue(field.name, e.target.value);
    }

    function onBlur() {
        form.setFieldTouched(field.name, true);
    }

    return (
        <div className={styles.root}>
            <TextField
                {...field}
                value={field.value || ""}
                size={size || "medium"}
                type={type}
                className={className}
                required={required}
                placeholder={placeholder}
                disabled={disabled}
                helperText={helperText}
                label={label}
                error={isShowError}
                onChange={onValueChange}
                onBlur={onBlur}
            />
        </div>
    );
};

export default Input;
