"use client";

import { useEffect, useId, useRef, useState } from "react";

type CustomSelectProps = {
  label: string;
  value: string;
  options: string[];
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
};

export function CustomSelect({
  label,
  value,
  options,
  required = false,
  error,
  onChange
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div className={`custom-select ${error ? "has-error" : ""}`} ref={ref}>
      <label id={`${id}-label`}>
        {label} {required ? <span aria-hidden="true">*</span> : null}
      </label>
      <button
        type="button"
        aria-labelledby={`${id}-label`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
      >
        <span>{value || label}</span>
        <span className="chevron" aria-hidden="true" />
      </button>
      {open ? (
        <ul role="listbox" aria-labelledby={`${id}-label`} tabIndex={-1}>
          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={option === value}
              tabIndex={0}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onChange(option);
                  setOpen(false);
                }
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      ) : null}
      {error ? (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
