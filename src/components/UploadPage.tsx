import { Row, Col, Card, Spin } from "antd";
import UploadDocument from "./UploadDocument";
import InvoiceDetails from "./InvoiceDetails";
import { useState } from "react";
import { ApiResponse } from "../types";
import { processDocument } from "../services/documentService";
import { showError, showSuccess } from "../utils/notifications";

interface Props {
  setDocumentId: (documentId: string|null) => void;
}

  


const UploadPage: React.FC<Props> = ({setDocumentId}) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [invoiceData, setInvoiceData] = useState<ApiResponse | null>(null);
    const [userType, setUserType] = useState<string>("buyer");

    const handleProcess = async () => {
        if (!uploadedFile) return;

        setLoading(true);
        try {
        const result: ApiResponse = await processDocument(uploadedFile, userType);
        setInvoiceData(result);
        setDocumentId(result.response.document_id);
        showSuccess("Invoice processed successfully!", "Your invoice has been processed successfully!");
        } catch (error) {
        showError("Error processing invoice", "Your invoice failed to process!");
        console.error("Error processing invoice:", error);
        } finally {
        setLoading(false);
        }
    };


  return (
    <>
      <Row gutter={[0, 16]} style={{ margin: 2 }}>
      <Col span={24}>
        <Card
          style={{
            backgroundColor: "#fff",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px",
          }}
          bodyStyle={{ width: '100%', padding: '0 16px' }}
        >
          <UploadDocument 
            onFileUpload={setUploadedFile} 
            onProcess={handleProcess} 
            setUserType={setUserType} 
          />
        </Card>
      </Col>
    </Row>

    <Row gutter={[0, 16]} style={{ margin: 2 }}>
    <Col span={24}>
        <Card
        style={{
            minHeight: "500px",
            backgroundColor: "#fff",
            margin: "4px",
            width: "100%",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
        }}
        >
        {loading ? (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
            <Spin size="large" />
            </div>
        ) : (
            invoiceData && <InvoiceDetails invoice={invoiceData.response} />
        )}
        </Card>
    </Col>
    </Row>
    </>
  );
};

export default UploadPage;
