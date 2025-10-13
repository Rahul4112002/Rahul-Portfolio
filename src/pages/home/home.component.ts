
import { Component, ChangeDetectionStrategy, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  styles: [`
    .cv-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: linear-gradient(135deg, #7c3aed, #2563eb);
      color: white;
      font-weight: bold;
      text-decoration: none;
      border-radius: 50px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      min-width: 160px;
      justify-content: center;
      border: none;
    }
    .cv-btn:hover {
      background: linear-gradient(135deg, #6d28d9, #1d4ed8);
      box-shadow: 0 0 25px rgba(147, 51, 234, 0.6);
      transform: translateY(-3px) scale(1.05);
      color: white;
    }
    .cv-btn i {
      font-size: 14px;
    }
    .cv-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: all 0.5s ease;
    }
    .cv-btn:hover::before {
      left: 100%;
    }
    .primary-btn {
      background: linear-gradient(135deg, #ff0080, #00d4ff);
      transition: all 0.3s ease;
    }
    .primary-btn:hover {
      box-shadow: 0 0 20px rgba(255, 0, 128, 0.5);
      transform: translateY(-3px);
    }
    .secondary-btn {
      border: 2px solid #00d4ff;
      color: #00d4ff;
      transition: all 0.3s ease;
      background: transparent;
    }
    .secondary-btn:hover {
      background-color: #00d4ff;
      color: #1a202c;
      box-shadow: 0 0 20px #00d4ff;
      transform: translateY(-3px);
    }
    .social-icons a {
      color: #9ca3af;
      transition: all 0.3s ease;
    }
    .social-icons a:hover {
      color: #ff0080;
      transform: scale(1.2);
    }
    .reveal {
      opacity: 0;
      transform: translateY(50px);
      transition: all 0.8s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `]
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
