import { Button, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/Store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik, Form } from "formik";
import * as yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { v4 as uuid } from 'uuid';

export default observer(function ActivityForm() {
    const navigate = useNavigate();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = yup.object({
        title: yup.string().required('This title is required.'),
        description: yup.string().required('This description is required.'),
        category: yup.string().required('This category is required.'),
        date: yup.string().required('This date is required.'),
        city: yup.string().required('This city is required.'),
        venue: yup.string().required('This venue is required.'),
    });

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!));
        }
    }, [id, loadActivity]);

    function handleFormSubmit(activity: Activity){
        // debugger;
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    if (loadingInitial) {
        return <LoadingComponent content="Loading activity..." />
    }

    return (
        <Segment clearing>
            <Header content="Activity Details" sub color="teal" />
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name="title" placeholder="title" />
                        <MyTextArea  
                            name='description' placeholder='Description' rows={3} />
                        <MySelectInput  
                            name='category' placeholder='Category' options={categoryOptions} />
                        <MyDateInput 
                            name='date' placeholderText='Date' 
                            showTimeSelect
                            timeCaption="time"
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content="Location Details" sub color="teal" />

                        <MyTextInput  name='city' placeholder='City' />
                        <MyTextInput  name='venue' placeholder='Venue' />
                        <Button disabled={isSubmitting || !isValid || !dirty} loading={loading} floated="right" positive type="submit" content="Submit" />
                        <Button as={Link} to='/activities' floated="right" type="button" content="Cancel" />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})