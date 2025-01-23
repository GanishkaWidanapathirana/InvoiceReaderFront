import React from "react";

interface Props {
  suggestions: string[];
}

const Suggestions: React.FC<Props> = ({ suggestions }) => {
  return (
    <div>
      {suggestions.length > 0 ? (
        <ul style={{ paddingLeft: "16px", listStyleType: "disc" }}>
          {suggestions.map((suggestion, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              {suggestion}
            </li>
          ))}
        </ul>
      ) : (
        <p>No suggestions available. Upload and process a document to see results.</p>
      )}
    </div>
  );
};

export default Suggestions;
