/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Dashboard.tsx
import React, { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getVisitorStats } from "../services/tracker";

const TrackerDashboard: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data: stats, isLoading } = useQuery({
    queryKey: ["visitorStats", page],
    queryFn: () => getVisitorStats(page, 10),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p className="text-gray-500">Loading stats...</p>;

  return (
    <section className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 my-5">
      {/* Stats cards */}
      <h1 className="text-center my-2 font-bold text-lg md:text-xl lg:text-2xl text-black">
        Visitors' Tracker
      </h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-black/50 p-4 rounded-lg text-center">
          <p className="text-sm text-white">Daily Unique Visitors</p>
          <p className="text-2xl font-bold text-white">
            {stats.dailyUnique}
          </p>
        </div>
        <div className="bg-green-800 text-white p-4 rounded-lg text-center">
          <p className="text-sm ">Total Unique Visitors</p>
          <p className="text-2xl font-bold">
            {stats.totalUnique}
          </p>
        </div>
      </div>

      {/* Daily totals list */}
      <h3 className="text-lg font-semibold mb-3">Visits Per Day</h3>
      <ul className="divide-y divide-gray-200">
        {stats.visits.map((v: any) => (
          <li key={v.date} className="py-2 flex justify-between text-sm">
            <span className="font-medium text-gray-700">
              {new Date(v.date).toLocaleDateString()}
            </span>
            <span className="text-gray-500">{v.totalVisits} visits</span>
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="flex justify-between mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-full cursor-pointer text-sm ${
            page === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-black text-white "
          }`}
        >
          Prev
        </button>
        <button
          disabled={page === stats.totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-full cursor-pointer text-sm bg-black text-white "
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default TrackerDashboard;
