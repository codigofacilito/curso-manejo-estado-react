import React from "react";

export default React.memo(function ErrorComponent({ error }) {
  return (
    <div>
      <p>{error}</p>
    </div>
  );
});