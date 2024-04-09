import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Editorial } from '../model/editorial.model';
import { RouterLink } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editorial-list',
  standalone: true,
  imports: [RouterLink, NgbAlertModule],
  templateUrl: './editorial-list.component.html',
  styleUrl: './editorial-list.component.css'
})
export class EditorialListComponent {
  editorials: Editorial[] = [];
  showDeletedEditorialMessage: boolean = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadeditorials();
  }
  
  delete(editorial: Editorial) {
    const url = 'https://fullstack-byvu.onrender.com/api/editorials/' + editorial.id;
    this.httpClient.delete(url).subscribe((response) => {
      this.loadeditorials();
      this.showDeletedEditorialMessage = true;
    }); // recarga los libros despues de borrar
  }
  
  hideDeletedEditorialMessage() {
    this.showDeletedEditorialMessage = false;
  }
  
  private loadeditorials() {
    const url = 'https://fullstack-byvu.onrender.com/editorials';
    this.httpClient.get<Editorial[]>(url).subscribe(editorials=>this.editorials=editorials);
  }
}
