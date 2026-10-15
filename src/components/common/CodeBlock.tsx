import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import type { CodeSnippet } from '../../types/reference'

interface CodeBlockProps {
  snippet: CodeSnippet
}

export function CodeBlock({ snippet }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(snippet.code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="code-block">
      <div className="code-block-header">
        <span>
          {snippet.title ?? snippet.language}
          {snippet.language === 'cpp' ? ' · C++' : snippet.language === 'blueprint' ? ' · Blueprint' : ''}
        </span>
        <button type="button" className="btn" onClick={handleCopy} aria-label="Copiar código">
          {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre>
        <code>{snippet.code}</code>
      </pre>
      {snippet.explanation ? <p style={{ padding: '0 1rem 0.85rem', margin: 0 }}>{snippet.explanation}</p> : null}
    </div>
  )
}
