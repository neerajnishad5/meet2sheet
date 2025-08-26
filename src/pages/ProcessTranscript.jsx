import { useState } from "react";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

export default function ProcessTranscript() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | processing | success | error
  const [result, setResult] = useState(null); // ⬅️ store API response
  const navigate = useNavigate();

  console.log(baseUrl);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setStatus("processing");

    try {
      const formData = new FormData();
      formData.append("vtt_file", file);

      const res = await axios.post(
        `${baseUrl}/process-and-summarize`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        setResult(res.data); // ⬅️ store the whole API response
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error processing transcript:", error);
      setStatus("error");
    }
  };

  return (
    <div
      className="bg-[#fff5f3] flex items-start justify-center px-4 mt-5"
      style={{ minHeight: "80vh" }}
    >
      <div className="bg-white shadow-xl p-8 rounded-xl w-full max-w-2xl text-center space-y-6">
        <h2 className="text-3xl font-bold text-[#fc8673]">
          Process & Summarize Transcript
        </h2>

        {/* IDLE STATE */}
        {status === "idle" && (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <input
              type="file"
              accept=".vtt"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#fc8673] transition"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#fc8673] text-white font-medium rounded-lg hover:bg-[#f2705d] transition hover:cursor-pointer"
            >
              Proceed
            </button>
          </form>
        )}

        {/* LOADING */}
        {status === "processing" && (
          <div className="loader flex justify-center items-center">
            <HashLoader color="#fc8673" />
          </div>
        )}

        {/* SUCCESS */}
        {status === "success" && result && (
          <div className="space-y-6 text-left">
            <p className="text-green-600 font-bold text-center">
              ✅ {result.message}
            </p>

            {/* Summaries */}
            <div className="space-y-4">
              {Object.entries(result.summaries).map(([employee, data]) => (
                <div
                  key={employee}
                  className="border rounded-lg p-4 bg-gray-50 shadow-sm"
                >
                  <h3 className="font-semibold text-lg text-[#fc8673]">
                    {employee.replace(/_/g, " ")}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    {data.tasks.map((task, index) => (
                      <li key={index}>
                        <span className="font-medium">{task.description}</span>{" "}
                        <span className="text-gray-500">
                          ({task.hours} hrs)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-[#fc8673] text-white font-medium rounded-lg hover:bg-[#f2705d] transition hover:cursor-pointer"
              >
                Go to Home
              </button>
            </div>
          </div>
        )}

        {/* ERROR */}
        {status === "error" && (
          <p className="text-red-500 font-bold">
            ❌ Failed to process transcript. Try again.
          </p>
        )}
      </div>
    </div>
  );
}
