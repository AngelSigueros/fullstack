import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookFormComponent } from './book-form/book-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { AuthorFormComponent } from './author-form/author-form.component';
import { EditorialDetailComponent } from './editorial-detail/editorial-detail.component';
import { EditorialListComponent } from './editorial-list/editorial-list.component';
import { EditorialFormComponent } from './editorial-form/editorial-form.component';

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
        component: BookDetailComponent
    },
    {
        path: 'books/create',
        component: BookFormComponent
    },
    {
        path: 'books/:id/update',
        component: BookFormComponent
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
        component: AuthorFormComponent
    },
    {
        path: 'authors/create',
        component: AuthorFormComponent
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
    {   path: '**', 
        component: NotFoundComponent
    }
];
