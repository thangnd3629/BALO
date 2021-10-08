package com.hust.zaloclonebackend.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import java.util.List;
import java.util.UUID;


@Getter
@Setter
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

//    @Column(name = "name")
//    @NotNull
    private String name;

//    @Column(name = "password")
//    @NotNull
    private String password;

//    @Column(name = "phone_number", unique = true)
//    @NotNull
    private String phoneNumber;
    
    //Duc anh
    String avatarLink;

    @OneToMany(mappedBy = "poster")
    List<Post> post;

    @OneToMany(mappedBy = "userA")
    List<Relationship> friends;

    @OneToMany(mappedBy = "userB")
    List<Relationship> beFriendWith;

    @OneToMany(mappedBy = "sender")
    List<Message> sentMess;
    
    @OneToMany(mappedBy = "receiver")
    List<Message> receivedMess;

    @OneToMany(mappedBy = "user")
    List<Block> blockedUsers;

    @OneToMany(mappedBy = "blockedUser")
    List<Block> blockeByUsers;

    @OneToMany(mappedBy = "commentOwner")
    List<Comment> comments;

    @ManyToMany
    List<Post> likedPosts;
}
