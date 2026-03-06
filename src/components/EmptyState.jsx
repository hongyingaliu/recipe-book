export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="text-7xl mb-6 select-none">🥧</div>
      <h2 className="font-handwritten text-3xl text-warm-brown mb-3">
        Your recipe box is empty!
      </h2>
      <p className="font-body text-warm-brown/60 max-w-sm leading-relaxed">
        Paste a recipe URL above to get started. We'll pull in all the details so you can
        keep your favorites in one cozy place.
      </p>
    </div>
  )
}
