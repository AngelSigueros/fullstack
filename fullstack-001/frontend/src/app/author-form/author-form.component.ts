import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Author } from '../model/author.model';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './author-form.component.html',
  styleUrl: './author-form.component.css',
})
export class AuthorFormComponent implements OnInit {
  authorForm = new FormGroup({
    id: new FormControl(0),
    fullName: new FormControl(''),
    country: new FormControl(''),
    active: new FormControl(false),
    photoUrl: new FormControl(''),
    bio: new FormControl(''),
    // añadir aquí todos los campos de author
  });

  photoFile: File | undefined;
  photoPreview: string | undefined;
  author: Author | undefined;
  isUpdate: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (!id) return;

      this.httpClient
        .get<Author>('http://localhost:8080/api/authors/' + id)
        .subscribe((author) => {
          this.authorForm.reset(author);
          this.isUpdate = true;
          this.author = author;
        });
    });
  }

  onFileChange(event: Event) {
    let target = event.target as HTMLInputElement; // este target es el input de tipo file donde se carga el archivo

    if (target.files === null || target.files.length == 0) {
      return; // no se procesa ningún archivo
    }

    this.photoFile = target.files[0]; // guardar el archivo para enviarlo luego en el save()

    // OPCIONAL: PREVISUALIZAR LA IMAGEN POR PANTALLA
    let reader = new FileReader();
    reader.onload = (event) => (this.photoPreview = reader.result as string);
    reader.readAsDataURL(this.photoFile);
  }

  save() {
    let formData = new FormData();
    formData.append('id', this.authorForm.get('id')?.value?.toString() ?? '0');
    formData.append('fullName', this.authorForm.get('fullName')?.value ?? '');
    formData.append('country', this.authorForm.get('country')?.value ?? '');
    formData.append(
      'active',
      this.authorForm.get('active')?.value?.toString() ?? 'false'
    );
    formData.append('photoUrl', this.authorForm.get('photoUrl')?.value ?? '');
    formData.append('bio', this.authorForm.get('bio')?.value ?? '');

    if (this.photoFile) {
      formData.append('photo', this.photoFile);
    }

    // En caso de que author tenga asociaciones con entidades, ejemplo: Address
    // formData.append('address.id', this.authorForm.get('address')?.value.id)
    // formData.append('editorial.id', this.authorForm.get('address')?.value.id)
    if (this.isUpdate) {
      this.httpClient
        .put<Author>(
          'http://localhost:8080/api/authors/' + this.author?.id,
          formData
        )
        .subscribe((author) => this.navigateToList());
    } else {
      this.httpClient
        .post<Author>('http://localhost:8080/api/authors', formData)
        .subscribe((author) => this.navigateToList());
    }
  }

  private navigateToList() {
    this.router.navigate(['/authors']);

    /*
      this.photoFile = undefined;
      this.photoPreview = undefined;
      console.log(author);
      this.author = author;
      this.authorForm.reset(author); // así se actualiza el id y el photoUrl en el form
      */
  }
}
