import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-logo',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.scss'],
})
export class HeaderLogoComponent implements OnInit {
  @Input() title!: string;

  @Input() imageSource!: string;

  @Output() loadImageFinished = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.title = this.title.toUpperCase();
  }

  onImageLoadSuccess() {
    this.loadImageFinished.emit(true);
  }

  onImageLoadFailed() {
    this.loadImageFinished.emit(false);
  }
}
