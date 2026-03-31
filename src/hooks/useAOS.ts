import { useEffect, useRef } from 'react';

export function useAOS({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  once = true
} = {}) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-aos]');

    if (elements.length === 0) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);
          const duration = el.getAttribute('data-aos-duration');

          if (duration) {
            (el as HTMLElement).style.transitionDuration = `${duration}ms`;
          }

          if (delay > 0) {
            setTimeout(() => {
              el.classList.add('aos-animate');
            }, delay);
          } else {
            el.classList.add('aos-animate');
          }

          if (once) {
            observerRef.current?.unobserve(el);
          }
        } else if (!once) {
          entry.target.classList.remove('aos-animate');
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin
    });

    elements.forEach((el) => {
      el.classList.remove('aos-animate');
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [threshold, rootMargin, once]);
}

export default useAOS;
