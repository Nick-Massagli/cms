import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
  @Input() message: Message;

  constructor() { }

  ngOnInit(): void {
  }

}
