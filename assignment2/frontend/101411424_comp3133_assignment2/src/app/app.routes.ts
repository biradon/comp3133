import { Routes } from '@angular/router';
import { TableListComponent } from './table-list/table-list.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';
import { AddFormComponent } from './add-form/add-form.component';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginFormComponent},
    { path: 'list', component: TableListComponent, canActivate: [AuthGuard] },
    { path: 'details/:id', component: DetailsComponent, canActivate: [AuthGuard] },
    { path: 'add', component: AddFormComponent, canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent }
];
