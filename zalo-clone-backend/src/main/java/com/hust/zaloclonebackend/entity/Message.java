package com.hust.zaloclonebackend.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.*;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "messages")
public class Message {

    @ManyToOne
    User sender;

    @ManyToOne
    User receiver;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long messageId;

    String content;

    Date timestamp;
}
