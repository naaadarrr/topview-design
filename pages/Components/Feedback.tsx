import React from 'react';
import { Language, translations } from '../../translations';
import './glass-specimens.css';

interface FeedbackProps {
  language: Language;
}

const ALERT_PATHS: Record<string, string[]> = {
  info: ['M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z', 'M10 9.2v4.1', 'M10 6.7h.01'],
  success: ['M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z', 'M6.9 10.2l2.2 2.2 4-4.4'],
  warning: ['M10 3.6 17 16H3L10 3.6Z', 'M10 8.4v3.4', 'M10 14h.01'],
  danger: ['M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z', 'M7.6 7.6l4.8 4.8', 'M12.4 7.6l-4.8 4.8'],
};

const AlertIcon: React.FC<{ tone: string }> = ({ tone }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    {(ALERT_PATHS[tone] ?? ALERT_PATHS.info).map((d) => (
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

const PRODUCT_TOAST_ICONS: Record<string, { viewBox: string; circle: string; mark: string; fill: string; width: number }> = {
  success: {
    viewBox: '0 0 20 20',
    circle:
      'M1.66797 9.99935C1.66797 5.39698 5.39893 1.66602 10.0013 1.66602C14.6037 1.66602 18.3346 5.39698 18.3346 9.99935C18.3346 14.6017 14.6037 18.3327 10.0013 18.3327C5.39893 18.3327 1.66797 14.6017 1.66797 9.99935ZM9.16798 13.2612L14.5489 7.88028L13.3704 6.70177L9.16798 10.9042L6.84057 8.57677L5.66206 9.75528L9.16798 13.2612Z',
    mark: 'M9.16608 13.2626L14.547 7.88164L13.3685 6.70312L9.16608 10.9055L6.83867 8.57812L5.66016 9.75664L9.16608 13.2626Z',
    fill: '#00B42A',
    width: 20,
  },
  error: {
    viewBox: '0 0 20 20',
    circle:
      'M1.66797 9.99935C1.66797 5.39698 5.39893 1.66602 10.0013 1.66602C14.6037 1.66602 18.3346 5.39698 18.3346 9.99935C18.3346 14.6017 14.6037 18.3327 10.0013 18.3327C5.39893 18.3327 1.66797 14.6017 1.66797 9.99935ZM6.76312 7.93979L8.82551 10.0022L6.76312 12.0646L7.94163 13.2431L10.004 11.1807L12.0664 13.2431L13.2449 12.0646L11.1825 10.0022L13.2449 7.93979L12.0664 6.76128L10.004 8.82368L7.94163 6.76128L6.76312 7.93979Z',
    mark: 'M6.76172 7.94023L8.82411 10.0026L6.76172 12.065L7.94023 13.2435L10.0026 11.1811L12.065 13.2435L13.2435 12.065L11.1811 10.0026L13.2435 7.94023L12.065 6.76172L10.0026 8.82411L7.94023 6.76172L6.76172 7.94023Z',
    fill: '#F53F3F',
    width: 20,
  },
  info: {
    viewBox: '0 0 20 20',
    circle:
      'M1.66797 10.0001C1.66797 5.39771 5.39893 1.66675 10.0013 1.66675C14.6037 1.66675 18.3346 5.39771 18.3346 10.0001C18.3346 14.6025 14.6037 18.3334 10.0013 18.3334C5.39893 18.3334 1.66797 14.6025 1.66797 10.0001ZM10.8346 7.50008V5.83342H9.16797V7.50008H10.8346ZM9.16797 8.33342V14.1667H10.8346V8.33342H9.16797Z',
    mark: 'M10.8346 7.49992V5.83325H9.16797V7.49992H10.8346ZM9.16797 8.33325V14.1666H10.8346V8.33325H9.16797Z',
    fill: '#165DFF',
    width: 20,
  },
  warning: {
    viewBox: '0 0 21 20',
    circle:
      'M2.16797 10.0003C2.16797 5.39795 5.89893 1.66699 10.5013 1.66699C15.1037 1.66699 18.8346 5.39795 18.8346 10.0003C18.8346 14.6027 15.1037 18.3337 10.5013 18.3337C5.89893 18.3337 2.16797 14.6027 2.16797 10.0003ZM9.66797 12.5003V14.167H11.3346V12.5003H9.66797ZM11.3346 11.667L11.3346 5.83366H9.66797L9.66797 11.667H11.3346Z',
    mark: 'M9.66797 12.4997V14.1663H11.3346V12.4997H9.66797ZM11.3346 11.6663L11.3346 5.83301H9.66797L9.66797 11.6663H11.3346Z',
    fill: '#FF7D00',
    width: 21,
  },
};

const ProductToastIcon: React.FC<{ tone: string }> = ({ tone }) => {
  const icon = PRODUCT_TOAST_ICONS[tone] ?? PRODUCT_TOAST_ICONS.info;
  return (
    <svg
      width={icon.width}
      height={20}
      viewBox={icon.viewBox}
      fill="none"
      aria-hidden="true"
      className="pt-icon"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={icon.circle} fill={icon.fill} />
      <path fillRule="evenodd" clipRule="evenodd" d={icon.mark} fill="white" />
    </svg>
  );
};

const ProductToast: React.FC<{ tone: string; title: string; body: string }> = ({
  tone,
  title,
  body,
}) => (
  <div className="product-toast" data-tone={tone} role={tone === 'warning' || tone === 'error' ? 'alert' : 'status'}>
    <div className="pt-twoline">
      <div className="pt-head">
        <ProductToastIcon tone={tone} />
        <p className="pt-title">{title}</p>
      </div>
      <p className="pt-body">{body}</p>
    </div>
  </div>
);

const GlassToast: React.FC<{ tone: string; title: string; body: string; dataTone: string }> = ({
  tone,
  title,
  body,
  dataTone,
}) => (
  <div className="glass-toast" data-tone={dataTone} role={tone === 'warning' || tone === 'error' ? 'alert' : 'status'}>
    <div className="pt-twoline">
      <div className="pt-head">
        <ProductToastIcon tone={tone} />
        <p className="pt-title">{title}</p>
      </div>
      <p className="pt-body">{body}</p>
    </div>
  </div>
);

const SectionHeading: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="site-h3 mb-6">
    {title}
  </h3>
);

// Alerts moved here from the Glass page (mem640). Markup and glass-specimens.css recipes unchanged.
const Feedback: React.FC<FeedbackProps> = ({ language }) => {
  const t = translations[language].feedback;
  // Sample copy is the locked Chinese set from the glass-alert library (shared with the Rules specimens).
  const zh = translations.zh.glass;
  const alerts = [
    { tone: 'info', title: zh.alertInfoTitle, body: zh.alertInfoBody },
    { tone: 'success', title: zh.alertSuccessTitle, body: zh.alertSuccessBody },
    { tone: 'warning', title: zh.alertWarningTitle, body: zh.alertWarningBody },
    { tone: 'danger', title: zh.alertDangerTitle, body: zh.alertDangerBody },
  ];

  return (
    <div className="glassSpecimens space-y-24">
      <p className="max-w-2xl text-[20px] leading-[26px] font-sans text-white font-normal">
        {t.pageLine}
      </p>

      <section id="glass-alert" className="scroll-mt-8">
        <SectionHeading title={t.alertTitle} />
        <div className="alert-compare">
          <div className="alert-col">
            <SectionHeading title={t.alertATitle} />
            <div className="stage">
              <div className="stack">
                {alerts.map((alert) => (
                    <div
                      key={`a-${alert.tone}`}
                      className="lg-alert"
                      data-tone={alert.tone}
                      role={alert.tone === 'warning' || alert.tone === 'danger' ? 'alert' : 'status'}
                    >
                      <span className="ic">
                        <AlertIcon tone={alert.tone} />
                      </span>
                      <div className="body">
                        <p className="t">{alert.title}</p>
                        <div className="d">{alert.body}</div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>

          <div className="alert-col" id="glass-alert-c">
            <SectionHeading title={t.alertCTitle} />
            <div className="product-toast-stage">
              <div className="stack">
                {alerts.map((alert) => (
                  <ProductToast
                    key={`c-${alert.tone}`}
                    tone={alert.tone === 'danger' ? 'error' : alert.tone}
                    title={alert.title}
                    body={alert.body}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="alert-col" id="glass-alert-d">
            <SectionHeading title={t.alertDTitle} />
            <div className="product-toast-stage">
              <div className="stack">
                {alerts.map((alert) => (
                  <GlassToast
                    key={`d-${alert.tone}`}
                    tone={alert.tone === 'danger' ? 'error' : alert.tone}
                    dataTone={alert.tone}
                    title={alert.title}
                    body={alert.body}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
