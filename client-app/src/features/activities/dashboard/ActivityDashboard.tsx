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
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({activities, selectedActivity, 
  selectActivity, cancelAcvitity, editMode, openForm, closeForm, createOrEdit, deleteActivity}: Props) {
  return (
    <>
      <Grid>
        <Grid.Column width="10">
          <ActivitiesList activities = {activities} selectActivity = {selectActivity} deleteActivity={deleteActivity}/>
        </Grid.Column>
        <Grid.Column width="6">
          {selectedActivity && !editMode && <ActivityDetails 
          activity = {selectedActivity} 
          cancelActivity={cancelAcvitity}
          openForm = {openForm}
          />}
          {editMode && <ActivityForm 
          closeForm={closeForm} 
          selectedActivity={selectedActivity} 
          createOrEdit={createOrEdit} 
          />}
        </Grid.Column>
      </Grid>
    </>
  );
}
