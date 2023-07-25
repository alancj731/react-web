import React from "react";
import { Grid} from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivitiesList from "./ActivitiesList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../../form/ActivityForm";

interface Props {
    activities: Activity [];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelAcvitity: () => void;
}

export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelAcvitity}: Props) {
  return (
    <>
      <Grid>
        <Grid.Column width="10">
          <ActivitiesList activities = {activities} selectActivity = {selectActivity}/>
        </Grid.Column>
        <Grid.Column width="6">
          {selectedActivity && <ActivityDetails activity = {selectedActivity} cancelActivity={cancelAcvitity}/>}
          <ActivityForm />
        </Grid.Column>
        
      </Grid>
    </>
  );
}
