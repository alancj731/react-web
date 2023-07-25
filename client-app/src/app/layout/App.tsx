import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { Container} from "semantic-ui-react";
import { Activity } from "../models/activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';
import { UUID } from "crypto";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined); 
  const [editMode, setEditMode] = useState(false);

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
    console.log("handelCreateOfEdit", activity, activity.id)
    activity.id 
    ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    : setActivities([...activities, {...activity, id: uuid()}]);
    setSelectedActivity(activity);
    setEditMode(false);
    console.log(activity.id.toString());
  }

  function handelDelete(id: string) {
    setActivities([...activities.filter(x => x.id !== id)]);
  }
  // initialize data through api interface
  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

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
        />
      </Container>
    </>
  );
}

export default App;
