import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookFormComponent } from './book-form/book-form.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { AuthorFormComponent } from './author-form/author-form.component';
import { EditorialDetailComponent } from './editorial-detail/editorial-detail.component';
import { EditorialListComponent } from './editorial-list/editorial-list.component';
import { EditorialFormComponent } from './editorial-form/editorial-form.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { userRoleGuard } from './authentication/user-role.guard';
import { AccountFormComponent } from './account-form/account-form.component';
import { AvatarFormComponent } from './avatar-form/avatar-form.component';
import { userLoggedGuard } from './authentication/user-logged-in.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/books',
        pathMatch: 'full'
    },
    {
        path: 'books',
        component: BookListComponent
    },
    {
        path: 'books/:id/detail',
        component: BookDetailComponent,
        canActivate: [userLoggedGuard]
    },
    {
        path: 'books/create',
        component: BookFormComponent,
        canActivate: [userRoleGuard]
    },
    {
        path: 'books/:id/reserve',
        component: ReservationFormComponent
    },
    {
        path: 'books/:id/update',
        component: BookFormComponent,
        canActivate: [userRoleGuard]
    },
    {
      path: 'books/:id/reserve',
      component: ReservationFormComponent
    },
    {
        path: 'authors',
        component: AuthorListComponent
    },
    {
        path: 'authors/:id/detail',
        component: AuthorDetailComponent
    },
    {
        path: 'authors/:id/update',
        component: AuthorFormComponent,
        canActivate: [userRoleGuard]
    },
    {
        path: 'authors/create',
        component: AuthorFormComponent,
        canActivate: [userRoleGuard]
    },
    {
        path: 'editorials',
        component: EditorialListComponent
    },
    {
        path: 'editorials/:id/detail',
        component: EditorialDetailComponent
    },
    {
        path: 'editorials/:id/update',
        component: EditorialFormComponent
    },
    {
        path: 'editorials/create',
        component: EditorialFormComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'account',
      component: AccountFormComponent
    },
    {
      path: 'avatar',
      component: AvatarFormComponent
    }
];
