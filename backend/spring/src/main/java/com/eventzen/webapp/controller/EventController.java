package com.eventzen.webapp.controller;

import com.eventzen.webapp.entities.Event;
import com.eventzen.webapp.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    // GET all events
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        if (events.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 No Content if no events exist
        }
        return ResponseEntity.ok(events);
    }


    // GET event by ID
    @GetMapping("/{_id}")
    public ResponseEntity<Event> getEventById(@PathVariable String _id) {
        Event event = eventService.getEventById(_id);
        if (event == null) {
            return ResponseEntity.notFound().build(); // Return 404 if event is not found
        }
        return ResponseEntity.ok(event);
    }

    //Get event by orgId
    @GetMapping("/org/{orgId}")
    public ResponseEntity<List<Event>> getEventByOrgId(@PathVariable String orgId) {
        List<Event> events = eventService.getEventByOrgId(orgId);
        if (events.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 No Content if no events exist
        }
        return ResponseEntity.ok(events);
    }

    // POST create a new event
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event createdEvent = eventService.createEvent(event);
        return ResponseEntity.status(201).body(createdEvent); // Return 201 Created
    }

    // PUT update an existing event
    @PutMapping("/{_id}")
    public ResponseEntity<Event> updateEvent(@PathVariable String _id, @RequestBody Event updatedEvent) {
        Event event = eventService.updateEvent(_id, updatedEvent);
        if (event == null) {
            return ResponseEntity.notFound().build(); // Return 404 if event is not found
        }
        return ResponseEntity.ok(event);
    }

    // DELETE delete an event
    @DeleteMapping("/{_id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String _id) {
        eventService.deleteEvent(_id);
        return ResponseEntity.noContent().build(); // Return 204 No Content
    }
}

// package com.eventzen.webapp.controller;

// import com.eventzen.webapp.entities.Event;
// import com.eventzen.webapp.models.ApiResponse;
// import com.eventzen.webapp.services.EventService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/events")
// public class EventController {

//     @Autowired
//     private EventService eventService;

//     // Create a new event
//     @PostMapping
//     public ResponseEntity<ApiResponse> createEvent(@RequestBody Event event) {
//         Event createdEvent = eventService.createEvent(event);
//         return new ResponseEntity<>(new ApiResponse("Event Created Successfully", true, createdEvent), HttpStatus.CREATED);
//     }

//     // Get an event by ID
//     @GetMapping("/{eventId}")
//     public ResponseEntity<ApiResponse> getEvent(@PathVariable String eventId) {
//         Event event = eventService.getEventById(eventId);
//         if (event == null) {
//             return new ResponseEntity<>(new ApiResponse("Event Not Found", false, null), HttpStatus.NOT_FOUND);
//         }
//         return new ResponseEntity<>(new ApiResponse("Event Fetched Successfully", true, event), HttpStatus.OK);
//     }

//     // Get all events
//     @GetMapping
//     public ResponseEntity<ApiResponse> getAllEvents() {
//         List<Event> events = eventService.getAllEvents();
//         return new ResponseEntity<>(new ApiResponse("Events Fetched Successfully", true, events), HttpStatus.OK);
//     }

//     // Update an existing event
//     @PutMapping("/{eventId}")
//     public ResponseEntity<ApiResponse> updateEvent(@PathVariable String eventId, @RequestBody Event updatedEvent) {
//         Event event = eventService.updateEvent(eventId, updatedEvent);
//         if (event == null) {
//             return new ResponseEntity<>(new ApiResponse("Event Not Found", false, null), HttpStatus.NOT_FOUND);
//         }
//         return new ResponseEntity<>(new ApiResponse("Event Updated Successfully", true, event), HttpStatus.OK);
//     }

//     // Delete an event
//     @DeleteMapping("/{eventId}")
//     public ResponseEntity<ApiResponse> deleteEvent(@PathVariable String eventId) {
//         eventService.deleteEvent(eventId);
//         return new ResponseEntity<>(new ApiResponse("Event Deleted Successfully", true, null), HttpStatus.NO_CONTENT);
//     }
// }