import React from "react";

const CustomerVideoStatsCard = ({
  value,
  description,
  className,
  borderColor,
}) => {
  return (
    <div
      className={`flex flex-col py-4 shadow-sm items-start gap-1 text-start bg-white rounded-md border-l-3 ${borderColor} hover:scale-105 transition-all duration-300`}
    >
      <h1 className={`text-2xl ml-4 font-bold ${className}`}>{value}</h1>
      <p className="text-sm ml-4">{description}</p>
    </div>
  );
};

export default CustomerVideoStatsCard;
