import StarRating from './StarRating'

export default function RecipeCard({ recipe, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg
                 border border-cream-200 cursor-pointer transition-all
                 hover:-translate-y-1 group"
    >
      {/* Image */}
      <div className="h-44 bg-cream-100 overflow-hidden">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🍽️
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-handwritten text-lg text-warm-dark leading-snug line-clamp-2">
          {recipe.title}
        </h3>

        <p className="font-body text-xs text-warm-brown/60 uppercase tracking-wide">
          {recipe.sourceName}
        </p>

        <div className="flex items-center justify-between mt-1">
          <StarRating rating={recipe.rating} readOnly />
          {recipe.readyInMinutes && (
            <span className="font-body text-xs text-warm-brown/50">
              {recipe.readyInMinutes} min
            </span>
          )}
        </div>

        {recipe.note && (
          <p className="font-body text-sm text-warm-brown/70 italic line-clamp-2 border-t border-cream-100 pt-2 mt-1">
            "{recipe.note}"
          </p>
        )}
      </div>
    </div>
  )
}
