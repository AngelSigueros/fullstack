import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../model/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '../model/author.model';
import { Editorial } from '../model/editorial.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {

  /*
  bookForm = this.fb.group({
    id: [0],
    isbn: [''],
    price: [0.0],
    author: this.fb.group({
      id: [0],
      fullName: [''],
      country: [''],
      active: [false]
    })
  });
  */
  bookForm = new FormGroup({
    id: new FormControl<number>(0),
    title: new FormControl<string>(''),
    isbn: new FormControl<string>(''),
    price: new FormControl<number>(0.0),
    publishDate: new FormControl<Date>(new Date()),
    available: new FormControl<boolean>(false),
    author: new FormControl(),
    editorial: new FormControl()
  });

  isUpdate: boolean = false; // por defecto estamos en CREAR no en ACTUALIZAR
  authors: Author[] = []; // array de autores para asociar un autor al libro
  editorials: Editorial[] = [];

  constructor(
      private fb: FormBuilder,
      private httpClient: HttpClient,
      private router: Router,
      private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
      // cargar autores de backend para el selector de autores en el formulario
      this.httpClient.get<Author[]>('http://localhost:8080/api/authors')
      .subscribe(authors => this.authors = authors);

      this.httpClient.get<Editorial[]>('http://localhost:8080/api/editorials')
      .subscribe(editorials => this.editorials = editorials);

      this.activatedRoute.params.subscribe(params => {
        const id = params['id'];
        if(!id) return;

        this.httpClient.get<Book>('http://localhost:8080/api/books/' + id).subscribe(bookFromBackend => {
          // cargar el libro obtenido en el formulario bookForm
          this.bookForm.patchValue(bookFromBackend);

          // this.bookForm.reset({
          //   id: bookFromBackend.id,
          //   isbn: bookFromBackend.isbn,
          //   price: bookFromBackend.price,
          //   author: bookFromBackend.author
          // });

          // marcar boolean true isUpdate
          this.isUpdate = true;

        });
      });
    }

    save () {
      const book: Book = this.bookForm.value as Book;
      console.log(book);

      if (this.isUpdate) {
        const url = 'http://localhost:8080/api/books/' + book.id;
        this.httpClient.put<Book>(url, book).subscribe(bookFromBackend => {
          this.router.navigate(['/books', bookFromBackend.id, 'detail']);
        });

      } else {
        const url = 'http://localhost:8080/api/books';
        this.httpClient.post<Book>(url, book).subscribe(bookFromBackend => {
          this.router.navigate(['/books', bookFromBackend.id, 'detail']);
        });
      }
    }

    compareObjects(o1: any, o2: any): boolean {
      if(o1 && o2) {
        return o1.id === o2.id;
      }
      return o1 === o2;
    }


}



// Mio no va, no selecciona id author

// import { HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { Book } from '../models/book.model';
// import { Author } from '../models/author.model';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-book-form',
//   standalone: true,
//   imports: [HttpClientModule, ReactiveFormsModule],
//   templateUrl: './book-form.component.html',
//   styleUrl: './book-form.component.css',
// })
// export class BookFormComponent implements OnInit {

//   isUpdated: boolean = false;
//   authors: Author[]=[]; // Lista de autores para añadir/asociar al libro

//   bookForm = this.fb.group({
//     id: [0],
//     title: [''],
//     isbn: [''],
//     price: [0.0],
//     publishDate: [new Date()],
//     author: this.fb.group({
//       id: [0],
//       name: [''],
//       country: [''],
//       active: [true]
//     })
//   });

//   constructor(
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private router: Router,
//     private activateRoute: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     console.log('BookFormComponent - OnInit');

//     this.http.get<Author[]>("http://localhost:8080/api/authors").subscribe(a=>this.authors=a);

//     this.activateRoute.params.subscribe((params) => {
//       const id = params['id'];
//       console.log(id);
//       if (!id) return;
//       this.http
//         .get<Book>('http://localhost:8080/api/books/' + id)
//         .subscribe((book) => {

//           //this.bookForm.patchValue(book);
          
//           this.bookForm.reset({
//             id: book.id,
//             title: book.title,
//             isbn: book.isbn,
//             price: book.price,
//             publishDate: book.publishDate,
//             author: book.author
//           });
//           // marcar boolean true isUpdate
          
//           this.isUpdated = true;
//         });
//     });
//   }

//   save () {
//     const book: Book = this.bookForm.value as Book;

//     if (this.isUpdated) {
//       const url = 'http://localhost:8080/api/books/' + book.id;
//       this.http.put<Book>(url, book).subscribe(bookFromBackend => {
//         this.router.navigate(['/books', bookFromBackend.id, 'detail']);
//       });

//     } else {
//       const url = 'http://localhost:8080/api/books';
//       this.http.post<Book>(url, book).subscribe(bookFromBackend => {
//         this.router.navigate(['/books', bookFromBackend.id, 'detail']);
//       });
//     }
//   }


//   compareObjects(o1: any, o2: any): boolean {
//     if(o1 && o2) {
//       return o1.id === o2.id;
//     }
//     return o1 === o2;
//   }


// /* Mio q no recupera el id del author

//   save() {
//     const book: Book = this.bookForm.value as Book;
//     console.log(book);

//     if (this.isUpdated) {
//       const url = 'http://localhost:8080/api/books/'+ book.id;
//       console.log(url);
//       this.http.put<Book>(url, book).subscribe(book=>
//         this.router.navigate(['/books', book.id, 'detail']));
//     } else {
//       const url = 'http://localhost:8080/api/books';
//       console.log(url);
//       this.http.post<Book>(url, book).subscribe(book=>
//         this.router.navigate(['/books', book.id, 'detail']));
//     }
//   }
// */

// /*
//   save2() {
//     // Mas rapido, Recoger datos del form
//     const book: Book = {
//       id: this.bookForm.get('id')?.value ?? 0,
//       title: this.bookForm.get('title')?.value ?? '',
//       isbn: this.bookForm.get('isbn')?.value ?? '',
//       price: this.bookForm.get('price')?.value ?? 0,
//       publishDate: this.bookForm.get('publishDate')?.value ?? new Date(),
//       //author: this.bookForm.get('author')?.get('name')?.value ?? '',
//     };
//     console.log(book);

//     // Mas rapido, Recoger datos del form
//     const book2: Book = this.bookForm.value as Book;

//     const url = 'http://localhost:8080/api/books';

//     // this.http.post<Book>(url, book).subscribe(book=>{
//     //   console.log(book);
//     //   // navegar hacia el listado
//     //   //this.router.navigate(['/books']);
//     //   // o navegar hacia el listado
//     //   this.router.navigate(['/books', book.id, 'detail']);
//     //   }, error=>{
//     //     window.alert("Errroorr: Datos incorrectos");
//     //   });

//     // Para evitar el deprecated
//     this.http.post<Book>(url, book).subscribe({
//       // si todo ok va a next
//       next: (book) => this.router.navigate(['/books', book.id, 'detail']),
//       // si va mal va a error
//       error: (error) => window.alert('Errroorr: Datos incorrectos'),
//     });
//   }
//   */
// }
