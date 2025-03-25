import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedbackForm = ({ onAddFeedback, onUpdateFeedback, editingFeedback }) => {
  const [feedback, setFeedback] = useState({
    name: "",
    channelingNo: "",
    phoneNumber: "",
    feedbackComment: "",
  });

  const [message, setMessage] = useState("");
  const [channeling, setChanneling] = useState(null);

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

  useEffect(() => {
    const fetchChannelingDetails = async () => {
      if (feedback.channelingNo) {
        try {
          const response = await axios.get(
            `http://localhost:8080/7Guard/Channeling/VaccineChanneling/getChannelingByChannelingID/${feedback.channelingNo}`
          );
          setChanneling(response.data);

         
          setFeedback((prevFeedback) => ({
            ...prevFeedback,
            name: response.data.channeling_parent_name || "",
            phoneNumber: response.data.email || "",
            channelingNo: response.data.cha_id || "",
          }));
        } catch (error) {
          console.error("Error fetching channeling data:", error);
        }
      }
    };

    fetchChannelingDetails();
  }, [feedback.channelingNo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:8080/api/feedback";

    try {
      if (editingFeedback?.id) {
        const response = await axios.put(`${apiUrl}/${editingFeedback.id}`, feedback);
        alert("Feedback updated successfully!");
        setMessage("Feedback updated successfully!");
        onUpdateFeedback(response.data || feedback);
      } else {
        const response = await axios.post(apiUrl, feedback);
        alert("Feedback submitted successfully!");
        setMessage("Feedback submitted successfully!");
        onAddFeedback(response.data);
      }
    } catch (error) {
      console.error("Error in Feedback Submission:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || error.message || "Internal Server Error";
      alert(`Failed to process feedback: ${errorMsg}`);
      setMessage(`Failed to process feedback: ${errorMsg}`);
    } finally {
      setTimeout(() => setMessage(""), 3000);
      resetForm();
    }
  };

  return (
    <div className="form20">
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
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

            <button className="btn vbtn mb-2" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
