package com.example.GuardBackend.DTO;

import java.time.LocalDate;

public class BmiDTO {

    private final Double bmiValue;
    private Integer chdrId;
    private Double childWeight;
    private Double childHeight;
    private String bmiStatus;
    private LocalDate date;

    public BmiDTO(Double bmiValue, Double childWeight, Double childHeight, String bmiStatus, LocalDate date) {
        this.bmiValue = bmiValue;
        this.childWeight = childWeight;
        this.childHeight = childHeight;
        this.bmiStatus = bmiStatus;
        this.date = date;
    }


    public Integer getChdrId() {
        return chdrId;
    }

    public void setChdrId(Integer chdrId) {
        this.chdrId = chdrId;
    }

    public Double getChildWeight() {
        return childWeight;
    }

    public void setChildWeight(Double childWeight) {
        this.childWeight = childWeight;
    }

    public Double getChildHeight() {
        return childHeight;
    }

    public void setChildHeight(Double childHeight) {
        this.childHeight = childHeight;
    }

    public Double getBmiValue() {
        return bmiValue;
    }

    public String getBmiStatus() {
        return bmiStatus;
    }

    public void setBmiStatus(String bmiStatus) {
        this.bmiStatus = bmiStatus;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
