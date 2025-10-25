"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAnalyticsFeedbackQuery } from "@/redux/features/dashboardManagementApi";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Review {
  id: string;
  userId: string;
  quizContentQuality: number;
  matchExpectation: number;
  appUsefulness: number;
  message: string;
  recommendedThisApp: boolean;
  user: {
    id: string;
    fullName: string;
    image: string;
  };
}

export default function ReviewsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: analyticsData,
    isLoading,
    isFetching,
  } = useAnalyticsFeedbackQuery({
    search,
    page,
    limit,
  });

  const feedbackAnalytics: Review[] = analyticsData?.data?.data || [];
  const meta = analyticsData?.data?.meta;

  // modal states
  const [open, setOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [feedback, setFeedback] = useState({
    reviewText: "",
    recommend: "",
  });

  const handleOpenModal = (review: Review) => {
    setSelectedReview(review);
    setFeedback({
      reviewText: review.message,
      recommend: review.recommendedThisApp ? "Yes" : "No",
    });
    setOpen(true);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (meta && page < Math.ceil(meta.total / meta.limit)) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="p-6 mt-4 bg-white rounded-lg shadow">
      {/* Header with Search */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Reviews</h1>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Reviews Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2 text-sm font-medium text-gray-600">User Id</th>
              <th className="p-2 text-sm font-medium text-gray-600">Name</th>
              <th className="p-2 text-sm font-medium text-gray-600">
                Quiz Quality
              </th>
              <th className="p-2 text-sm font-medium text-gray-600">
                Expectation
              </th>
              <th className="p-2 text-sm font-medium text-gray-600">
                Usefulness
              </th>
              <th className="p-2 text-sm font-medium text-gray-600">
                Recommendation
              </th>
              <th className="p-2 text-sm font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || isFetching ? (
              <tr>
                <td colSpan={7} className="text-center p-10 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : feedbackAnalytics.length > 0 ? (
              feedbackAnalytics.map((rev: Review, index: number) => (
                <tr
                  key={rev.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  {/* Serial Number */}
                  <td className="p-2 text-gray-900">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src={rev.user.image}
                        alt={rev.user.fullName}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-gray-900">{rev.user.fullName}</span>
                    </div>
                  </td>

                  <td className="p-2 text-gray-900">
                    {rev.quizContentQuality}
                  </td>
                  <td className="p-2 text-gray-900">{rev.matchExpectation}</td>
                  <td className="p-2 text-gray-900">{rev.appUsefulness}</td>
                  <td className="p-2 text-gray-900">
                    {rev.recommendedThisApp ? "Yes" : "No"}
                  </td>
                  <td className="p-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenModal(rev)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-10 text-gray-500">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta && (
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <div>
            Page {meta.page} of {Math.ceil(meta.total / meta.limit)}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Prev
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={page >= Math.ceil(meta.total / meta.limit)}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
          </DialogHeader>

          <p className="text-gray-600 text-sm mb-4">
            Review from {selectedReview?.user.fullName}
          </p>

          <div className="space-y-2">
            <p>
              Quiz Content Quality:{" "}
              {"⭐".repeat(selectedReview?.quizContentQuality || 0)}
            </p>
            <p>
              Match Expectation:{" "}
              {"⭐".repeat(selectedReview?.matchExpectation || 0)}
            </p>
            <p>
              App Usefulness: {"⭐".repeat(selectedReview?.appUsefulness || 0)}
            </p>
          </div>

          {/* Review Text */}
          <div className="mt-4">
            <label className="text-sm font-medium">Review Message:</label>
            <Textarea
              placeholder="Write your review here (at least 5 words)..."
              value={feedback.reviewText}
              onChange={(e) =>
                setFeedback({ ...feedback, reviewText: e.target.value })
              }
              className="mt-2"
              readOnly
            />
          </div>

          {/* Recommend */}
          <div className="flex items-center gap-4 mt-4">
            <p className="font-medium">Recommend this app?</p>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="recommend"
                value="Yes"
                checked={feedback.recommend === "Yes"}
                onChange={(e) =>
                  setFeedback({ ...feedback, recommend: e.target.value })
                }
                disabled
              />
              Yes
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="recommend"
                value="No"
                checked={feedback.recommend === "No"}
                onChange={(e) =>
                  setFeedback({ ...feedback, recommend: e.target.value })
                }
                disabled
              />
              No
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
