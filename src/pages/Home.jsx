import { Link } from "react-router-dom";
import Card from "../components/Card";
export default function Home() {
  const features = [
    {
      title: "Automatic Updates",
      description:
        "Timesheets are updated in real-time, eliminating manual effort.",
    },
    {
      title: "Intelligent Task Interpretation",
      description: "Accurate descriptions extracted from meeting dialogues.",
    },
    {
      title: "Precision Logging",
      description: "Guaranteed accuracy for hours and task details.",
    },
    {
      title: "Productivity Boost",
      description: "Eliminates manual entry to save time and effort.",
    },
    {
      title: "Seamless Zoho Integration",
      description: "Direct API connection for effortless data transfer.",
    },
    {
      title: "Comprehensive Task Capture",
      description: "Ensures no completed tasks are overlooked or forgotten.",
    },
  ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {" "}
      <div className="max-w-xl w-full text-center space-y-8">
        {" "}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#fc8673]">
          {" "}
          Welcome to Meet2Sheet: AI-Powered Automation{" "}
        </h1>
        <p className="text-lg text-[#2c2c2c]">
          {" "}
          Meet2Sheet is an intelligent assistant that transforms your daily
          scrum meeting discussions into accurate timesheet entries.{" "}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {" "}
          <Link
            to="/view-transcript"
            className="px-6 py-3 bg-[#fc8673] text-white font-medium rounded-lg shadow hover:bg-[#f2705d] transition"
          >
            {" "}
            View Transcript{" "}
          </Link>
          <Link
            to="/summarize-transcript"
            className="px-6 py-3 bg-[#6dd3ce] text-white font-medium rounded-lg shadow hover:bg-[#57bcb7] transition"
          >
            {" "}
            Summarize Transcript{" "}
          </Link>{" "}
        </div>{" "}
      </div>
      {/* Features Section */}{" "}
      <div className="mt-40 lg:mb-40 max-w-6xl w-full px-4">
        {" "}
        <h2 className="text-3xl font-bold text-center mb-10 text-[#fc8673]">
          {" "}
          Key Features of Meet2Sheet{" "}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {" "}
          {features.map((feature, index) => (
            <Card
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
