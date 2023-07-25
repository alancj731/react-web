import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { Container} from "semantic-ui-react";
import { Activity } from "../models/activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined); 

  function selectActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function cancelSelectedActivity() {
    setSelectedActivity(undefined);
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
      <Navbar />
      <Container style = {{marginTop: '7em'}}>
        <ActivityDashboard activities = {activities} selectedActivity={selectedActivity} selectActivity={selectActivity} cancelAcvitity={cancelSelectedActivity} />
      </Container>
    </>
  );
}

export default App;
