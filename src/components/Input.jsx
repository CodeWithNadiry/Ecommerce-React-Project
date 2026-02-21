const Input = ({ error, otherClasses, ...props }) => {
  const cssClasses = `w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A6085] ${otherClasses}`
  return (
    <div>
      <input
        {...props}
        className={cssClasses}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
