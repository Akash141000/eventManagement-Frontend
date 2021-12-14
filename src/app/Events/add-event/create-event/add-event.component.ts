import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IEvent } from '../../event.model';
import { EventsService } from '../../events.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  constructor(private eventSrv:EventsService) { }

  ngOnInit(): void {
  }

  addEvent(form:NgForm){
  this.eventSrv.addEvent(form.value as IEvent).subscribe(result=>{
    console.log(result.message)
});
  }

}
