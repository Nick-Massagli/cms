import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  
  documents: Document[] = [
    new Document(
      '1',
      'Document 1',
      'Lorem ipsum',
      'https://example.com/doc1',
      null
    ),
    new Document(
      '2',
      'Document 2',
      'Lorem ipsum dolor sit amet',
      'https://example.com/doc2',
      null
    ),
    new Document(
      '3',
      'Document 3',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'https://example.com/doc3',
      null
    )
  ];

   constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
