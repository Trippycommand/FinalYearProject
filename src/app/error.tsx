'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="mb-[30%] mt-[15%]">
      <h2 className="text-center text-2xl font-medium text-rose-500">
        {error.message}
      </h2>
      <button
        className="mx-auto mt-12 block rounded border border-neutral-800 bg-neutral-900 px-4 py-2 text-base text-neutral-200"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}
