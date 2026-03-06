export default function StarRating({ rating, onRate, readOnly = false }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => !readOnly && onRate && onRate(star)}
          disabled={readOnly}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
          className={`text-xl leading-none transition-transform
            ${readOnly ? 'cursor-default' : 'hover:scale-110 cursor-pointer'}
            ${star <= rating ? 'text-terracotta-400' : 'text-cream-200'}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}
