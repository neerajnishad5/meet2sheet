import { useState } from "react";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom"; // 👈 Import useNavigate
import axios from "axios";

export default function ProcessTranscript() {
  const [path, setPath] = useState("");
  const [status, setStatus] = useState("idle"); // idle | processing | success | error
  const navigate = useNavigate(); // 👈 Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("processing");
    console.log("handleSubmit processTranscript called: ", path);

    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          transcriptPath: path,
        }
      );

      if (res.status === 201 || res.status === 200) {
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
    <div className="min-h-screen bg-[#fff5f3] flex items-center justify-center px-4">
      <div className="bg-white shadow-xl p-8 rounded-xl w-full max-w-lg text-center space-y-6">
        <h2 className="text-3xl font-bold text-[#fc8673]">
          Process Transcript
        </h2>

        {status === "idle" && (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <input
              type="text"
              placeholder="Enter transcript path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
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

        {status === "processing" && (
          <div className="loader flex justify-center items-center">
            <HashLoader color="#fc8673" />
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <p className="text-green-600 font-bold">
              ✅ Done! Transcript processed successfully.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-[#fc8673] text-white font-medium rounded-lg hover:bg-[#f2705d] transition hover:cursor-pointer"
            >
              Go to Home
            </button>
          </div>
        )}

        {status === "error" && (
          <p className="text-red-500 font-bold">
            ❌ Failed to process transcript. Try again.
          </p>
        )}
      </div>
    </div>
  );
}
