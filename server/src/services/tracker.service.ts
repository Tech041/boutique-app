import Visitor from "../models/tracker.model";
import ErrorHandler from "../utils/errorHandler";

export async function trackVisitor(visitorId: string): Promise<void> {
  if (!visitorId) throw new ErrorHandler(404, "Missing visitorId");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await Visitor.updateOne(
    { visitorId, date: today },
    { $setOnInsert: { createdAt: new Date() } },
    { upsert: true },
  );
}

export async function getVisitorStats(page: number, limit: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const skip = (page - 1) * limit;

  const stats = await Visitor.aggregate([
    {
      $facet: {
        dailyUnique: [
          { $match: { date: today } },
          { $group: { _id: "$visitorId" } },
          { $count: "count" },
        ],
        totalUnique: [{ $group: { _id: "$visitorId" } }, { $count: "count" }],
        // Visits grouped by date with totals
        visits: [
          {
            $group: {
              _id: { $dateTrunc: { date: "$createdAt", unit: "day" } },
              totalVisits: { $sum: 1 },
            },
          },
          { $sort: { _id: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        // Count of all grouped days (for pagination)
        totalDays: [
          {
            $group: {
              _id: { $dateTrunc: { date: "$createdAt", unit: "day" } },
            },
          },
          { $count: "count" },
        ],
      },
    },
  ]);

  const totalDays = stats[0].totalDays[0]?.count || 0;
  const totalPages = Math.ceil(totalDays / limit);
  return {
    dailyUnique: stats[0].dailyUnique[0]?.count || 0,
    totalUnique: stats[0].totalUnique[0]?.count || 0,
    visits: stats[0].visits.map((v: any) => ({
      date: v._id,
      totalVisits: v.totalVisits,
    })),
    totalPages,
  };
}
