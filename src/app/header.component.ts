import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: false
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  // @Output() selectedFeatureEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  //onSelected(selectedEvent: string) {
    //this.selectedFeatureEvent.emit(selectedEvent);
  //}
}

