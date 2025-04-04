// package com.eventzen.webapp.entities;

// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;
// import org.springframework.data.mongodb.core.mapping.Field;
// import java.util.Date;

// @Document(collection = "events")
// public class Event {

//     @Id
//     @Field("_id") // Explicitly map MongoDB's `_id` to `eventId`
//     private String eventId;

//     private String eventName;
//     private Date eventDateTime;
//     private Integer capacityLimits;
//     private Double pricing;
//     private String categoryTheme;

//     // Getters and Setters
//     public String getEventId() {
//         return eventId;
//     }

//     public void setEventId(String eventId) {
//         this.eventId = eventId;
//     }

//     public String getEventName() {
//         return eventName;
//     }

//     public void setEventName(String eventName) {
//         this.eventName = eventName;
//     }

//     public Date getEventDateTime() {
//         return eventDateTime;
//     }

//     public void setEventDateTime(Date eventDateTime) {
//         this.eventDateTime = eventDateTime;
//     }

//     public Integer getCapacityLimits() {
//         return capacityLimits;
//     }

//     public void setCapacityLimits(Integer capacityLimits) {
//         this.capacityLimits = capacityLimits;
//     }

//     public Double getPricing() {
//         return pricing;
//     }

//     public void setPricing(Double pricing) {
//         this.pricing = pricing;
//     }

//     public String getCategoryTheme() {
//         return categoryTheme;
//     }

//     public void setCategoryTheme(String categoryTheme) {
//         this.categoryTheme = categoryTheme;
//     }
// }

// package com.eventzen.webapp.entities;

// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;
// import org.springframework.data.mongodb.core.mapping.Field;

// import java.time.Instant;

// @Document(collection = "events")
// public class Event {

//     @Id
//     // @Field("_id") // Explicitly map MongoDB's `_id` to `eventId`
//     // private String eventId;

//     private String eventName;
//     private Instant eventDateTime;
//     private Integer capacityLimits;
//     private Double pricing;
//     private String categoryTheme;

//     // Default Constructor
//     public Event() {
//     }

//     // Parameterized Constructor
//     public Event(String eventId, String eventName, Instant eventDateTime, Integer capacityLimits, Double pricing, String categoryTheme) {
//         // this.eventId = eventId;
//         this.eventName = eventName;
//         this.eventDateTime = eventDateTime;
//         this.capacityLimits = capacityLimits;
//         this.pricing = pricing;
//         this.categoryTheme = categoryTheme;
//     }

//     // Getters and Setters
//     // public String getEventId() {
//     //     return eventId;
//     // }

//     // public void setEventId(String eventId) {
//     //     this.eventId = eventId;
//     // }

//     public String getEventName() {
//         return eventName;
//     }

//     public void setEventName(String eventName) {
//         this.eventName = eventName;
//     }

//     public Instant getEventDateTime() {
//         return eventDateTime;
//     }

//     public void setEventDateTime(Instant eventDateTime) {
//         this.eventDateTime = eventDateTime;
//     }

//     public Integer getCapacityLimits() {
//         return capacityLimits;
//     }

//     public void setCapacityLimits(Integer capacityLimits) {
//         this.capacityLimits = capacityLimits;
//     }

//     public Double getPricing() {
//         return pricing;
//     }

//     public void setPricing(Double pricing) {
//         this.pricing = pricing;
//     }

//     public String getCategoryTheme() {
//         return categoryTheme;
//     }

//     public void setCategoryTheme(String categoryTheme) {
//         this.categoryTheme = categoryTheme;
//     }
// }

package com.eventzen.webapp.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;

@Document(collection = "events")
public class Event {

    @Id
    // @Field("_id") // Explicitly map MongoDB's `_id` to `eventId`
    // private String eventId;

    private String eventId; // Renamed from eventName to eventId
    private String eventName; // New field added below eventId
    private Instant eventDateTime;
    private Integer capacityLimits;
    private Double pricing;
    private String categoryTheme;
    private String orgId; 

    // Default Constructor
    public Event() {
    }

    // Parameterized Constructor
    public Event(String eventId, String eventName, Instant eventDateTime, Integer capacityLimits, Double pricing, String categoryTheme, String orgId) {
        // this.eventId = eventId;
        this.eventId = eventId; // Updated to match the new field name
        this.eventName = eventName; // Added for the new eventName field
        this.eventDateTime = eventDateTime;
        this.capacityLimits = capacityLimits;
        this.pricing = pricing;
        this.categoryTheme = categoryTheme;
        this.orgId = orgId;

    }

    // Getters and Setters
    // public String getEventId() {
    //     return eventId;
    // }

    // public void setEventId(String eventId) {
    //     this.eventId = eventId;
    // }

    public String getEventId() { // Getter for the new eventId field
        return eventId;
    }

    public void setEventId(String eventId) { // Setter for the new eventId field
        this.eventId = eventId;
    }

    public String getEventName() { // Getter for the new eventName field
        return eventName;
    }

    public void setEventName(String eventName) { // Setter for the new eventName field
        this.eventName = eventName;
    }

    public Instant getEventDateTime() {
        return eventDateTime;
    }

    public void setEventDateTime(Instant eventDateTime) {
        this.eventDateTime = eventDateTime;
    }

    public Integer getCapacityLimits() {
        return capacityLimits;
    }

    public void setCapacityLimits(Integer capacityLimits) {
        this.capacityLimits = capacityLimits;
    }

    public Double getPricing() {
        return pricing;
    }

    public void setPricing(Double pricing) {
        this.pricing = pricing;
    }

    public String getCategoryTheme() {
        return categoryTheme;
    }

    public void setCategoryTheme(String categoryTheme) {
        this.categoryTheme = categoryTheme;
    }

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
            this.orgId = orgId;
    }
}