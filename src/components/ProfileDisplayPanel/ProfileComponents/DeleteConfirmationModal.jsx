"use client";
import { useEffect, useRef } from 'react';

export default function DeleteConfirmationModal({ onConfirm, onCancel }) {
    const cancelRef = useRef(null);

    useEffect(() => {
        cancelRef.current?.focus(); // land on the safe (Cancel) action, not Delete
        const onKeyDown = (e) => { if (e.key === 'Escape') onCancel(); };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onCancel]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onCancel}>
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-account-title"
                className="w-full max-w-md rounded-lg bg-card p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 id="delete-account-title" className="mb-4 text-xl font-bold">Confirm Account Deletion</h3>
                <p className="mb-6 text-muted-foreground">
                    Are you sure you want to delete your account? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        ref={cancelRef}
                        onClick={onCancel}
                        className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground transition duration-200 hover:bg-secondary/80"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="rounded-md bg-destructive px-4 py-2 text-destructive-foreground transition duration-200 hover:bg-destructive/90"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}
