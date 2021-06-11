import React from "react";

export default React.memo(function ResultsListItem({ name, work, id, onClick }) {
  return (
    <div 
      key={id}
      className="shadow-md hover:bg-gray-200 my-4 px-3 py-2 cursor-pointer w-3/5"
      onClick={() => onClick(id)}
    >
      <p className="text-lg font-semibold">{name}</p>
      <p className="text-base">{work?.base}</p>
    </div>
  );
});