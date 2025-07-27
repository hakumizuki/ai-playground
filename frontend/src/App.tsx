import { useState } from "react";
import axios from "axios";

interface ApiResponse {
  message: string;
  timestamp: string;
  data?: any;
}

function App() {
  const [nodejsResponse, setNodejsResponse] = useState<ApiResponse | null>(
    null
  );
  const [pythonResponse, setPythonResponse] = useState<ApiResponse | null>(
    null
  );
  const [loading, setLoading] = useState({ nodejs: false, python: false });

  const callNodejsBackend = async () => {
    setLoading((prev) => ({ ...prev, nodejs: true }));
    try {
      const response = await axios.get<ApiResponse>("/api/nodejs/hello");
      setNodejsResponse(response.data);
    } catch (error) {
      console.error("Node.js API error:", error);
      setNodejsResponse({
        message: "エラーが発生しました",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading((prev) => ({ ...prev, nodejs: false }));
    }
  };

  const callPythonBackend = async () => {
    setLoading((prev) => ({ ...prev, python: true }));
    try {
      const response = await axios.get<ApiResponse>("/api/python/hello");
      setPythonResponse(response.data);
    } catch (error) {
      console.error("Python API error:", error);
      setPythonResponse({
        message: "エラーが発生しました",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading((prev) => ({ ...prev, python: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          AI Playground
        </h1>
        <p className="text-center text-gray-600 mb-12">
          TypeScript + React フロントエンドから Node.js と Python
          バックエンドを呼び出します
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Node.js Backend */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-lg mr-3 flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              Node.js Backend
            </h2>
            <button
              onClick={callNodejsBackend}
              disabled={loading.nodejs}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-4"
            >
              {loading.nodejs ? "呼び出し中..." : "Node.js API を呼び出す"}
            </button>

            {nodejsResponse && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-2">
                  レスポンス:
                </h3>
                <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                  {JSON.stringify(nodejsResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Python Backend */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-lg mr-3 flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              Python Backend
            </h2>
            <button
              onClick={callPythonBackend}
              disabled={loading.python}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-4"
            >
              {loading.python ? "呼び出し中..." : "Python API を呼び出す"}
            </button>

            {pythonResponse && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-2">
                  レスポンス:
                </h3>
                <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                  {JSON.stringify(pythonResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            技術スタック
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-bold">TS</span>
              </div>
              <p className="text-sm font-medium">TypeScript</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <p className="text-sm font-medium">React</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <p className="text-sm font-medium">Node.js</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <p className="text-sm font-medium">Python</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
