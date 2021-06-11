import React from "react";

export default React.memo(function Bio({ bio, work, connections }) {
  return (
    <div>
      <div>
        <p className="text-3xl font-bold mt-3">{bio["full-name"]}</p>
        <p className="text-sm italic">({bio["alter-egos"]})</p>
      </div>
      <div className="mt-2">
        <p>{work?.base}</p>
        <p>{connections["group-affiliation"]}</p>
        <p>{connections["relatives"]}</p>
      </div>
    </div>
  );
});