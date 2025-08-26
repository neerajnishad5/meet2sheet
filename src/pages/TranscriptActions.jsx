import { useState } from "react";
import axios from "axios";
import { HashLoader } from "react-spinners";
const API_BASE = import.meta.env.VITE_BASE_URL;

export default function TranscriptActions() {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // 🔹 API call handler
  const handleApiCall = async (endpoint, method = "POST", type = "file") => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let res;
      if (method === "GET") {
        res = await axios.get(`${API_BASE}${endpoint}`);
      } else if (type === "file") {
        if (!file) return alert("Please upload a .vtt file first");

        const formData = new FormData();
        formData.append("vtt_file", file);

        res = await axios.post(`${API_BASE}${endpoint}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (type === "json") {
        if (!filePath) return alert("Please enter file path first");

        res = await axios.post(
          `${API_BASE}${endpoint}`,
          { file_path: filePath },
          { headers: { "Content-Type": "application/json" } }
        );
      }
      console.log("res data: ", res.data);

      setResult({ endpoint, data: res.data });
    } catch (err) {
      console.error("API Error:", err);
      setError(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Render result depending on endpoint
  const renderResult = () => {
    if (!result) return null;
    const { endpoint, data } = result;

    // 1. Transcript Info
    if (endpoint === "/api/transcript-info") {
      return (
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="text-lg font-bold text-[#fc8673] mb-2">
            Transcript Info
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <b>File:</b> {data.file_path}
            </li>
            <li>
              <b>File Name:</b> {data.file_name}
            </li>
            <li>
              <b>File Size:</b> {data.file_size}
            </li>
            <li>
              <b>Duration:</b> {data.duration}
            </li>
            <li>
              <b>Total Captions:</b> {data.total_captions}
            </li>
            <li>
              <b>Estimated Words:</b> {data.estimated_words}
            </li>
          </ul>
        </div>
      );
    }

    // 2. View Transcript
    if (endpoint === "/api/view-transcript") {
      return (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[#fc8673]">Transcript</h3>
          <div className="bg-white rounded-lg shadow divide-y max-h-80 overflow-auto">
            {data.transcript?.map((entry, i) => (
              <div key={i} className="p-3">
                <p className="text-sm font-semibold text-gray-700">
                  {entry.speaker}
                </p>
                <p className="text-xs text-gray-500">{entry.timestamp}</p>
                <p className="text-gray-800 mt-1">{entry.text}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 3. Process Transcript (logs)
    if (endpoint === "/api/process-transcript") {
      return (
        <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-xs whitespace-pre-wrap max-h-96 overflow-auto">
          {data.output}
        </div>
      );
    }

    // 4. Process & Summarize
    if (endpoint === "/process-and-summarize") {
      return (
        <div>
          <h3 className="text-lg font-bold text-[#fc8673] mb-3">
            Employee Summaries
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(data.summaries || {}).map(([employee, details]) => (
              <div
                key={employee}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <h4 className="font-semibold text-lg text-[#fc8673]">
                  {employee
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </h4>
                <ul className="text-sm list-disc list-inside text-gray-600">
                  {details.tasks.map((task, idx) => (
                    <li key={idx}>
                      <span className="font-medium">{task.description}</span> —{" "}
                      {task.hours} hrs
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Fallback (debug)
    return (
      <pre className="bg-gray-100 p-4 rounded-lg max-h-96 overflow-auto text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    );
  };

  return (
    <div
      className="bg-[#fff5f3] flex items-start justify-center px-4 mt-5"
      style={{ minHeight: "80vh", minWidth: "70%" }}
    >
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl space-y-6">
        <h2 className="text-2xl font-bold text-[#fc8673]">
          Transcript Actions
        </h2>

        {/* File Upload */}
        {/* <input
          type="file"
          accept=".vtt"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        /> */}

        <input
          type="text"
          placeholder="Enter server file path (e.g. uploads/myfile.vtt)"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            className="bg-[#fc8673] text-white px-4 py-2 rounded-lg shadow"
            onClick={() =>
              handleApiCall("/api/view-transcript", "POST", "json")
            }
          >
            View Transcript
          </button>

          <button
            className="bg-[#fc8673] text-white px-4 py-2 rounded-lg shadow"
            onClick={() =>
              handleApiCall("/api/transcript-info", "POST", "json")
            }
          >
            Transcript Info
          </button>

          <button
            className="bg-[#fc8673] text-white px-4 py-2 rounded-lg shadow"
            onClick={() =>
              handleApiCall("/api/process-transcript", "POST", "json")
            }
          >
            Process Transcript
          </button>

          {/* <button
            className="bg-[#fc8673] text-white px-4 py-2 rounded-lg shadow"
            onClick={() =>
              handleApiCall("/process-and-summarize", "POST", "file")
            }
          >
            Process & Summarize
          </button> */}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center">
            <HashLoader color="#fc8673" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-red-500 font-semibold break-words">
            ❌ {JSON.stringify(error)}
          </div>
        )}

        {/* Result */}
        {renderResult()}
      </div>
    </div>
  );
}

// /api/view-transcript	POST	View transcript with speakers and timestamps
// /api/process-transcript	POST	Execute full workflow (Flask → Orchestrator → Zoho)
// /api/transcript-info	POST	Get basic transcript file information
