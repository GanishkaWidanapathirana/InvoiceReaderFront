import React from "react";
import { List } from "antd";
import { Suggestion } from "../types";

interface Props {
  suggestions: Suggestion[];
}

const Suggestions: React.FC<Props> = ({ suggestions }) => {
  return (
    <div>
      {suggestions.length > 0 ? (
        <List
          bordered
          dataSource={suggestions}
          renderItem={(item) => <List.Item>{item.description}</List.Item>}
        />
      ) : (
        <p>No suggestions available. Upload and process a document to see results.</p>
      )}
    </div>
  );
};

export default Suggestions;
