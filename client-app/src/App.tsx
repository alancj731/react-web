import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState([]);

  // initialize data through api interface
  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((response) => {
      setActivities(response.data);
    });
  }, []);

  return (
    <div className="App">
      <Header as="h2" content="Reactivities" />
      <List>
        {activities != null ? (
          activities.map((activity: any) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))
        ) : (
          <h3>No Data Found</h3>
        )}
      </List>
    </div>
  );
}

export default App;
