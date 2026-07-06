import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Logo } from "@/components/Logo";
import { VehicleReservationForm } from "@/components/VehicleReservationForm";
import { vehicleDetails } from "@/data/content";

type VehiclePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(vehicleDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = vehicleDetails[slug];

  if (!vehicle) {
    return {
      title: "Vehiculo no encontrado | Cootrasec"
    };
  }

  return {
    title: `${vehicle.name} | Reserva demo Cootrasec`,
    description: vehicle.summary
  };
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = vehicleDetails[slug];

  if (!vehicle) {
    notFound();
  }

  return (
    <main className="vehicle-detail-page">
      <nav className="vehicle-detail-nav" aria-label="Navegacion de detalle">
        <a className="vehicle-detail-logo" href="/#top" aria-label="Volver al inicio">
          <Logo />
        </a>
        <div>
          <a href="/#marketplace">Flota</a>
          <a href="#reserve">Reservar</a>
        </div>
      </nav>

      <section className="vehicle-hero" aria-labelledby="vehicle-title">
        <div className="vehicle-hero__copy">
          <a className="vehicle-back-link" href="/#marketplace">
            Volver a la flota
          </a>
          <p className="vehicle-hero__category">{vehicle.category}</p>
          <h1 id="vehicle-title">{vehicle.name}</h1>
          <p>{vehicle.summary}</p>
          <dl className="vehicle-hero__facts">
            <div>
              <dt>Capacidad</dt>
              <dd>{vehicle.passengers}</dd>
            </div>
            <div>
              <dt>Modelo</dt>
              <dd>{vehicle.model}</dd>
            </div>
            <div>
              <dt>Ruta demo</dt>
              <dd>{vehicle.reservation.sampleRoute}</dd>
            </div>
          </dl>
        </div>
        <div className="vehicle-hero__media">
          <img src={vehicle.heroImage} alt={vehicle.alt} />
        </div>
      </section>

      <section className="vehicle-gallery-section" aria-labelledby="gallery-heading">
        <div className="vehicle-section-heading">
          <p>Galeria del vehiculo</p>
          <h2 id="gallery-heading">Vistas por dentro, por fuera y cabina.</h2>
        </div>
        <div className="vehicle-gallery">
          {vehicle.gallery.map((item) => (
            <article key={item.label} className="vehicle-gallery-card">
              <img src={item.image} alt={item.alt} />
              <div>
                <span>{item.label}</span>
                <p>{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="vehicle-info-grid" aria-label="Informacion del vehiculo">
        <div className="vehicle-panel vehicle-panel--spaces">
          <h2>Espacios</h2>
          <dl>
            {vehicle.spaces.map((space) => (
              <div key={space.label}>
                <dt>{space.label}</dt>
                <dd>{space.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="vehicle-panel vehicle-panel--specs">
          <h2>Informacion del vehiculo</h2>
          <dl>
            {vehicle.specs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="vehicle-driver-section" aria-labelledby="driver-heading">
        <div className="vehicle-driver-card">
          <img src={vehicle.driver.image} alt={vehicle.driver.alt} />
          <div>
            <p>{vehicle.driver.role}</p>
            <h2 id="driver-heading">{vehicle.driver.name}</h2>
            <p>{vehicle.driver.bio}</p>
            <dl>
              <div>
                <dt>Experiencia</dt>
                <dd>{vehicle.driver.experience}</dd>
              </div>
              <div>
                <dt>Licencia</dt>
                <dd>{vehicle.driver.license}</dd>
              </div>
              <div>
                <dt>Calificacion</dt>
                <dd>{vehicle.driver.rating}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="reserve" className="vehicle-reserve-section" aria-labelledby="reserve-heading">
        <div className="vehicle-reserve-copy">
          <p>Reserva demo</p>
          <h2 id="reserve-heading">Separe este vehiculo para su proximo viaje.</h2>
          <div className="vehicle-reserve-meta">
            <span>{vehicle.reservation.responseTime}</span>
            <span>{vehicle.reservation.samplePrice}</span>
          </div>
          <div className="vehicle-trip-columns">
            <div>
              <h3>Tipos de viaje</h3>
              <ul>
                {vehicle.tripTypes.map((tripType) => (
                  <li key={tripType}>{tripType}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Incluye</h3>
              <ul>
                {vehicle.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="vehicle-reserve-card">
          <VehicleReservationForm vehicleName={vehicle.name} tripTypes={vehicle.tripTypes} />
        </div>
      </section>
    </main>
  );
}
