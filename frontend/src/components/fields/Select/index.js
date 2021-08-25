import React from "react";
import { Select, MenuItem } from "@material-ui/core";
import styles from "./styles.module.scss";

const TextArea = (props) => {
    const {
        form,
        field,
        type = "text",
        placeholder,
        disabled,
        className,
        size,
        minRows = 6,
        required = false,
        values = [],
        onChange
    } = props;
    const fieldError = form.errors[field.name];
    const isTouched = form.touched[field.name];
    const isShowError = !!(fieldError && isTouched);

    function onValueChange(e) {
        form.setFieldValue(field.name, e.target.value);
        if (onChange) {
            onChange(e.target.value)
        }
    }

    function onBlur() {
        form.setFieldTouched(field.name, true);
    }

    return (
        <div className={styles.root}>
            <Select
                {...field}
                value={field.value || ""}
                size={size || "medium"}
                type={type}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                className={className}
                required={required}
                placeholder={placeholder}
                disabled={disabled}
                minRows={minRows}
                error={isShowError}
                onChange={onValueChange}
                onBlur={onBlur}
            >
                {values.map(val => {
                    return <MenuItem value={val.id} key={val.id}>{val.name}</MenuItem>
                })}
            </Select>
        </div>
    );
};

export default TextArea;
