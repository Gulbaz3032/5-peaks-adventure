    import express from "express";
    import dotenv from "dotenv";
    import { dbConnect } from "./utils/db";
    dotenv.config();
    import dashboardRoutes from "./routes/dashboardRoutes";
    // import touristToutes from "./routes/touristRoutes";
    import touristRoutes from "./routes/touristRoutes";

    dbConnect();
    const app = express();
    app.use(express.json());

    const PORT = process.env.PORT as string;

    app.use("/api/dashboard", dashboardRoutes);
    app.use("/api/tourist", touristRoutes);



    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
