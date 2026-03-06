const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY

export async function extractRecipeFromUrl(url) {
  if (!API_KEY) {
    throw new Error('Spoonacular API key is not set. Add VITE_SPOONACULAR_API_KEY to your .env file.')
  }

  const endpoint = `https://api.spoonacular.com/recipes/extract?apiKey=${API_KEY}&url=${encodeURIComponent(url)}&analyze=true&addRecipeInformation=true&addRecipeNutrition=false`

  const response = await fetch(endpoint)

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Failed to fetch recipe (${response.status})`)
  }

  const data = await response.json()

  return {
    id: String(data.id || Date.now()),
    title: data.title || 'Untitled Recipe',
    image: data.image || null,
    sourceUrl: data.sourceUrl || url,
    sourceName: data.sourceName || new URL(url).hostname.replace('www.', ''),
    servings: data.servings || null,
    readyInMinutes: data.readyInMinutes || null,
    preparationMinutes: data.preparationMinutes || null,
    cookingMinutes: data.cookingMinutes || null,
    ingredients: (data.extendedIngredients || []).map(ing => ({
      id: ing.id,
      original: ing.original,
      amount: ing.amount,
      unit: ing.unit,
      name: ing.name,
    })),
    instructions: parseInstructions(data),
    rating: 0,
    note: '',
    savedAt: new Date().toISOString(),
  }
}

function parseInstructions(data) {
  // Prefer structured analyzed instructions
  if (data.analyzedInstructions && data.analyzedInstructions.length > 0) {
    return data.analyzedInstructions[0].steps.map(step => step.step)
  }
  // Fall back to raw instructions string split by sentences
  if (data.instructions) {
    return data.instructions
      .replace(/<[^>]+>/g, '') // strip HTML tags
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(Boolean)
  }
  return []
}
