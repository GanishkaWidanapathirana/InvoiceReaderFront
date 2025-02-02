import React from "react";
import { Card, Typography, Descriptions, Button, Row, Col, Divider } from "antd";
import Suggestions from "./Suggestions";
import { InvoiceResponse } from "../types";

const { Title, Paragraph } = Typography;

interface Props {
  invoice: InvoiceResponse;
}

// Helper function to conditionally render non-null values
const renderItem = (label: string, value: string | null) => {
  return value ? (
    <Descriptions.Item label={label} style={{ color: "#001529" }}>
      {value}
    </Descriptions.Item>
  ) : null;
};

const InvoiceDetails: React.FC<Props> = ({ invoice }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(invoice.email_body.body);
  };

  return (
    <Card
      title="Invoice Details"
      style={{
        margin: "16px",
        width: "100%",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row gutter={[16, 16]}>
        {/* Left Column with Invoice Details */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Descriptions bordered column={1} style={{ marginBottom: "24px" }}>
            {renderItem("Invoice Number", invoice.invoice_number)}
            {renderItem("Amount", `€${invoice.amount}`)}
            {renderItem("Due Date", invoice.due_date)}
            {renderItem("Payment Status", invoice.payment_status)}
            {renderItem("Vendor Name", invoice.vendor_name)}
            {renderItem("Buyer Name", invoice.buyer_name)}
            {renderItem("Discount Rate", invoice.discount_rate)}
            {renderItem("Late Fee", invoice.late_fee)}
            {renderItem("Grace Period", invoice.grace_period)}
          </Descriptions>
        </Col>

        {/* Right Column with Suggestions Section */}
        <Col xs={24} sm={24} md={12} lg={12}>
          {/* Suggestions Section */}
          {invoice.suggestions.length > 0 && (
            <>
              <Title level={4} style={{ color: "#001529", marginBottom: "16px" }}>
                Suggestions
              </Title>
              <Suggestions suggestions={invoice.suggestions} />
              <Divider />
            </>
          )}

          {/* Email Section */}
          {invoice.email_body.body && (
            <>
              <Title level={4} style={{ color: "#001529", marginBottom: "16px" }}>
                Generated Email
              </Title>
              <Card
                style={{
                  backgroundColor: "#f7f7f7",
                  padding: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Paragraph>
                  <strong>Subject:</strong> {invoice.email_body.subject}
                </Paragraph>
                <Paragraph>{invoice.email_body.body}</Paragraph>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#001529",
                    borderColor: "#001529",
                    color: "#fff",
                    borderRadius: "5px",
                  }}
                  onClick={copyToClipboard}
                  block
                >
                  Copy Email Text
                </Button>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default InvoiceDetails;
