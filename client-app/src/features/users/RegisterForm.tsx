import { ErrorMessage, Formik } from "formik";
import { Button, Form, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/Store";
import * as yup from 'yup';
import ValidationError from "../errors/ValidationError";

export default observer(function RegisterForm(){
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{displayName: '', userName: '', email: '', password: ''}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => setErrors(error))}
            validationSchema={yup.object({
                displayName: yup.string().required(),
                userName: yup.string().required(),
                email: yup.string().required(),
                password: yup.string().required(),
            })}
            >
            {({handleSubmit, isSubmitting, isValid, dirty, errors}) => (
                <Form className="ui form error" 
                    onSubmit={handleSubmit} autoComplete="off">
                        <Header as="h2" content="Sign up to Reactivities" color="teal" textAlign="center" />
                    <MyTextInput placeholder="Display Name" name="displayName" />
                    <MyTextInput placeholder="UserName" name="userName" />
                    <MyTextInput placeholder="Email" name="email" type="email" />
                    <MyTextInput placeholder="Password" name="password" type="password" />
                    <ErrorMessage name="error" render={() =>    <ValidationError errors={errors.error as unknown as string[]} />}
                    />
                    <Button 
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} 
                        positive 
                        content="Register" 
                        type="submit" 
                        fluid 
                    />
                </Form>
            )}
        </Formik>
    )
})