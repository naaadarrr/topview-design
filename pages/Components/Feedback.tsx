import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Language, translations } from '../../translations';
import './glass-specimens.css';

interface FeedbackProps {
  language: Language;
}

const ALERT_A_ICONS: Record<string, string[]> = {
  info: ['M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z', 'M10 9.2v4.1', 'M10 6.7h.01'],
  success: ['M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z', 'M6.9 10.2l2.2 2.2 4-4.4'],
  warning: ['M10 3.6 17 16H3L10 3.6Z', 'M10 8.4v3.4', 'M10 14h.01'],
  error: ['M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z', 'M7.6 7.6l4.8 4.8', 'M12.4 7.6l-4.8 4.8'],
};

const ProductToastIcon: React.FC<{ tone: string }> = ({ tone }) => {
  const paths = ALERT_A_ICONS[tone] ?? ALERT_A_ICONS.info;
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="pt-icon"
      data-tone={tone}
    >
      {paths.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      ))}
    </svg>
  );
};

const GlassToast: React.FC<{
  tone: string;
  title: string;
  body?: string;
  dataTone: string;
}> = ({ tone, title, body, dataTone }) => (
  <div className="glass-toast" data-tone={dataTone} role={tone === 'warning' || tone === 'error' ? 'alert' : 'status'}>
    <ProductToastIcon tone={tone} />
    <div className="pt-twoline">
      <p className="pt-title">{title}</p>
      {body ? <p className="pt-body">{body}</p> : null}
    </div>
  </div>
);

const PILE_LIP = 14;
const PILE_GAP = 10;
const PILE_VISIBLE = 3;

const ToastPile: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pileRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const items = React.Children.toArray(children);

  useLayoutEffect(() => {
    const pile = pileRef.current;
    if (!pile) return;
    const nodes = [...pile.querySelectorAll<HTMLElement>('.toast-pile-item')];
    let cursor = 0;
    nodes.forEach((node, index) => {
      node.style.setProperty('--i', String(index));
      node.style.setProperty('--open-y', `${cursor}px`);
      cursor += node.offsetHeight + PILE_GAP;
    });
    const front = nodes[0]?.offsetHeight ?? 0;
    const lips = Math.min(Math.max(nodes.length - 1, 0), PILE_VISIBLE - 1) * PILE_LIP;
    nodes.forEach((node, index) => {
      const height = node.offsetHeight;
      const scale = 1 - index * 0.05;
      const restY = index === 0 ? 0 : front + index * PILE_LIP - height * scale;
      node.style.setProperty('--rest-y', `${restY}px`);
      node.style.setProperty('--pile-scale', String(scale));
      node.style.setProperty('--clip-top', `${restY < 0 ? -restY : 0}px`);
    });
    pile.style.setProperty('--pile-lip', `${PILE_LIP}px`);
    pile.style.setProperty('--pile-rest', `${front + lips}px`);
    pile.style.setProperty('--pile-open', `${Math.max(cursor - PILE_GAP, front)}px`);
  }, [items]);

  return (
    <div
      ref={pileRef}
      className={open ? 'toast-pile is-open' : 'toast-pile'}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      {items.map((child) => (
        <div className="toast-pile-item" key={React.isValidElement(child) ? child.key : undefined}>
          {child}
        </div>
      ))}
    </div>
  );
};

type DemoToast = {
  id: number;
  tone: string;
  dataTone: string;
  title: string;
  body?: string;
};

const TOAST_LIFE = 4000;

// Alerts moved here from the Glass page (mem640). The toast card recipe is unchanged.
// The stage is a click-to-show pile: each button pushes one card to the front.
const Feedback: React.FC<FeedbackProps> = ({ language }) => {
  const t = translations[language].feedback;
  const copy = translations[language].glass;
  const [toasts, setToasts] = useState<DemoToast[]>([]);
  const nextId = useRef(1);
  const timers = useRef<number[]>([]);

  useEffect(() => () => {
    timers.current.forEach((handle) => window.clearTimeout(handle));
  }, []);

  const dismiss = (id: number) => {
    setToasts((list) => list.filter((toast) => toast.id !== id));
  };

  const dismissLater = (id: number, delay = TOAST_LIFE) => {
    const handle = window.setTimeout(() => dismiss(id), delay);
    timers.current.push(handle);
  };

  const push = (toast: Omit<DemoToast, 'id'>, life = TOAST_LIFE) => {
    const id = nextId.current;
    nextId.current += 1;
    setToasts((list) => [{ ...toast, id }, ...list].slice(0, 4));
    dismissLater(id, life);
    return id;
  };

  const showTone = (tone: 'success' | 'error' | 'warning' | 'info') => {
    const content = {
      success: { title: copy.alertSuccessTitle, body: copy.alertSuccessBody, dataTone: 'success' },
      error: { title: copy.alertDangerTitle, body: copy.alertDangerBody, dataTone: 'danger' },
      warning: { title: copy.alertWarningTitle, body: copy.alertWarningBody, dataTone: 'warning' },
      info: { title: copy.alertInfoTitle, body: copy.alertInfoBody, dataTone: 'info' },
    }[tone];
    push({ tone: tone === 'error' ? 'error' : tone, ...content });
  };

  const triggers: { label: string; onClick: () => void }[] = [
    { label: t.toastSuccess, onClick: () => showTone('success') },
    { label: t.toastError, onClick: () => showTone('error') },
    { label: t.toastWarning, onClick: () => showTone('warning') },
    { label: t.toastInfo, onClick: () => showTone('info') },
  ];

  const pile = toasts.length > 0 ? (
    <div className="toast-dock">
      <ToastPile>
        {toasts.map((toast) => (
          <GlassToast
            key={toast.id}
            tone={toast.tone}
            dataTone={toast.dataTone}
            title={toast.title}
                  body={toast.body}
                />
        ))}
      </ToastPile>
    </div>
  ) : null;

  return (
    <div className="glassSpecimens space-y-24">
      {typeof document !== 'undefined'
        ? createPortal(pile ? <div className="glassSpecimens">{pile}</div> : null, document.body)
        : null}
      <section id="glass-alert" className="scroll-mt-8">
        <div className="product-toast-stage toast-demo" id="glass-alert-d">
          <div className="toast-trigger-row">
            {triggers.map((trigger) => (
              <button key={trigger.label} type="button" className="toast-trigger" onClick={trigger.onClick}>
                {trigger.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
