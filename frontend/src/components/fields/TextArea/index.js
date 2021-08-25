import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
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
    } = props;

    function onValueChange(e) {
        form.setFieldValue(field.name, e.target.value);
    }

    function onBlur() {
        form.setFieldTouched(field.name, true);
    }

    return (
        <div className={styles.root}>
            <TextareaAutosize
                {...field}
                value={field.value || ""}
                size={size || "medium"}
                type={type}
                className={className}
                required={required}
                placeholder={placeholder}
                disabled={disabled}
                minRows={minRows}
                onChange={onValueChange}
                onBlur={onBlur}
            />
        </div>
    );
};

export default TextArea;
