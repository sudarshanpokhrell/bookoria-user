import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    // Test database connection
    await dbConnect();
    
    return Response.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: "connected",
        environment: process.env.NODE_ENV || "development",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Health check failed:", error);
    return Response.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: "Database connection failed",
      },
      {
        status: 503,
      }
    );
  }
} 