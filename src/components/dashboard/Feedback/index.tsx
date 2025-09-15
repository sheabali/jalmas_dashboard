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
import Image from "next/image";
import { useState } from "react";

interface Review {
  id: number;
  userId: string;
  name: string;
  quality: number;
  expectation: number;
  usefulness: number;
  recommendation: string;
  status: "Pending" | "Approved";
  rating: number;
  avatar: string;
}

const initialReviews: Review[] = [
  {
    id: 1,
    userId: "121",
    name: "Jonathan john",
    quality: 4.5,
    expectation: 5,
    usefulness: 5,
    recommendation: "Yes",
    status: "Pending",
    rating: 5,
    avatar: "https://i.ibb.co.com/8hL2q29/Rectangle-2.png",
  },
  {
    id: 2,
    userId: "126",
    name: "Jonathan john",
    quality: 5,
    expectation: 5,
    usefulness: 5,
    recommendation: "Yes",
    status: "Pending",
    rating: 5,
    avatar: "https://i.ibb.co.com/8hL2q29/Rectangle-2.png",
  },
  {
    id: 3,
    userId: "162",
    name: "Jonathan john",
    quality: 4,
    expectation: 4.5,
    usefulness: 5,
    recommendation: "Yes",
    status: "Approved",
    rating: 4,
    avatar: "https://i.ibb.co.com/8hL2q29/Rectangle-2.png",
  },
  {
    id: 4,
    userId: "162",
    name: "Jonathan john",
    quality: 4,
    expectation: 4.5,
    usefulness: 5,
    recommendation: "Yes",
    status: "Approved",
    rating: 4,
    avatar: "https://i.ibb.co.com/8hL2q29/Rectangle-2.png",
  },
  {
    id: 5,
    userId: "162",
    name: "Jonathan john",
    quality: 4,
    expectation: 4.5,
    usefulness: 5,
    recommendation: "Yes",
    status: "Pending",
    rating: 4,
    avatar: "https://i.ibb.co.com/8hL2q29/Rectangle-2.png",
  },
  {
    id: 6,
    userId: "162",
    name: "Jonathan john",
    quality: 4,
    expectation: 4.5,
    usefulness: 5,
    recommendation: "Yes",
    status: "Pending",
    rating: 4,
    avatar: "https://i.ibb.co.com/8hL2q29/Rectangle-2.png",
  },
  {
    id: 7,
    userId: "162",
    name: "Jonathan john",
    quality: 4,
    expectation: 4.5,
    usefulness: 5,
    recommendation: "Yes",
    status: "Approved",
    rating: 4,
    avatar: "https://i.ibb.co.com/8hL2q29/Rectangle-2.png",
  },
  {
    id: 8,
    userId: "162",
    name: "Jonathan john",
    quality: 4,
    expectation: 4.5,
    usefulness: 5,
    recommendation: "Yes",
    status: "Approved",
    rating: 4,
    avatar: "https://i.ibb.co.com/8hL2q29/Rectangle-2.png",
  },
  {
    id: 9,
    userId: "162",
    name: "Motu patlu",
    quality: 4,
    expectation: 4.5,
    usefulness: 5,
    recommendation: "Yes",
    status: "Pending",
    rating: 4,
    avatar: "https://i.ibb.co.com/8hL2q29/Rectangle-2.png",
  },
  {
    id: 10,
    userId: "162",
    name: "Jonathan john",
    quality: 4,
    expectation: 4.5,
    usefulness: 5,
    recommendation: "Yes",
    status: "Approved",
    rating: 4,
    avatar: "https://i.ibb.co.com/8hL2q29/Rectangle-2.png",
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  // modal states
  const [open, setOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [feedback, setFeedback] = useState({
    reviewText: "",
    recommend: "",
  });

  const handleOpenModal = (review: Review) => {
    setSelectedReview(review);
    setOpen(true);
  };

  const handleSubmit = () => {
    if (!selectedReview) return;

    setReviews((prev) =>
      prev.map((rev) =>
        rev.id === selectedReview.id
          ? {
              ...rev,
              status: "Approved",
              recommendation: feedback.recommend || rev.recommendation,
            }
          : rev
      )
    );

    setOpen(false);
    setFeedback({ reviewText: "", recommend: "" });
  };

  const filteredReviews = reviews.filter((rev) => {
    const matchesFilter =
      filter === "All" ? true : rev.rating === parseInt(filter);
    const matchesSearch =
      rev.name.toLowerCase().includes(search.toLowerCase()) ||
      rev.userId.includes(search);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 mt-4 bg-white rounded-lg shadow">
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        <>
          <Button variant="primary_light">
            Total {initialReviews?.length} Reviews
          </Button>
        </>

        {["All", "5", "4", "3", "2", "1"].map((f) => (
          <Button
            key={f}
            variant={filter === f ? "another" : "outline"}
            onClick={() => setFilter(f)}
          >
            {f === "All" ? "All Reviews" : `${f} Star`}
          </Button>
        ))}

        <Input
          placeholder="Search..."
          className="ml-auto w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Reviews Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">User Id</th>
            <th className="p-2">Name</th>
            <th className="p-2">Ques. Quality</th>
            <th className="p-2">Expectation</th>
            <th className="p-2">Usefulness</th>
            <th className="p-2">Recommendation</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredReviews.map((rev) => (
            <tr key={rev.id} className="border-b ">
              <td className="p-2">{rev.userId}</td>
              <td className="p-2 flex items-center my-3 gap-2">
                <Image
                  src={rev.avatar}
                  alt={rev.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
                {rev.name}
              </td>
              <td className="p-2">{rev.quality}</td>
              <td className="p-2">{rev.expectation}</td>
              <td className="p-2">{rev.usefulness}</td>
              <td className="p-2">{rev.recommendation}</td>
              <td className="p-2">
                <Button
                  size="sm"
                  variant={
                    rev.status === "Approved" ? "primary_light" : "destructive"
                  }
                  onClick={() =>
                    rev.status === "Pending" ? handleOpenModal(rev) : null
                  }
                >
                  {rev.status}
                </Button>
              </td>
            </tr>
          ))}
          {filteredReviews.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center p-4 text-gray-500">
                No reviews found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Feedback</DialogTitle>
          </DialogHeader>

          <p className="text-gray-600 text-sm mb-4">
            Share your experience with us. Your review helps us improve and
            guide other learners!
          </p>

          <div className="space-y-2">
            <p>Quiz Content Quality ⭐⭐⭐⭐⭐</p>
            <p>Match Expectation ⭐⭐⭐⭐⭐</p>
            <p>App Usefulness ⭐⭐⭐⭐⭐</p>
          </div>

          {/* Review Text */}
          <Textarea
            placeholder="Write your review here (at least 5 words)..."
            value={feedback.reviewText}
            onChange={(e) =>
              setFeedback({ ...feedback, reviewText: e.target.value })
            }
            className="mt-4"
          />

          {/* Recommend */}
          <div className="flex items-center gap-4 mt-4">
            <p>Recommend this app?</p>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="recommend"
                value="Yes"
                onChange={(e) =>
                  setFeedback({ ...feedback, recommend: e.target.value })
                }
              />
              Yes
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="recommend"
                value="No"
                onChange={(e) =>
                  setFeedback({ ...feedback, recommend: e.target.value })
                }
              />
              No
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleSubmit}
            >
              Submit Review
            </Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
