import { useState } from 'react'
import { extractRecipeFromUrl } from '../utils/api'
import { saveRecipe } from '../utils/storage'

export default function URLInput({ onRecipeAdded }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) return

    setLoading(true)
    setError(null)

    try {
      const recipe = await extractRecipeFromUrl(trimmed)
      saveRecipe(recipe)
      setUrl('')
      onRecipeAdded(recipe)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Paste a recipe URL here..."
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-cream-200 bg-white
                     text-warm-dark placeholder-warm-brown/40 font-body
                     focus:outline-none focus:border-terracotta-400
                     shadow-sm disabled:opacity-60 transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-white
                     font-handwritten text-lg rounded-xl shadow-sm
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors whitespace-nowrap"
        >
          {loading ? 'Saving...' : 'Save Recipe'}
        </button>
      </form>

      {loading && (
        <p className="mt-3 text-center text-warm-brown font-body text-sm animate-pulse">
          Fetching your recipe — this may take a moment...
        </p>
      )}

      {error && (
        <p className="mt-3 text-center text-terracotta-500 font-body text-sm">
          {error}
        </p>
      )}
    </div>
  )
}
