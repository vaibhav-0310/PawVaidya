import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../utils/footer';
import { toast } from "react-toastify";

function Parser() {
  const [pdf, setPdf] = useState(null);
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');

  const uploadPdf = async () => {
    if (!pdf) {
      toast.error('Please select a PDF file first');
      return;
    }
    
    console.log('Selected file:', pdf);
    console.log('File type:', pdf.type);
    console.log('File size:', pdf.size);
    
    const formData = new FormData();
    formData.append('pdf', pdf);
    
    // Log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log('FormData entry:', key, value);
    }

    try {
      const response = await axios.post('/api/pdf-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('PDF uploaded successfully');
      
    } catch (error) {
     
      toast.error('Upload failed: ' + (error.response?.data?.error || error.message));
    }
  };

  const askQuestion = async () => {
    const res = await axios.post('/api/ask', { query });
    setAnswer(res.data.answer);
  };

  return (
    <>
      <div className="min-vh-100" style={{ backgroundColor: '#fff0f5' }}>
        <div className="container py-5">  
          <div className="row mb-5">
            <div className="col-12">
              <div className="text-center mb-4">
                &#128308; AI Document Analysis
                <br />
                <br />
                <span style={{ fontSize: "50px", fontWeight: "bold" }}>
                  Chat with Paw<span className="back">Vaidya</span>
                </span>
                <br />
                <br />
                Upload your Med documents and get instant answers using AI
                <br />
              </div>
            </div>
          </div>

          <div className="row justify-content-center mb-5">
            <div className="col-lg-8">
              <div className="card shadow-lg border-0 rounded-4" style={{ backgroundColor: '#ffffff' }}>
                <div 
                  className="card-header text-white text-center py-4 rounded-top-4"
                  style={{ 
                    background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
                    border: 'none'
                  }}
                >
                  <h3 className="mb-0 fw-semibold">
                    <i className="fas fa-file-pdf me-2"></i>
                    Upload PDF Document
                  </h3>
                </div>
                <div className="card-body p-5" style={{ backgroundColor: '#fef7f7' }}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-dark mb-3">
                      Choose PDF File
                    </label>
                    <div className="position-relative">
                      <input
                        type="file"
                        accept="application/pdf"
                        className="form-control form-control-lg border-2 rounded-3"
                        onChange={e => setPdf(e.target.files[0])}
                        style={{
                          height: "50px",
                          paddingTop: "10px",
                          fontSize: "1rem",
                          border: pdf ? "2px solid #ff6b9d" : "2px dashed #dee2e6",
                          backgroundColor: '#ffffff'
                        }}
                      />
                      {pdf && (
                        <div className="mt-3 p-3 rounded-3" style={{ backgroundColor: '#ffffff', border: '1px solid #ff6b9d' }}>
                          <small className="fw-semibold" style={{ color: '#ff6b9d' }}>
                            <i className="fas fa-check-circle me-1"></i>
                            Selected: {pdf.name}
                          </small>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="d-grid">
                    <button
                      onClick={uploadPdf}
                      className="btn btn-primary btn-lg rounded-3 py-3 fw-semibold"
                      disabled={!pdf}
                      style={{
                        background: "linear-gradient(135deg, #ff6b9d, #ff8fab)",
                        border: "none",
                        boxShadow: "0 4px 15px rgba(255, 107, 157, 0.2)",
                      }}
                    >
                      <i className="fas fa-upload me-2"></i>
                      Upload PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-lg border-0 rounded-4" style={{ backgroundColor: '#ffffff' }}>
                <div
                  className="card-header text-white py-4 rounded-top-4"
                  style={{
                    background: "linear-gradient(135deg, #ff6b9d, #ff8fab)",
                    border: "none"
                  }}
                >
                  <h3 className="mb-0 fw-semibold">
                    <i className="fas fa-question-circle me-2"></i>
                    Ask Questions
                  </h3>
                </div>

                <div className="card-body p-5" style={{ backgroundColor: '#fef7f7' }}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-dark mb-3">
                      Your Question
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Ask a question about your PDF..."
                        className="form-control form-control-lg border-2 rounded-start-3"
                        style={{
                          fontSize: "1rem",
                          border: "2px solid #dee2e6",
                          backgroundColor: '#ffffff'
                        }}
                        on KeyPress={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            askQuestion();
                          }
                        }}
                      />
                      <button
                        onClick={askQuestion}
                        className="btn btn-lg rounded-end-3"
                        style={{
                          background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
                          border: "none",
                          color: "white",
                          paddingLeft: "30px",
                          paddingRight: "30px"
                        }}
                      >
                        <i className="fas fa-paper-plane me-2"></i>
                        Ask
                      </button>
                    </div>
                  </div>

                  {answer && (
                    <div className="mt-4">
                      <div className="alert alert-info border-0 rounded-3" style={{ 
                        background: 'linear-gradient(45deg, #e3f2fd, #bbdefb)',
                        borderLeft: '4px solid #2196f3'
                      }}>
                        <div className="d-flex align-items-start">
                          <i className="fas fa-robot me-3 mt-1" style={{ color: '#2196f3', fontSize: '1.2rem' }}></i>
                          <div>
                            <h6 className="fw-semibold mb-2" style={{ color: '#1976d2' }}>AI Answer:</h6>
                            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                              {answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Parser;
