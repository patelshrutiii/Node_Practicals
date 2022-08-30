import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatformComponent } from './chatform/chatform.component';


const routes: Routes = [

  {path:"chatform", component: ChatformComponent }
  // {path: "", redirectTo: '/comp2', pathMatch: "full"}, //when blank
  // {path: '**', component: C2Component } //when invalid
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
