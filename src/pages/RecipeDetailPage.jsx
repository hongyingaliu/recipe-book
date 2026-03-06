import { useState, useEffect } from 'react'
import { getRecipeById, updateRecipe, deleteRecipe } from '../utils/storage'
import StarRating from '../components/StarRating'

export default function RecipeDetailPage({ recipeId, onBack }) {
  const [recipe, setRecipe] = useState(null)
  const [note, setNote] = useState('')

  useEffect(() => {
    const r = getRecipeById(recipeId)
    if (r) {
      setRecipe(r)
      setNote(r.note || '')
    }
  }, [recipeId])

  function handleRate(rating) {
    updateRecipe(recipeId, { rating })
    setRecipe(prev => ({ ...prev, rating }))
  }

  function handleNoteChange(e) {
    const value = e.target.value
    setNote(value)
    updateRecipe(recipeId, { note: value })
  }

  function handleDelete() {
    if (window.confirm('Delete this recipe?')) {
      deleteRecipe(recipeId)
      onBack()
    }
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <p className="font-body text-warm-brown">Recipe not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Nav */}
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <button
          onClick={onBack}
          className="font-body text-sm text-terracotta-500 hover:text-terracotta-600 transition-colors"
        >
          ← Back to recipes
        </button>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-6 pb-16">
        {/* Hero image */}
        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-2xl mb-6 shadow-md"
          />
        )}

        {/* Title & meta */}
        <h1 className="font-handwritten text-4xl text-warm-dark mb-2">{recipe.title}</h1>
        <div className="flex flex-wrap items-center gap-4 mb-6 text-warm-brown/60 font-body text-sm">
          {recipe.sourceName && (
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta-400 hover:underline"
            >
              {recipe.sourceName}
            </a>
          )}
          {recipe.readyInMinutes && <span>{recipe.readyInMinutes} min total</span>}
          {recipe.servings && <span>{recipe.servings} servings</span>}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-handwritten text-lg text-warm-brown">Our rating:</span>
          <StarRating rating={recipe.rating} onRate={handleRate} />
        </div>

        {/* Ingredients */}
        {recipe.ingredients.length > 0 && (
          <section className="mb-8">
            <h2 className="font-handwritten text-2xl text-warm-dark mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="font-body text-warm-dark flex gap-2">
                  <span className="text-sage-400 mt-1">•</span>
                  <span>{ing.original}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Instructions */}
        {recipe.instructions.length > 0 && (
          <section className="mb-8">
            <h2 className="font-handwritten text-2xl text-warm-dark mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="font-body text-warm-dark flex gap-4">
                  <span className="font-handwritten text-terracotta-400 text-xl leading-snug min-w-[1.5rem]">
                    {i + 1}.
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Personal note */}
        <section className="mb-8">
          <h2 className="font-handwritten text-2xl text-warm-dark mb-3">Our Notes</h2>
          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Add a note — what did you love? What would you change next time?"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-cream-200 bg-white
                       font-body text-warm-dark placeholder-warm-brown/40
                       focus:outline-none focus:border-sage-400 resize-none
                       shadow-sm transition-colors"
          />
        </section>

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="font-body text-sm text-terracotta-400 hover:text-terracotta-600 transition-colors"
        >
          Delete this recipe
        </button>
      </article>
    </div>
  )
}
