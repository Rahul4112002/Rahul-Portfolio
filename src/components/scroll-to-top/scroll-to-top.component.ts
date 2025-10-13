
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onWindowScroll()'
  }
})
export class ScrollToTopComponent {
  isVisible = signal(false);

  onWindowScroll(): void {
    const yOffset = window.pageYOffset;
    const isVisible = yOffset > 300;
    if (isVisible !== this.isVisible()) {
      this.isVisible.set(isVisible);
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
