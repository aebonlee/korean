import { useEffect } from 'react';

export function useTableScroller() {
  useEffect(() => {
    const tables = document.querySelectorAll('table');
    tables.forEach((table) => {
      if (table.parentElement?.classList.contains('table-scroll-wrapper')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'table-scroll-wrapper';
      table.parentNode!.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }, []);
}

export default useTableScroller;
