const STORAGE_KEY = 'recipe-book-recipes'

export function getRecipes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveRecipe(recipe) {
  const recipes = getRecipes()
  const existing = recipes.findIndex(r => r.id === recipe.id)
  if (existing >= 0) {
    recipes[existing] = recipe
  } else {
    recipes.unshift(recipe)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
}

export function updateRecipe(id, updates) {
  const recipes = getRecipes()
  const index = recipes.findIndex(r => r.id === id)
  if (index >= 0) {
    recipes[index] = { ...recipes[index], ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
  }
}

export function deleteRecipe(id) {
  const recipes = getRecipes().filter(r => r.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
}

export function getRecipeById(id) {
  return getRecipes().find(r => r.id === id) || null
}
