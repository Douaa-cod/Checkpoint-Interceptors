import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { CvComponent } from './cv/cv.component';
import { TodoComponent } from './todo/todo.component';
import { ColorChangeComponent } from './color-change/color-change.component'
import { DetailCvComponent } from './detail-cv/detail-cv.component';
import { DetailPersonComponent } from './detail-person/detail-person.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard'
import { NotLoggedGuard } from './guards/not-logged.guard'


const routes: Routes = [
  {
    path: 'CVs',
    children: [
      {
        path: '',
        component: CvComponent
      },
      {
        path: 'addPerson',
        component: AddPersonComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: DetailPersonComponent
      }
    ]
  },
  {
    path: 'Todo',
    component: TodoComponent
  },
  {
    path: 'Mini-words',
    component: ColorChangeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotLoggedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
