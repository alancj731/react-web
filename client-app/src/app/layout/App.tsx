import React, { useState, useEffect } from "react";
import "./styles.css";
import { Container} from "semantic-ui-react";
import { Activity } from "../models/activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponet";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined); 
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);


  function selectActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id));
    setEditMode(false);
  }

  function cancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function handelFormOpen(id?: string) {
    id ? selectActivity(id) : cancelSelectedActivity();
    setEditMode(true);
  }

  function handelFormClose() {
    setEditMode(false);
  }

  function handelCreateOrEdit(activity: Activity) {
    //console.log("handelCreateOfEdit", activity, activity.id)
    // set submitting status
    setSubmitting(true);
    if (activity.id)
    {
      agent.Activities.update(activity).then(() =>{
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      }) 
    } 
    else
    {
      activity.id = uuid();
      agent.Activities.create(activity).then(() =>{
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
    //console.log(activity.id.toString());
  }

  function handelDelete(id: string) {
    setDeleting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setDeleting(false);
    })
  }
  // initialize data through api interface
  useEffect(() => {
        agent.Activities.list().then( response => {
          let activities: Activity[] = [];
          response.forEach(activity => {
            // change date format
            activity.date = activity.date.split('T')[0];
            activities.push(activity);
          }
            );
          setActivities(activities);
          // ending loading status
          setLoading(false);
        })
      }, []);
  
  // start loading indicator
  if (loading) return <LoadingComponent content="Loading data..." inverted={true} />
  return (
    <>
      <Navbar openForm={handelFormOpen}/>
      <Container style = {{marginTop: '7em'}}>
        <ActivityDashboard 
        activities = {activities} 
        selectedActivity={selectedActivity} 
        selectActivity={selectActivity} cancelAcvitity={cancelSelectedActivity}
        editMode = {editMode}
        openForm = {handelFormOpen}
        closeForm = {handelFormClose}
        createOrEdit = {handelCreateOrEdit}
        deleteActivity = {handelDelete}
        submitting = {submitting}
        deleting = {deleting}
        />
      </Container>
    </>
  );
}

export default App;
