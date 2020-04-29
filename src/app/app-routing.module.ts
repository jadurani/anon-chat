import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'c',
    component: ChatComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
