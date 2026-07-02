"use client"
import { useEffect, useRef } from 'react'

// ponytail: overlay + manual focus/Escape. A native <dialog showModal> would give the
// focus trap for free — swap to it if this needs a full tab-trap, not just initial focus.
function PopUpBox({ isOpen, onClose, title, onConfirm, children, confirmTitle, customStyle, tailwindcss }) {
  const formRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement;
    // Focus the first field (or button) so keyboard/SR users land inside the modal
    const focusable = formRef.current?.querySelector('input, textarea, select, button');
    focusable?.focus();

    const onKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.(); // restore focus to the trigger on close
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        ref={formRef}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Dialog'}
        className={`relative flex w-full max-w-lg flex-col space-y-4 overflow-hidden rounded-lg border border-primary/60 bg-card p-4 shadow-lg ${tailwindcss}`}
        style={customStyle}
        onSubmit={onConfirm}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='mb-2 flex flex-none items-center justify-between'>
          <h2 className='bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-2xl font-bold text-transparent'>{title}</h2>
          <button onClick={onClose} type='button' aria-label="Close dialog" className='text-muted-foreground transition duration-200 hover:text-foreground'>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {children}

        <button
          className="w-full rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground transition duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          type='submit'
        >
          {confirmTitle}
        </button>
      </form>
    </div>
  )
}

export default PopUpBox
