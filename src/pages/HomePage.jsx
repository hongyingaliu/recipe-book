import { useState, useEffect } from 'react'
import URLInput from '../components/URLInput'
import RecipeCard from '../components/RecipeCard'
import EmptyState from '../components/EmptyState'
import { getRecipes } from '../utils/storage'

export default function HomePage({ onSelectRecipe }) {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    setRecipes(getRecipes())
  }, [])

  function handleRecipeAdded(recipe) {
    setRecipes(prev => [recipe, ...prev.filter(r => r.id !== recipe.id)])
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-white border-b border-cream-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center">
          <h1 className="font-handwritten text-4xl sm:text-5xl text-warm-dark mb-1">
            Chas & Alana's Recipe Book
          </h1>
          <p className="font-body text-warm-brown/60 text-sm">
            Our little collection of favorites
          </p>
        </div>
      </header>

      {/* URL Input Section */}
      <section className="bg-sage-300/20 border-b border-sage-300/30 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="font-handwritten text-xl text-warm-brown text-center mb-5">
            Found a new recipe to try?
          </p>
          <URLInput onRecipeAdded={handleRecipeAdded} />
        </div>
      </section>

      {/* Recipe Grid */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        {recipes.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <h2 className="font-handwritten text-2xl text-warm-brown mb-6">
              Saved Recipes ({recipes.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => onSelectRecipe(recipe.id)}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
