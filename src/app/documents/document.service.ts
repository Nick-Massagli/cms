import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  maxDocumentId: number;
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    this.getDocuments();
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    // return this.documents.slice();

    this.http.get('https://nmasscms-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0)
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = +document.id;

      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null || newDocument === undefined) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument === null || originalDocument === undefined || newDocument === null || newDocument === undefined) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (document === null || document === undefined) {
      return;
    }
    const pos = this.documents.indexOf(document);
    
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  storeDocuments() {
    let documents = JSON.stringify(this.documents);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('https://nmasscms-default-rtdb.firebaseio.com/documents.json', documents, { headers: headers })
      .subscribe(
        () => {
          this.documentListChangedEvent.next(this.documents.slice());
        }
      )
  }
}