import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit {
  document: Document;

  nativeWindow: any;

  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute, private windowRefService: WindRefService) {
    this.nativeWindow = windowRefService.getNative();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.document = this.documentService.getDocument(params['id']);
      }
    )
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }
}
