import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
    activities = new Map<string, Activity> ();
    selectedActivity: Activity|undefined = undefined;
    editMode = false;
    submitting = false;
    deleting = false;
    loading = false;
    initialLoading = true;
    
    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activities.values()).sort( (a,b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {

        try {
            var activitieslist = await agent.Activities.list();
            runInAction(() => {
                activitieslist.forEach(activity => {
                // change date format
                activity.date = activity.date.split('T')[0];
                this.activities.set(activity.id, activity);
                //this.activities.push(activity);
                })
                this.setLoadingInitial(false);
            })
        }
        catch(error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
        
        
    }

    setActivities = (activities: Map<string, Activity>) => {
        this.activities = activities;
    }

    setLoadingInitial = (state: boolean) => {
        this.initialLoading = state;
    }

    setEditMode = (mode: boolean) => {
        this.editMode = mode;
    }

    setSubmitting = (submitting: boolean) => {
        this.submitting = submitting;
    }

    setDeleting = (deleting: boolean) => {
        this.deleting = deleting;
    }

    setLoading = (loading: boolean) => {
           this.loading = loading;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id? this.selectActivity(id) : this.cancelSelectedActivity();
        this.setEditMode(true);
    }
    
    closeForm = () => {
        this.setEditMode(false);
    }

    createOrEdit = (activity: Activity) => {
        console.log("handelCreateOfEdit", activity, activity.id)
        // set submitting status
        this.setSubmitting(true);
        this.setLoading(true);
        if (activity.id)
        {
          agent.Activities.update(activity)
          .then(() =>{
            this.activities.set(activity.id, activity);
            this.selectActivity(activity.id);
            this.setEditMode(false);
            this.setSubmitting(false);
            this.setLoading(false);
          })
          .catch(error => {
            console.log(error);
            runInAction(()=>{
                this.setSubmitting(false);
                this.setLoading(false); 
            })
          });
        } 
        else
        {
          activity.id = uuid();
          agent.Activities.create(activity)
            .then(() =>{
            this.activities.set(activity.id, activity);
            this.selectActivity(activity.id);
            this.setEditMode(false);
            this.setSubmitting(false);
            this.setLoading(false);
            })
            .catch(error => {
                console.log(error);
                runInAction(()=>{
                    this.setSubmitting(false);
                    this.setLoading(false); 
                })
            });
        }
      }
    
    deleteActivity = (id: string) => {
        this.setDeleting(true);
        agent.Activities.delete(id)
        .then( () => {
          this.activities.delete(id);
          // handel delete the selected activity
          if (typeof this.selectedActivity !== "undefined" && this.selectedActivity.id === id)
            this.cancelSelectedActivity();
          this.setDeleting(false);
        })
        .catch(error => {
            console.log(error);
            this.setDeleting(false);
        })
      }

}