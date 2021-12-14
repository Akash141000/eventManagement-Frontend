import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EventListComponent } from './event-list/event-list.component';
import { AddEventComponent } from './add-event/create-event/add-event.component';
import { EventItemComponent } from './event-list/event-item/event-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EventItemComponent,EventListComponent, AddEventComponent],
  imports: [CommonModule,FormsModule],
  exports: [EventItemComponent,EventListComponent,AddEventComponent],
})
export class EventsModule{}
