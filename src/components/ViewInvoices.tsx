import { Card } from "antd";

const ViewInvoices = () => {
  return (
    <Card
      title="View Invoices"
      style={{
        minHeight: "500px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <p>Invoice data will be displayed here.</p>
    </Card>
  );
};

export default ViewInvoices;
