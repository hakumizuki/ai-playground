import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

// 環境変数を読み込み
dotenv.config();

const app = express();
const PORT = parseInt(process.env["PORT"] || "8000", 10);

// 型定義
interface ApiResponse {
  message: string;
  timestamp: string;
  data?: any;
}

interface CalculationRequest {
  operation: "add" | "subtract" | "multiply" | "divide";
  a: number;
  b: number;
}

interface CalculationResponse extends ApiResponse {
  data: {
    operation: string;
    a: number;
    b: number;
    result: number;
  };
}

// ミドルウェア
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// ヘルスチェックエンドポイント
app.get("/health", (_req: Request, res: Response) => {
  const response: ApiResponse = {
    message: "OK",
    timestamp: new Date().toISOString(),
  };
  res.json(response);
});

// メインAPIエンドポイント
app.get("/api/hello", (_req: Request, res: Response) => {
  const response: ApiResponse = {
    message: "Hello from Node.js Backend! 🟢",
    timestamp: new Date().toISOString(),
    data: {
      runtime: "Node.js",
      version: process.version,
      platform: process.platform,
      memory: process.memoryUsage(),
      uptime: process.uptime(),
    },
  };
  res.json(response);
});

// 計算APIエンドポイント
app.post("/api/calculate", (req: Request, res: Response) => {
  try {
    const { operation, a, b }: CalculationRequest = req.body;

    if (!operation || a === undefined || b === undefined) {
      return res.status(400).json({
        error: "operation, a, b パラメータが必要です",
      });
    }

    let result: number;
    switch (operation) {
      case "add":
        result = a + b;
        break;
      case "subtract":
        result = a - b;
        break;
      case "multiply":
        result = a * b;
        break;
      case "divide":
        if (b === 0) {
          return res.status(400).json({ error: "ゼロ除算はできません" });
        }
        result = a / b;
        break;
      default:
        return res.status(400).json({ error: "無効な演算です" });
    }

    const response: CalculationResponse = {
      message: "計算完了",
      timestamp: new Date().toISOString(),
      data: {
        operation,
        a,
        b,
        result,
      },
    };

    return res.json(response);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({
      error: "計算中にエラーが発生しました",
      message: errorMessage,
    });
  }
});

// Node.js環境情報エンドポイント
app.get("/api/nodejs-info", (_req: Request, res: Response) => {
  const response: ApiResponse = {
    message: "Node.js環境情報",
    timestamp: new Date().toISOString(),
    data: {
      nodeVersion: process.version,
      platform: process.platform,
      architecture: process.arch,
      pid: process.pid,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
      versions: process.versions,
      env: {
        NODE_ENV: process.env["NODE_ENV"],
        PORT: process.env["PORT"],
      },
    },
  };
  res.json(response);
});

// 404エラーハンドラー
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    error: "エンドポイントが見つかりません",
    path: req.originalUrl,
  });
});

// エラーハンドラー
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "サーバー内部エラーが発生しました",
    message: err.message,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Node.js Backend server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/api/hello`);
  console.log(`ℹ️  Node.js version: ${process.version}`);
});
