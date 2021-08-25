import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Field, Formik } from "formik";
import * as yup from "yup";
import { Input } from "components/fields";
import { usePrevious } from "hooks";
import {
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Alert from "@material-ui/lab/Alert";
import { AuthorizationUtils } from "utils";
import { login } from "modules/Auth/reducers/auth";
import styles from "./styles.module.scss";

const LoginPage = () => {
    const dispatch = useDispatch();
    const { loggedIn } = useSelector((state) => ({
        loggedIn: state.auth.loggedIn,
    }));
    const [formBag, setFormBag] = useState(null);
    const [isLazyButton, setLazyButton] = useState(false);
    const prevLoggedIn = usePrevious(loggedIn) || { isLoading: false };
    const { error } = loggedIn;

    const INITIAL_VALUES = {
        login: "",
        password: "",
    };

    const VALIDATION_SCHEMA = yup.object().shape({
        login: yup.string().required('required'),
        password: yup.string().required('required'),
    });

    useEffect(() => {
        if (prevLoggedIn.isLoading && !loggedIn.isLoading) {
            if (formBag || isLazyButton) {
                formBag && formBag.setSubmitting(false);
                setLazyButton(false);

                if (!loggedIn.error) {
                    AuthorizationUtils.storeSession(loggedIn.data.token)
                    AuthorizationUtils.redirectToHomePage();
                }
            }
        }
    }, [formBag, loggedIn, prevLoggedIn, isLazyButton]);

    function handleSubmitForm(values, formikBag
    ) {
        setFormBag(formikBag);
        dispatch(login(values));
    }

    const handleClick = () => {
        setLazyButton(true);
        dispatch(login({ login: "a@a.aa", password: "Password1" }));
    };

    function renderForm(props) {
        const { isValid, isSubmitting } = props;
        return (
            <Form className={styles.form}>
                <Field
                    component={Input}
                    required
                    name="login"
                    label='login'
                    size="medium"
                    placeholder='user'
                />
                <Field
                    component={Input}
                    required
                    type="password"
                    name="password"
                    label='password'
                    size="medium"
                    placeholder='password'
                />
                <div className={styles.button}>
                    <Button
                        size="large"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        variant="contained"
                        color="primary"
                    >
                        signIn
                    </Button>
                </div>
            </Form>
        );
    }

    return (
        <div className={styles.root}>
            <div>
                Sign In
            </div>
            {error && (
                <div className={styles.error}>
                    <Alert severity="error">{error}</Alert>
                </div>
            )}
            <Formik
                validationSchema={VALIDATION_SCHEMA}
                initialValues={INITIAL_VALUES}
                onSubmit={handleSubmitForm}
                validateOnMount
                validateOnBlur
                validateOnChange
            >
                {(props) => renderForm(props)}
            </Formik>
            <div className={styles.form}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>hint</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={styles.hint}>
                        <Typography className={styles.credentials}>
                            credentials
                        </Typography>
                        <Typography>a@a.aa</Typography>
                        <Typography>Password1</Typography>
                        <Typography style={{ marginTop: "20px" }}>
                            <Button variant="outlined" onClick={handleClick}>
                                lazy button
                            </Button>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
};

export default LoginPage;
