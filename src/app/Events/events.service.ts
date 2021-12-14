import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { IEvent } from "./event.model";

@Injectable({providedIn:"root"})
export class EventsService{
    events = new Subject<IEvent[]>();
    constructor(private http:HttpClient){}
   

    fetchAll(){
        this.http.get<[IEvent]>(`${environment.HOST_URL}/api/events/getEvents`).subscribe(events=>{
            this.events.next(events);
        })
    }   

    addEvent(event:IEvent){
      return  this.http.post<{message:string}>(`${environment.HOST_URL}/api/events/addEvent`,{...event});
    }
}