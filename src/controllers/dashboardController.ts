import { Request, Response } from "express";
import caseModel from "../models/caseSchema";
import touristModel from "../models/touristSchema";
import { asyncWrapProviders } from "node:async_hooks";

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const currentYear = new Date().getFullYear();

        const totalTourists = await touristModel.countDocuments({
            date: { $gte: new Date(`${currentYear}-01-01`)}
        });

        const internationalTourists = await touristModel.countDocuments({ type: "international" });
        const localTourists = await touristModel.countDocuments({ type: "local" });
        const activeTourists = await touristModel.countDocuments({ status: "active"});

        const genderStats = await touristModel.aggregate([
            {
                $group: { _id: "$gender", count: { $sum: 1 }}
            }
        ]);

        const monthlyAssistance = await touristModel.aggregate([
            {
                $group: {
                    _id: { month: { $month: "$date" }},
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.month": 1}}
        ]);

         const recentActiveTourists = await touristModel.find({ status: "active" })
      .sort({ createdAt: -1 })
      .limit(5);

      const monthlyUpdates = {
        activeTourists,
        resolvedCase: await caseModel.countDocuments({ type: "resolved" }),
        complaints: await caseModel.countDocuments({ type: "complaint"}),
        emergencies: await caseModel.countDocuments({ type: "emergency" }),
      };

      return res.status(200).json({
        totalTourists,
        internationalTourists,
        localTourists,
        activeTourists,
        genderStats,
        monthlyAssistance,
        recentActiveTourists,
        monthlyUpdates
      });


    } catch (error: any) {
        console.log("failed to fetch dashboard stats", error);
        return res.status(500).json({
            message: "Failed to fetch because code is chatgpt stats, Server error",
            error: error.message
        })
    }
}
