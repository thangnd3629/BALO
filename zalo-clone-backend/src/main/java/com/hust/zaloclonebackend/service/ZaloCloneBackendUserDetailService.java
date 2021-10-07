package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.repo.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ZaloCloneBackendUserDetailService implements UserDetailsService {

    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {

        com.hust.zaloclonebackend.entity.User user = userRepo.findUserByPhoneNumber(phoneNumber);
        String[] roles = {"ADMIN"};
        if (user != null) {
            return new User(user.getPhoneNumber(), user.getPassword(), AuthorityUtils.createAuthorityList(
                    roles));
        } else {
            throw new UsernameNotFoundException("Username Not Found");
        }
    }
}
