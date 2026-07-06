import { Logo } from "./Logo";

export function RotateNotice() {
  return (
    <div className="rotate-notice" role="status">
      <div className="rotate-notice__logo">
        <Logo tone="light" />
      </div>
      <div className="rotate-icon" aria-hidden="true">
        <span />
        <span />
      </div>
      <p>Por favor gire su dispositivo a posición vertical</p>
    </div>
  );
}
