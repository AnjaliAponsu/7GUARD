import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdminFeedback.css'; 
import ReceptionistNavBar from "../../../Component/Nav/ReceptionistNavBar";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [reply, setReply] = useState("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin-feedback");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks", error);
    }
  };

  const handleReply = async (id) => {
    try {
      const feedback = feedbacks.find((fb) => fb.id === id);
      await axios.put(`http://localhost:8080/api/admin-feedback/${id}`, {
        ...feedback,
        reply: reply,
      });
      fetchFeedbacks();
      setReply("");
    } catch (error) {
      console.error("Error replying to feedback", error);
    }
  };

  const handleEdit = async (id, field,value) => {
    try {
      const feedback = feedbacks.find((fb) => fb.id === id);
      await axios.put(`http://localhost:8080/api/admin-feedback/${id}`, {
        ...feedback,
        [field]: value,
      });
      fetchFeedbacks();
      setReply("");
    } catch (error) {
      console.error("Error editing feedback", error);
    }
  };

  const handleDelete = async (id, field) => {
    try {
      const feedback = feedbacks.find((fb) => fb.id === id);
      await axios.put(`http://localhost:8080/api/admin-feedback/del/${id}`, {
        ...feedback,
        [field]:"",
      });
      fetchFeedbacks();
      setReply("");
    } catch (error) {
      console.error("Error delete feedback", error);
    }
  };

  return (
    <div>
      <ReceptionistNavBar/>
    <div className="admin-feedback">
      <h1>Baby Vaccine Feedback</h1>
      {feedbacks.map((feedback) => (
        <div key={feedback.id} className="feedback-card">
          <p><strong>Name:</strong> {feedback.adminName}</p>
          <p><strong>Channeling No:</strong> {feedback.channelingno}</p>
          <p><strong>Email</strong> {feedback.phoneNumber}</p>
          <p><strong>Comment:</strong> {feedback.feedbackComment}</p>
          <p><strong>Admin Reply:</strong> {feedback.reply || "No reply yet"}</p>

          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type your reply here..."
          ></textarea>
          <button className="btn btn-success" style={{width:'80px'}} onClick={() => handleReply(feedback.id)}>Reply</button>

          <button className="btn btn-primary mx-sm-2" style={{width:'80px'}}
            onClick={() =>
              handleEdit(feedback.id, "reply", prompt("Edit Feedback Comment:", feedback.reply))
            }
          >
            Edit
          </button>

          <button className='btn btn-danger' style={{width:'80px'}} onClick={() => handleDelete(feedback.id,"reply")}>Delete</button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default AdminFeedback;
