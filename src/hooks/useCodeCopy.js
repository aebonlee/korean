import { useEffect } from 'react';

export function useCodeCopy() {
  useEffect(() => {
    const handleClick = async (e) => {
      const btn = e.target.closest('.code-copy-btn');
      if (!btn) return;

      const codeBlock = btn.closest('.code-block');
      if (!codeBlock) return;

      const code = codeBlock.querySelector('code');
      if (!code) return;

      try {
        await navigator.clipboard.writeText(code.textContent);
        btn.textContent = '✓';
        setTimeout(() => {
          btn.textContent = '📋';
        }, 2000);
      } catch {
        // Clipboard API not available
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}

export default useCodeCopy;
