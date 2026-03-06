import { useState } from 'react'
import HomePage from './pages/HomePage'
import RecipeDetailPage from './pages/RecipeDetailPage'

export default function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null)

  return (
    <div className="min-h-screen bg-cream-50">
      {selectedRecipeId ? (
        <RecipeDetailPage
          recipeId={selectedRecipeId}
          onBack={() => setSelectedRecipeId(null)}
        />
      ) : (
        <HomePage onSelectRecipe={setSelectedRecipeId} />
      )}
    </div>
  )
}
