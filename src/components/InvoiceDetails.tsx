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
  const openMailClient = () => {
    const emailBody = encodeURIComponent(invoice.email_body);
    window.location.href = `mailto:?body=${emailBody}`;
  };

  console.log(invoice)
  return (
    <Row gutter={[16, 16]} style={{ height: '100%' }}>
      {/* Left Column with Invoice Details */}
      <Col xs={24} sm={24} md={12} lg={12}>
        <Card style={{ height: '100%', overflow: 'auto' }}>
          <Descriptions 
            bordered 
            column={1} 
            title="Invoice Details"
            style={{ marginBottom: "24px" }}
          >
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
        </Card>
      </Col>
    {/* Right Column Container */}
<Col xs={24} sm={24} md={12} lg={12}>
  <Row gutter={[0, 16]} style={{ height: '100%' }}>
    {/* Suggestions Section - 1/3 height */}
    {invoice.suggestions.length > 0 && (
      <Col span={24} style={{ height: '40%' }}>
        <Card 
          title={
            <span style={{ 
              fontSize: '16px',
              fontWeight: 500,
              color: '#001529',
              padding: '0'
            }}>
              Suggestions
            </span>
          }
          styles={{
            body: { 
              padding: '12px 24px',
              height: 'calc(100% - 57px)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }
          }}
          style={{ height: '100%' }}
        >
          <div style={{ 
            overflowY: 'auto',
            flex: 1,
            marginTop: '-4px'
          }}>
            <Suggestions suggestions={invoice.suggestions} />
          </div>
        </Card>    
      </Col>           
    )}

    {/* Email Section - 2/3 height */}
    {invoice.email_body && (
      <Col span={24} style={{ height: '60%' }}>
        <Card 
          title={
            <span style={{ 
              fontSize: '16px',
              fontWeight: 500,
              color: '#001529',
              padding: '0'
            }}>
              Generated Email
            </span>
          }
          styles={{
            body: { 
              padding: '12px 24px',
              height: 'calc(100% - 57px)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }
          }}
          style={{ height: '100%' }}
        >
          <div style={{ 
            overflowY: 'auto',
            flex: 1,
            marginTop: '-4px'
          }}>
            <Paragraph 
              style={{ 
                whiteSpace: 'pre-wrap',
                textAlign: 'left',
                marginBottom: '24px'
              }}
            >
              {invoice.email_body}
            </Paragraph>
            <Button
              type="primary"
              style={{
                backgroundColor: "#001529",
                borderColor: "#001529",
                color: "#fff",
                borderRadius: "5px",
              }}
              onClick={openMailClient}
              block
            >
              Send Email
            </Button>
          </div>
        </Card>                
      </Col>
    )}
  </Row>
</Col>
</Row>
  );
};

export default InvoiceDetails;
