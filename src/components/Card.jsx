export default function Card({ title, description }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-l-4 border-[#fc8673] hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-[#fc8673] mb-2">{title}</h3>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
  );
}