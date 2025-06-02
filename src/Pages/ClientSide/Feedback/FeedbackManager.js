import React, { useState } from "react";
import FeedbackForm from "./FeedbackFrom";
import FeedbackList from "./FeedbackList";
import ClientNavBar from "../../../Component/Nav/ClientNavBar";
import MainNav from "../../../Component/Nav/MainNav";
import Footer from "../../../Component/Footer/Footer";


const FeedbackManager = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);

  const handleAddFeedback = (feedback) => {
    setFeedbacks([...feedbacks, { ...feedback, id: Date.now() }]);
  };

  const handleEditFeedback = (feedback) => {
    setEditingFeedback(feedback);
  };

  const handleUpdateFeedback = (updatedFeedback) => {
    setFeedbacks(
      feedbacks.map((fb) =>
        fb.id === updatedFeedback.id ? { ...updatedFeedback } : fb
      )
    );
    setEditingFeedback(null);
  };

  const handleDeleteFeedback = (id) => {
    setFeedbacks(feedbacks.filter((fb) => fb.id !== id));
  };

  return (
    <div>
      <MainNav/>
      <ClientNavBar/>
    <div>
      <FeedbackForm
        onAddFeedback={handleAddFeedback}
      />
      <FeedbackList
        feedbacks={feedbacks}
        
      />
    </div>
    <Footer/>
    </div>
  );
};

export default FeedbackManager;
