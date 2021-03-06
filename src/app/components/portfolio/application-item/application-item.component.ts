import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { slideInAnimation } from './application-item.animations';
import { Application } from './application.class';

@Component({
  selector: 'app-application',
  templateUrl: './application-item.component.html',
  styleUrls: ['./application-item.component.scss'],
  animations: [slideInAnimation],
})
export class ApplicationItemComponent implements OnInit {
  @Input() app: Application;
  @Input() animation: boolean = true;

  @ViewChild('container') private container: ElementRef;

  public slideIn: string;

  constructor() {}

  ngOnInit(): void {
    if (this.animation) {
      this.slideIn = 'hide';
    } else {
      this.slideIn = 'visible';
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    let elementOffset: number =
      this.container.nativeElement.getBoundingClientRect().top;
    let viewHeight: number = window.innerHeight;
    if (elementOffset <= viewHeight * 0.8 && this.slideIn === 'hide') {
      this.slideIn = 'visible';
    }
  }

  goToLink(link: string) {
    window.open(link, '_blank');
  }
}
