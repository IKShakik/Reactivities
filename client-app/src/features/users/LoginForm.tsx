import { ErrorMessage, Formik } from "formik";
import { Button, Form, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/Store";

export default observer(function LoginForm(){
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => setErrors(error))}
            >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form" 
                    onSubmit={handleSubmit} autoComplete="off">
                        <Header as="h2" content="Login to Reactivities" color="teal" textAlign="center" />
                    <MyTextInput placeholder="Email" name="email" />
                    <MyTextInput placeholder="Password" name="password" type="password" />
                    <ErrorMessage name="error" render={() => <Label style={{marginTop: 10}} basic color="red" content={errors.email} />} />
                    <Button loading={isSubmitting} positive content="Login" type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
})