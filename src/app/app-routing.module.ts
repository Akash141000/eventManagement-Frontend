import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEventComponent } from "./Events/add-event/create-event/add-event.component";
import { EventListComponent } from "./Events/event-list/event-list.component";
import { LoginComponent } from "./Auth/login/login.component";
import { SignupComponent } from "./Auth/signup/signup.component";
import { PaymentsComponent } from "./Payments/payments.component";


const appRoutes:Routes=[
    {path:"",component:EventListComponent},
    {path:"login",component:LoginComponent},
    {path:"signup",component:SignupComponent},
    {path:"event/events",component:EventListComponent},
    {path:"event/create-event",component:AddEventComponent},
    {path:"event/purchase",component:PaymentsComponent}
]


@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}