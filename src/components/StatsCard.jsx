import { Link } from "react-router-dom";

const StatsCard = ({
  title,
  quantity,
  icon: Icon,
  to = "#",
  color = "bg-blue-600",
}) => {
  return (
    <Link
      to={to}
      className={`flex-1 rounded-xl p-6 text-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium opacity-80">{title}</h2>
          <h1 className="text-3xl font-bold mt-2">{quantity}</h1>
        </div>

        {Icon && (
          <div className="bg-white/20 p-3 rounded-full">
            <Icon size={26} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default StatsCard;