import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer(function ActivityForm() {
    
    const {activityStore} = useStore();

    const {selectedActivity, closeForm, createOrEdit, submitting} = activityStore;

    const initialActivity = selectedActivity ?? {
        id: '',
        title:'',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    }

    const [activity, setActivity] = useState(initialActivity);
    
    function handelSubmit() {
        createOrEdit(activity);
        // console.log(activity);
    }

    function handelInput( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }
    return (
        <Segment clearing>
            <Form onSubmit={handelSubmit} autoComplete='off'>
                <Form.Input placeholder="Title" value={activity.title} 
                name='title' onChange={handelInput}/>

                <Form.TextArea placeholder="Description" value={activity.description} 
                name='description' onChange={handelInput}/>

                <Form.Input placeholder="Category" value={activity.category} 
                name='category' onChange={handelInput}/>

                <Form.Input type="date" placeholder="Date" value={activity.date} 
                name='date' onChange={handelInput}/>

                <Form.Input placeholder="City" value={activity.city} 
                name='city' onChange={handelInput}/>

                <Form.Input placeholder="Venue" value={activity.venue} 
                name='venue' onChange={handelInput}/>

                <Button loading={submitting} floated="right" color="blue" type="submit" content="Submit" />
                <Button onClick={() => closeForm()} floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    )
})