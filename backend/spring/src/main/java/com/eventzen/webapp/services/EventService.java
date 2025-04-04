package com.eventzen.webapp.services;

import com.eventzen.webapp.entities.Event;
import com.eventzen.webapp.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    // Get all events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // Get event by ID
    public Event getEventById(String _id) {
        return eventRepository.findById(_id).orElse(null);
    }

    // Get event by orgId
    public List<Event> getEventByOrgId(String orgId) {
        return eventRepository.findByOrgId(orgId);
    }
    // Create a new event
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    // Update an existing event
    public Event updateEvent(String _id, Event updatedEvent) {
        Event existingEvent = eventRepository.findById(_id).orElse(null);
        if (existingEvent != null) {
            existingEvent.setEventName(updatedEvent.getEventName());
            existingEvent.setEventDateTime(updatedEvent.getEventDateTime());
            existingEvent.setCapacityLimits(updatedEvent.getCapacityLimits());
            existingEvent.setPricing(updatedEvent.getPricing());
            existingEvent.setCategoryTheme(updatedEvent.getCategoryTheme());
            return eventRepository.save(existingEvent);
        }
        return null;
    }

    // Delete an event
    public void deleteEvent(String _id) {
        eventRepository.deleteById(_id);
    }
}
