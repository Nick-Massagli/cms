import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy{
  private subscription: Subscription;
  documents: Document[] = [];
  
    
    constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    )
    this.documentService.getDocuments();
  }

  //onSelectedDocument(document: Document) {
    //this.documentService.documentSelectedEvent.emit(document);
 // }

 ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
