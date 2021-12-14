import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IEvent } from "../event.model";
import { EventsService } from "../events.service";

@Component({
    selector:"app-event-list",
    templateUrl:"./event-list.component.html",
    styleUrls:["./event-list.component.scss"],
})
export class EventListComponent implements OnInit,OnDestroy{
    isTrue:boolean = true;
    events :IEvent[] = [];
    eventsSub:Subscription;
    constructor(private eventsSrv:EventsService){}

    ngOnInit(){
        this.eventsSub = this.eventsSrv.events.subscribe(events=>{
            this.events = events;
        })
    }

    ngOnDestroy(){
        this.eventsSub.unsubscribe();
    }

    fetchAll(){
        this.eventsSrv.fetchAll();
    }
}