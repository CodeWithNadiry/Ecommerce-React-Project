import StatsCard from './StatsCard'
const StatsList = ({stats, user = false}) => {
  return (
    <div className={`grid grid-cols-1 ${user ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}  gap-6`}>
        {stats.map(({title, quantity, icon, color, to}) => (
          <StatsCard
            key={title}
            title={title}
            quantity={quantity}
            icon={icon}
            color={color}
            to={to}
          />
        ))}
      </div>
  );
};

export default StatsList;