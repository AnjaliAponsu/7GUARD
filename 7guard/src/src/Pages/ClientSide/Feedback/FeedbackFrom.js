import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedbackForm = ({ onAddFeedback, onUpdateFeedback, editingFeedback,deleteingFeedbak }) => {
  const [feedback, setFeedback] = useState({
    name: "",
    channelingNo: "",
    phoneNumber: "",
    feedbackComment: "",
  });

  const [message, setMessage] = useState(""); // State for success or error message

  useEffect(() => {
    if (editingFeedback) {
      setFeedback(editingFeedback);
    } else {
      resetForm();
    }
  }, [editingFeedback]);

  const resetForm = () => {
    setFeedback({
      name: "",
      channelingNo: "",
      phoneNumber: "",
      feedbackComment: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:8080/api/feedback";

    try {
      if (editingFeedback?.id) {
        // Update existing feedback
        console.log("Updating Feedback:", feedback);
        const response = await axios.put(`${apiUrl}/${editingFeedback.id}`, feedback);

        if (response.status === 200 || response.status === 204) {
          alert("Feedback updated successfully!");
          setMessage("Feedback updated successfully!");
          onUpdateFeedback(response.data || feedback); // Notify parent component
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      } else {
        // Submit new feedback
        console.log("Submitting New Feedback:", feedback);
        const response = await axios.post(apiUrl, feedback);

        if (response.status === 200 || response.status === 201) {
          alert("Feedback submitted successfully!");
          setMessage("Feedback submitted successfully!");
          onAddFeedback(response.data); // Notify parent component
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Error in Feedback Submission:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || error.message || "Internal Server Error";
      alert(`Failed to process feedback: ${errorMsg}`);
      setMessage(`Failed to process feedback: ${errorMsg}`);
    } finally {
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
      resetForm();
    }
  };

  
  return (
    <div className='form20'>
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="col-sm-8 py-1 px-5 shadow form21">
      <h1 className="ha4">Feedback Form</h1>
      <p>It only takes two minutes!!</p>
      <form onSubmit={handleSubmit} className="feedback-form">
        
      <div className="form-group row mb-2">
        <label className="col-sm-2 col-form-label">Name :</label>
        <div className="col-sm-8">
        <input
          type="text"
          value={feedback.name}
          onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
          required
          className="form-control"
        />
        </div>
        </div>

        <div className="form-group row mb-2">
        <label className="col-sm-2 col-form-label">Channeling No :</label>
        <div className="col-sm-8">
          <input
          type="text"
          value={feedback.channelingNo}
          onChange={(e) => setFeedback({ ...feedback, channelingNo: e.target.value })}
          required
          className="form-control"
        />
        </div>
        </div>

        <div className="form-group row mb-2">
        <label className="col-sm-2 col-form-label">Email :</label>
        <div className="col-sm-8">
          <input
          type="email"
          value={feedback.phoneNumber}
          onChange={(e) => setFeedback({ ...feedback, phoneNumber: e.target.value })}
          required
          className="form-control"
        />
        </div>
        </div>

        <div className="form-group row mb-2">
        <label className="col-sm-2 col-form-label">Write your Suggestions :</label>
        <div className="col-sm-8">
          <textarea
          className="form-control"
          value={feedback.feedbackComment}
          onChange={(e) => setFeedback({ ...feedback, feedbackComment: e.target.value })}
        />
        </div>
        </div>

        <button className='btn vbtn mb-2' type="submit">Submit
          
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default FeedbackForm;
