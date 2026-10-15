import { Link } from 'react-router-dom'
import { REFERENCE_ENTRIES, REFERENCE_UE_VERSION_NOTE } from '../data/entries'

export function AboutPage() {
  return (
    <div>
      <h1 className="page-title">Acerca del proyecto</h1>
      <p className="page-subtitle">
        Unreal Engine Quick Reference — herramienta educativa gratuita en español.
      </p>

      <section className="detail-section">
        <h2>Qué es</h2>
        <p>
          Una referencia rápida e interactiva orientada a la consulta práctica: Blueprints como
          prioridad educativa y C++ como extensión para comprender la implementación subyacente.
          No sustituye la documentación oficial de Epic Games.
        </p>
        <p>
          Base actual: <strong>{REFERENCE_ENTRIES.length} entradas</strong> revisadas para Unreal
          Engine {REFERENCE_UE_VERSION_NOTE}.
        </p>
      </section>

      <section className="detail-section">
        <h2>Licencias</h2>
        <ul>
          <li>
            <strong>Código fuente:</strong> MIT (ver <code>LICENSE</code>).
          </li>
          <li>
            <strong>Contenido educativo original:</strong> Creative Commons Attribution 4.0
            International (CC BY 4.0), ver <code>LICENSE-CONTENT</code>.
          </li>
          <li>
            Las licencias del proyecto no cubren automáticamente dependencias ni materiales de
            terceros.
          </li>
        </ul>
      </section>

      <section className="detail-section">
        <h2>Aviso de independencia</h2>
        <p>
          Unreal Engine Quick Reference es un proyecto educativo independiente y no está afiliado a
          Epic Games ni respaldado por esta empresa. Unreal Engine y sus marcas pertenecen a sus
          respectivos titulares.
        </p>
      </section>

      <section className="detail-section">
        <h2>Privacidad</h2>
        <p>
          Favoritos, historial y preferencias se guardan en el almacenamiento local del navegador.
          No se envían datos personales a un servidor de este proyecto.
        </p>
      </section>

      <p>
        <Link to="/" className="btn">
          Volver al inicio
        </Link>
      </p>
    </div>
  )
}
