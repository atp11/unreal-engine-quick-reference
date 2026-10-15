import { Link } from 'react-router-dom'
import { getCategory } from '../../data/categories'
import type { ReferenceEntry } from '../../types/reference'

interface EntryCardProps {
  entry: ReferenceEntry
}

export function EntryCard({ entry }: EntryCardProps) {
  const category = getCategory(entry.category)

  return (
    <Link to={`/entrada/${entry.slug}`} className="entry-card">
      <div className="entry-card-top">
        <h3>{entry.originalName}</h3>
        <span className="badge type">{entry.elementType}</span>
      </div>
      <p className="summary">{entry.summary}</p>
      <div className="meta-row">
        {category ? <span className="badge">{category.name}</span> : null}
        <span className="badge">{entry.difficulty}</span>
        {entry.ueVersions.slice(0, 2).map((version) => (
          <span key={version} className="badge">
            UE {version}
          </span>
        ))}
      </div>
    </Link>
  )
}
