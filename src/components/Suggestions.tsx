import React from "react";
import { List } from "antd";

interface Props {
  suggestions: string[];
}

const Suggestions: React.FC<Props> = ({ suggestions }) => {
  console.log(suggestions)
    // Filter out any null or empty values if needed
    const validSuggestions = suggestions.filter((item) => item !== null && item !== "");

    return (
      <div>
        {validSuggestions.length > 0 ? (
          <List
            bordered
            dataSource={validSuggestions}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        ) : (
          <p>No suggestions available. Upload and process a document to see results.</p>
        )}
      </div>
    );
};

export default Suggestions;
