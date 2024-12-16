import { review } from "@/app/lib/actions";
import { useActionState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/button";

export default function ReviewForm({ productId }: {productId: string}) {
  const [errorMessage, formAction, isPending] = useActionState(
    review,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-accent1 mt-3 px-6 pb-4 pt-8">
        <h1 className="text-center text-2xl font-semibold mb-4">Write a Review</h1>
        <div className="w-full">
          {/* Hidden fields for product_id and user_id */}
          <input type="hidden" name="product_id" value={productId} />
          {/* <input type="hidden" name="user_id" value={userId} /> */}

          {/* Comment field */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="review_comment"
            >
              Review Comment:
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-secondary py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="review_comment"
                type="text"
                name="review_comment"
                placeholder="Enter your comment here"
                required
              />
            </div>
          </div>

          {/* Rating field with restriction */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="review_rating"
            >
              Review Rating (1-5):
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-secondary py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="review_rating"
                type="number"
                name="review_rating"
                min="1"
                max="5"
                placeholder="Enter your rating (1-5)"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit button */}
        <Button className="mt-4 bg-secondary w-full" aria-disabled={isPending}>
          Submit Review <ArrowRightIcon className="ml-auto h-5 w-5 text-primary" />
        </Button>

        {/* Error message */}
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
