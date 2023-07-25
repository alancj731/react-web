import React from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Card, Image } from "semantic-ui-react";

interface Props {
  activity: Activity;
  cancelActivity: () => void;
}

export default function ActivityDetails({ activity, cancelActivity }: Props) {
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
            <Button basic content="Edit"  color="blue"/>
            <Button onClick={cancelActivity} basic content="Cancel" color="grey"/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
