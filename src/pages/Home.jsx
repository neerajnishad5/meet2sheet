import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#fc8673]">
          Welcome to Meet2Sheet
        </h1>

        <p className="text-lg text-[#2c2c2c]">
          Meet2Sheet is an intelligent assistant that transforms your daily
          scrum meeting discussing into accurate timesheet entries.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/view-transcript"
            className="px-6 py-3 bg-[#fc8673] text-white font-medium rounded-lg shadow hover:bg-[#f2705d] transition"
          >
            View Transcript
          </Link>

          <Link
            to="/process-transcript"
            className="px-6 py-3 bg-[#6dd3ce] text-white font-medium rounded-lg shadow hover:bg-[#57bcb7] transition"
          >
            Process Transcript
          </Link>
        </div>
      </div>
    </div>
  );
}
