import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer(function ActivityDetails() {
  const {activityStore} = useStore();

  const {openForm, cancelSelectedActivity} = activityStore;
  
  const activity = activityStore.selectedActivity!;
  
  return (
    <Card fluid>
      <Image src={`/assets/categoryimages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span >{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group width="2" fluid>
            <Button onClick={()=>openForm(activity.id)} basic content="Edit"  color="blue"/>
            <Button onClick={cancelSelectedActivity} basic content="Cancel" color="grey"/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
})
