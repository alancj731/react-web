import React, { useEffect } from "react";
import "./styles.css";
import { Container} from "semantic-ui-react";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponet";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const {activityStore} = useStore();
 
  // initialize data through api interface
  useEffect(() => {
        activityStore.loadActivities();
      }, [activityStore]);
  
  // start loading indicator
  if (activityStore.initialLoading) return <LoadingComponent content="Loading data..." inverted={true} />
  return (
    <>
      <Navbar />
      <Container style = {{marginTop: '7em'}}>        
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
