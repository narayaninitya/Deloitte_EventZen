package com.eventzen.webapp.repositories;

import com.eventzen.webapp.entities.Event;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {

    List<Event> findByOrgId(String orgId);

}