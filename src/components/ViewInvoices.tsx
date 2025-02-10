
import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Typography, Alert, Tooltip } from 'antd';
import { getInvoicesByEmail } from '../services/invoiceService';
import { Invoice } from '../types';

const { Text } = Typography;

interface Props {
  userInfo:Record<string, any>
}

const ViewInvoices: React.FC<Props> = ({userInfo}) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getInvoicesByEmail(userInfo.email);
        
        setInvoices(response);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch invoices');
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'error';
      case 'paid': return 'success';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const parseSuggestions = (suggestionsStr: string | null) => {
    if (!suggestionsStr) return [];
    try {
      return JSON.parse(suggestionsStr);
    } catch (error) {
      console.error('Failed to parse suggestions', error);
      return [];
    }
  };

  const columns = [
    {
      title: 'Invoice Number',
      dataIndex: 'invoice_number',
      key: 'invoice_number',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => `$${parseFloat(amount).toFixed(2)}`,
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
      render: (status: string) => (
        <Tag color={getPaymentStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Buyer',
      dataIndex: 'buyer_name',
      key: 'buyer_name',
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor_name',
      key: 'vendor_name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Invoice) => {
        const suggestions = parseSuggestions(record.suggestions);
        return (
          <Tooltip 
            title={
              suggestions.length > 0 ? (
                <ul>
                  {suggestions.map((suggestion: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              ) : 'No suggestions'
            }
          >
            <a>View Suggestions</a>
          </Tooltip>
        );
      },
    }
  ];

  if (error) {
    return (
      <Card title="View Invoices">
        <Alert 
          message="Error" 
          description={error} 
          type="error" 
          showIcon 
        />
      </Card>
    );
  }

  return (
    <Card
      title="View Invoices"
      style={{
        minHeight: "500px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <Table 
        columns={columns} 
        dataSource={invoices}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
        locale={{
          emptyText: 'No invoices found'
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <p><strong>Grace Period:</strong> {record.grace_period || 'N/A'}</p>
              <p><strong>Discount Rate:</strong> {record.discount_rate || 'N/A'}</p>
              <p><strong>Late Fee:</strong> {record.late_fee || 'N/A'}</p>
            </div>
          ),
        }}
      />
    </Card>
  );
};

export default ViewInvoices;