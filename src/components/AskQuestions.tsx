import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Space, Typography, Spin } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { askQuestionService } from '../services/askQuestionService'
import { showError, showSuccess } from "../utils/notifications";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}
interface Props {
  documentId:string|null
}

const AskQuestions: React.FC<Props> = (documentId) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  console.log(documentId.documentId)
  useEffect(() => {
    setMessages([{
      text: documentId.documentId 
        ? "How can I help you with this invoice?" 
        : "Please upload an invoice first to start the conversation.",
      isUser: false,
      timestamp: new Date(),
    }]);
  }, [documentId]);

  const handleSend = async () => {
      if (!inputText.trim()) return;

      // Check for document ID
      if (!documentId.documentId) {
          showError(
            'Error',"You don't have uploaded invoice. Please upload a document first."
          );
          return;
      }

      // Add user message
      const userMessage: Message = {
          text: inputText,
          isUser: true,
          timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      setIsLoading(true);

      try {
          // Call service and get response
          const response = await askQuestionService(inputText,documentId.documentId);
          console.log(response)
          // Add assistant message
          const assistantMessage: Message = {
              text: response,
              isUser: false,
              timestamp: new Date(),
          };
          setMessages(prev => [...prev, assistantMessage]);
      } catch (error) {
          // Handle error - add error message to chat
          const errorMessage: Message = {
              text: "Sorry, I couldn't process your request. Please try again.",
              isUser: false,
              timestamp: new Date(),
          };
          setMessages(prev => [...prev, errorMessage]);
      } finally {
          setIsLoading(false);
      }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card
      styles={{
        body: {
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
        }
      }}
    >
      {/* Messages Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              alignSelf: message.isUser ? 'flex-end' : 'flex-start',
              maxWidth: '80%'
            }}
          >
            <Card
              size="small"
              style={{
                backgroundColor: message.isUser ? '#1890ff' : '#f5f5f5',
                borderRadius: '8px',
              }}
              bodyStyle={{
                padding: '8px 12px',
              }}
            >
              <Typography.Text
                style={{
                  color: message.isUser ? 'white' : 'rgba(0, 0, 0, 0.85)',
                  wordBreak: 'break-word'
                }}
              >
                {message.text}
              </Typography.Text>
            </Card>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div
        style={{
          padding: '16px',
          borderTop: '1px solid #f0f0f0',
          backgroundColor: '#fff'
        }}
      >
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder="Type your question..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button
            type="primary"
            icon={isLoading ? <Spin size="small" /> : <SendOutlined />}
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
          >
            Send
          </Button>
        </Space.Compact>
      </div>
    </Card>
  );
};

export default AskQuestions;