import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const DELETE = "delete";
const UPDATE = "update";
const CREATE = "create";

type Props = {
  type: string | null;
  setType: Dispatch<SetStateAction<string | null>>;
};

export default function ActionButtons({ type, setType }: Props) {
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openConfirm = (action: string) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setPendingAction(action);
    setModalOpen(true);
  };

  const applyAction = (action: string | null) => {
    setModalOpen(false);
    setPendingAction(null);
    // toggle type behavior preserved from your original
    if (action) {
      setType((prev) => (prev === action ? null : action));
    }
    // restore focus
    setTimeout(() => lastFocusedRef.current?.focus(), 0);
  };

  // Close with ESC and simple focus-trap
  useEffect(() => {
    if (!modalOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
        setPendingAction(null);
        lastFocusedRef.current?.focus();
      } else if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    // focus first button in modal
    setTimeout(() => {
      const el = modalRef.current?.querySelector<HTMLElement>('button[data-role="confirm-yes"]');
      el?.focus();
    }, 0);

    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  return (
    <>
      <div className="action-buttons">
        <button
          className={`btn btn--create ${type === CREATE ? "is-active" : ""}`}
          aria-pressed={type === CREATE}
          onClick={() => setType((prev) => (prev === CREATE ? null : CREATE))}
          title="Create users"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
            <path fill="currentColor" d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Create</span>
        </button>

        <button
          className={`btn btn--update ${type === UPDATE ? "is-active" : ""}`}
          aria-pressed={type === UPDATE}
          onClick={() => openConfirm(UPDATE)}
          title="Update selected users"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
            <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M3 12h3l3 8 7-16 3 6h3" />
          </svg>
          <span>Update</span>
        </button>

        <button
          className={`btn btn--delete ${type === DELETE ? "is-active" : ""}`}
          aria-pressed={type === DELETE}
          onClick={() => openConfirm(DELETE)}
          title="Delete selected users"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
            <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M10 6V4h4v2" />
          </svg>
          <span>Delete</span>
        </button>
      </div>

      {modalOpen && pendingAction && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div className="modal" ref={modalRef}>
            <h3 id="confirm-title" className="modal-title">
              {pendingAction === DELETE && "Delete selected users"}
              {pendingAction === UPDATE && "Update selected users"}
            </h3>

            <p className="modal-body">
              You are going to <strong>{pendingAction.toUpperCase()}</strong> the selected items. This action can be applied to the currently selected users.
            </p>

            <div className="modal-actions">
              <button
                className="btn btn--confirm"
                data-role="confirm-yes"
                onClick={() => applyAction(pendingAction)}
              >
                Yes, {pendingAction}
              </button>

              <button
                className="btn btn--ghost"
                onClick={() => {
                  setModalOpen(false);
                  setPendingAction(null);
                  lastFocusedRef.current?.focus();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}