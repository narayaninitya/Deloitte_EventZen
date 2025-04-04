package com.eventzen.webapp.models;

public class ApiResponse {
    private String message;
    private Boolean status;
    private Object data;

    // Default Constructor
    public ApiResponse() {
    }

    // Parameterized Constructor
    public ApiResponse(String message, Boolean status, Object data) {
        this.message = message;
        this.status = status;
        this.data = data;
    }

    // Getter and Setter for message
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    // Getter and Setter for status
    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    // Getter and Setter for data
    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}