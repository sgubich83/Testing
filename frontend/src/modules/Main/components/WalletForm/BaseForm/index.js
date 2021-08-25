import React, { useEffect, useState } from "react";
import { Form, Field, Formik } from "formik";
import Alert from "@material-ui/lab/Alert";
import { Input, Select } from "components/fields";
import { Button } from "@material-ui/core";
import styles from "./styles.module.scss";

const BaseForm = ({
                      onClose,
                      initialValues,
                      validationSchema,
                      onSubmit,
                      currentValue,
                      currentName = "name",
                      number,
                      type = "increase",
                      walletList = [],
}) => {

    const [formBag, setFormBag] = useState(null);
    const [error, setError] = useState(false)

    useEffect(() => {
        if (currentValue && !currentValue.isLoading && formBag) {
            formBag.setSubmitting(false)

            formBag.resetForm()
            if (!currentValue.error && type !== 'decrease' && type !== 'transfer') {
                onClose && onClose()
            }
        }
    }, [formBag, currentValue, onClose, type])

    function handleSubmitForm(values, formikBag) {
        setFormBag(formikBag);
        if (number && currentName === 'value' && number < values.value) {
            setError(true)
        } else {
            onSubmit(values)
        }
    }

    function renderForm(props) {
        const { isValid, isSubmitting, dirty } = props;
        return (
            <Form className={styles.form}>
                <div className={styles.table}>
                    {type === 'transfer' &&
                        <div className={styles.field}>
                            <div className={styles.text}>select wallet</div>
                            <div className={styles.value}>
                                <Field
                                    component={Select}
                                    required
                                    name="toWalletId"
                                    size="medium"
                                    placeholder="Wallet"
                                    values={walletList}
                                />
                            </div>
                        </div>
                    }
                    <div className={styles.field}>
                        <div className={styles.text}>{currentName}</div>
                        <div className={styles.value}>
                            <Field
                                component={Input}
                                required
                                name={currentName}
                                size="medium"
                                placeholder={currentName}
                            />
                        </div>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.text}>&nbsp;</div>
                        <div className={styles.button}>
                            <Button
                                size="large"
                                type="submit"
                                disabled={!isValid || isSubmitting || !dirty}
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }

    return (
        <div className={styles.root}>
            {error && (
                <div className={styles.error}>
                    <Alert severity="error">Your value should be less {number}</Alert>
                </div>
            )}
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                enableReinitialize
                validateOnBlur
                validateOnChange
            >
                {(props) => renderForm(props)}
            </Formik>
        </div>
    )
}

export default BaseForm;
