"use client";

import { FormEvent, useState } from "react";

type ReservationState = {
  name: string;
  phone: string;
  email: string;
  groupName: string;
  route: string;
  date: string;
  tripType: string;
  seats: string;
  comment: string;
};

const initialState: ReservationState = {
  name: "",
  phone: "",
  email: "",
  groupName: "",
  route: "",
  date: "",
  tripType: "",
  seats: "",
  comment: ""
};

export function VehicleReservationForm({
  vehicleName,
  tripTypes
}: {
  vehicleName: string;
  tripTypes: string[];
}) {
  const [form, setForm] = useState<ReservationState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ReservationState, string>>>({});

  function updateField(field: keyof ReservationState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  }

  function validate() {
    const nextErrors: Partial<Record<keyof ReservationState, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Ingrese su nombre.";
    if (!form.phone.trim()) nextErrors.phone = "Ingrese un telefono.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Ingrese un correo valido.";
    }
    if (!form.route.trim()) nextErrors.route = "Indique la ruta del viaje.";
    if (!form.date) nextErrors.date = "Seleccione una fecha.";
    if (!form.tripType) nextErrors.tripType = "Seleccione un tipo de viaje.";
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
    <form className="vehicle-booking-form" noValidate onSubmit={onSubmit}>
      <input type="hidden" name="vehicle" value={vehicleName} />

      <FormField
        label="Nombre"
        value={form.name}
        error={errors.name}
        onChange={(value) => updateField("name", value)}
      />
      <FormField
        label="Telefono"
        value={form.phone}
        error={errors.phone}
        onChange={(value) => updateField("phone", value)}
      />
      <FormField
        label="Correo"
        type="email"
        value={form.email}
        error={errors.email}
        onChange={(value) => updateField("email", value)}
      />
      <FormField
        label="Grupo o institucion"
        value={form.groupName}
        onChange={(value) => updateField("groupName", value)}
      />
      <FormField
        label="Ruta"
        value={form.route}
        error={errors.route}
        placeholder="Medellin - Bogota"
        onChange={(value) => updateField("route", value)}
      />
      <FormField
        label="Fecha"
        type="date"
        value={form.date}
        error={errors.date}
        onChange={(value) => updateField("date", value)}
      />
      <label className={`vehicle-form-field ${errors.tripType ? "has-error" : ""}`} htmlFor="vehicle-trip-type">
        <span>Tipo de viaje</span>
        <select
          id="vehicle-trip-type"
          value={form.tripType}
          aria-invalid={Boolean(errors.tripType)}
          onChange={(event) => updateField("tripType", event.target.value)}
        >
          <option value="">Seleccione una opcion</option>
          {tripTypes.map((tripType) => (
            <option key={tripType} value={tripType}>
              {tripType}
            </option>
          ))}
        </select>
        {errors.tripType ? <small>{errors.tripType}</small> : null}
      </label>
      <FormField
        label="Espacios requeridos"
        value={form.seats}
        placeholder="Ej. 32 pasajeros"
        onChange={(value) => updateField("seats", value)}
      />
      <label className="vehicle-form-field vehicle-form-field--wide">
        <span>Notas de reserva</span>
        <textarea
          value={form.comment}
          placeholder="Horario, paradas o necesidades especiales"
          onChange={(event) => updateField("comment", event.target.value)}
        />
      </label>

      <button className="vehicle-booking-submit" type="submit">
        Reservar este vehiculo
      </button>

      {submitted ? (
        <p className="vehicle-booking-success" role="status">
          Reserva demo recibida. Un asesor confirmara disponibilidad y precio final.
        </p>
      ) : null}
    </form>
  );
}

function FormField({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder = ""
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className={`vehicle-form-field ${error ? "has-error" : ""}`}>
      <span>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <small>{error}</small> : null}
    </label>
  );
}
