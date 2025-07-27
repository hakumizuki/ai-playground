import datetime
import platform
import sys
import time
from typing import Any, Dict, Optional

import psutil
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="AI Playground Python Backend",
    description="Python FastAPI backend for AI Playground",
    version="1.0.0",
)

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# リクエストモデル
class CalculationRequest(BaseModel):
    operation: str
    a: float
    b: float


# レスポンスモデル
class ApiResponse(BaseModel):
    message: str
    timestamp: str
    data: Optional[Dict[str, Any]] = None


@app.get("/health")
async def health_check():
    """ヘルスチェックエンドポイント"""
    return ApiResponse(
        message="OK",
        timestamp=datetime.datetime.now().isoformat(),
        data={"service": "Python Backend"},
    )


@app.get("/api/hello")
async def hello():
    """メインAPIエンドポイント"""
    return ApiResponse(
        message="Hello from Python Backend! 🐍",
        timestamp=datetime.datetime.now().isoformat(),
        data={
            "runtime": "Python",
            "version": sys.version,
            "platform": platform.platform(),
            "cpu_count": psutil.cpu_count(),
            "memory": {
                "total": psutil.virtual_memory().total,
                "available": psutil.virtual_memory().available,
                "percent": psutil.virtual_memory().percent,
            },
            "uptime": time.time(),
        },
    )


@app.post("/api/calculate")
async def calculate(request: CalculationRequest):
    """計算APIエンドポイント"""
    try:
        a = request.a
        b = request.b
        operation = request.operation

        result = None

        if operation == "add":
            result = a + b
        elif operation == "subtract":
            result = a - b
        elif operation == "multiply":
            result = a * b
        elif operation == "divide":
            if b == 0:
                raise HTTPException(status_code=400, detail="ゼロ除算はできません")
            result = a / b
        else:
            raise HTTPException(status_code=400, detail="無効な演算です")

        return ApiResponse(
            message="計算完了",
            timestamp=datetime.datetime.now().isoformat(),
            data={"operation": operation, "a": a, "b": b, "result": result},
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"計算中にエラーが発生しました: {str(e)}"
        )


@app.get("/api/python-info")
async def python_info():
    """Python環境情報エンドポイント"""
    return ApiResponse(
        message="Python環境情報",
        timestamp=datetime.datetime.now().isoformat(),
        data={
            "python_version": sys.version,
            "platform": platform.platform(),
            "architecture": platform.architecture(),
            "processor": platform.processor(),
            "system": platform.system(),
            "release": platform.release(),
            "machine": platform.machine(),
            "cpu_count": psutil.cpu_count(),
            "memory_info": {
                "total": psutil.virtual_memory().total,
                "available": psutil.virtual_memory().available,
                "percent": psutil.virtual_memory().percent,
            },
        },
    )


if __name__ == "__main__":
    import uvicorn

    print("🚀 Python Backend server starting...")
    print("📡 Health check: http://localhost:8888/health")
    print("🔗 API endpoint: http://localhost:8888/api/hello")
    uvicorn.run("app:app", host="0.0.0.0", port=8888, reload=True)
