package com.hust.zaloclonebackend.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "blocks")

public class Block {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long blockId;

    @ManyToOne
    User user;

    @ManyToOne
    User blockedUser;
}
