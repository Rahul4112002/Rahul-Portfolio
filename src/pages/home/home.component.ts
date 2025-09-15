
import { Component, ChangeDetectionStrategy, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    this.revealElements.forEach(el => {
      revealObserver.observe(el.nativeElement);
    });
  }

  onFormSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    alert('Thank you for your message! This is a demo form.');
    form.reset();
  }
}
