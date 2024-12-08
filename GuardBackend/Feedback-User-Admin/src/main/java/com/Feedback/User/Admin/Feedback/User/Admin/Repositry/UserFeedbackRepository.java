package com.Feedback.User.Admin.Feedback.User.Admin.Repositry;

import com.Feedback.User.Admin.Feedback.User.Admin.Entity.UserFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFeedbackRepository extends JpaRepository<UserFeedback, Long> {
}
