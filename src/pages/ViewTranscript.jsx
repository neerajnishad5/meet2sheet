import { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import axios from "axios";
export default function ViewTranscript() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTranscript = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching transcript:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTranscript();
  }, []);

  return (
    <div
      className="min-h-screen bg-[#fff5f3] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8"
      style={{
        maxWidth: "100%",
      }}
    >
      <div className="bg-white shadow-xl p-6 sm:p-8 rounded-xl w-full max-w-2xl space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#fc8673] text-center">
          Transcript Data
        </h2>

        {loading && (
          <div className="flex justify-center items-center h-40">
            <HashLoader color="#fc8673" />
          </div>
        )}

        {data && (
          <div className="text-left bg-gray-100 p-4 rounded-lg overflow-auto max-h-[400px] text-sm font-mono whitespace-pre-wrap ">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}

        {!loading && !data && (
          <p className="text-red-500 font-semibold text-center">
            ❌ Failed to load transcript.
          </p>
        )}
      </div>
    </div>
  );
}
