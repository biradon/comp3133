import { Routes } from '@angular/router';
import { TableListComponent } from './table-list/table-list.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';
import { AddFormComponent } from './add-form/add-form.component';
import { EditFormComponent } from './edit-form/edit-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginFormComponent},
    { path: 'list', component: TableListComponent},
    { path: 'add', component: AddFormComponent},
    { path: 'edit', component: EditFormComponent},
    { path: '**', component: NotFoundComponent }
];
