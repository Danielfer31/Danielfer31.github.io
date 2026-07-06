"use client";

import { FormEvent, useMemo, useState } from "react";
import { corridors, passengerRanges, quoteSection } from "@/data/content";
import { CustomSelect } from "./CustomSelect";

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  corridor: string;
  passengers: string;
  comment: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  company: "",
  corridor: "",
  passengers: "",
  comment: ""
};

export function DemoForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const isReady = useMemo(
    () =>
      Boolean(
        form.firstName &&
          form.lastName &&
          form.phone &&
          form.email &&
          form.company &&
          form.corridor &&
          form.passengers
      ),
    [form]
  );

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  }

  function validate() {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) nextErrors.firstName = "Este campo es obligatorio.";
    if (!form.lastName.trim()) nextErrors.lastName = "Este campo es obligatorio.";
    if (!form.phone.trim()) nextErrors.phone = "Ingrese un número de teléfono válido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Ingrese un correo electrónico válido.";
    }
    if (!form.company.trim()) nextErrors.company = "Este campo es obligatorio.";
    if (!form.corridor) nextErrors.corridor = "Seleccione una ruta o corredor.";
    if (!form.passengers) nextErrors.passengers = "Seleccione un rango de pasajeros.";
    return nextErrors;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      setForm(initialState);
    }
  }

  return (
    <section id="demo" className="demo-section" aria-labelledby="demo-heading">
      <div className="demo-intro">
        <h2 id="demo-heading">{quoteSection.title}</h2>
        <p>
          Para otras consultas, escríbanos a{" "}
          <a href={`mailto:${quoteSection.contact}`}>{quoteSection.contact}</a>
        </p>
      </div>

      <form className="demo-form" noValidate onSubmit={onSubmit}>
        <FormField
          label="Nombre"
          value={form.firstName}
          error={errors.firstName}
          required
          onChange={(value) => updateField("firstName", value)}
        />
        <FormField
          label="Apellido"
          value={form.lastName}
          error={errors.lastName}
          required
          onChange={(value) => updateField("lastName", value)}
        />
        <div className={`phone-row ${errors.phone ? "has-error" : ""}`}>
          <label htmlFor="phone-input">
            Teléfono <span aria-hidden="true">*</span>
          </label>
          <div>
            <button type="button" aria-label="Código de país Colombia">
              CO <span className="chevron" aria-hidden="true" />
            </button>
            <input
              id="phone-input"
              inputMode="tel"
              value={form.phone}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="+57"
            />
          </div>
          {errors.phone ? (
            <p className="field-error" id="phone-error">
              {errors.phone}
            </p>
          ) : null}
        </div>
        <FormField
          label="Correo electrónico"
          type="email"
          value={form.email}
          error={errors.email}
          required
          onChange={(value) => updateField("email", value)}
        />
        <FormField
          className="span-two"
          label="Empresa"
          value={form.company}
          error={errors.company}
          required
          onChange={(value) => updateField("company", value)}
        />
        <CustomSelect
          label="Ruta o corredor deseado"
          value={form.corridor}
          options={corridors}
          error={errors.corridor}
          onChange={(value) => updateField("corridor", value)}
        />
        <CustomSelect
          label="Número aproximado de pasajeros"
          value={form.passengers}
          options={passengerRanges}
          required
          error={errors.passengers}
          onChange={(value) => updateField("passengers", value)}
        />
        <label className="textarea-field span-two">
          <span>Detalles adicionales</span>
          <textarea value={form.comment} onChange={(event) => updateField("comment", event.target.value)} />
        </label>

        <p className="privacy-note">
          Al enviar esta solicitud usted acepta nuestra{" "}
          <a href="#footer">política de privacidad</a>.
        </p>
        <button className="submit-button" type="submit" disabled={!isReady}>
          Enviar solicitud
        </button>
        {submitted ? (
          <p className="success-message" role="status">
            Solicitud enviada. Un asesor se pondrá en contacto pronto.
          </p>
        ) : null}
      </form>
    </section>
  );
}

function FormField({
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  className = ""
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  const id = label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-");
  return (
    <label className={`form-field ${error ? "has-error" : ""} ${className}`} htmlFor={id}>
      <span>
        {label} {required ? <span aria-hidden="true">*</span> : null}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </label>
  );
}
