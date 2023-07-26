import React, { SyntheticEvent, useState } from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Prop {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  deleting: boolean;
}

export default function ActivitiesList({ activities, selectActivity, deleteActivity, deleting }: Prop) {
  
  const [target, setTarget] = useState("");
  
  function onHandelDelete(e: SyntheticEvent<HTMLButtonElement>, id: string, ) {
    // set target to current clicked button's name
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }
  
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button onClick={() => selectActivity(activity.id)} floated="right" content="View" color="blue" />
                <Button
                  name={activity.id} 
                  loading={deleting && target == activity.id} 
                  onClick={(e) => onHandelDelete(e, activity.id)} 
                  floated="right" 
                  content="Delete" 
                  color="red" />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
