package com.hust.zaloclonebackend.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Getter
@Setter
@Entity
@ToString
public class User {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
        strategy = "uuid2"
    )
    private String userId;

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

    @OneToMany(mappedBy = "poster") // User possess many Posts
    List<Post> post;
    
    // List of relationship of user B adding this user as a friend, there'll be a better solution for this but idk
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


    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    public ArrayList<User> getBlockList()
    {
        ArrayList<User> result = new ArrayList<>();
        for (Block block : this.blockedUsers) {
            result.add(block.getBlockedUser()); 
        }

        return result;
    }
}
