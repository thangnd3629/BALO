package com.hust.zaloclonebackend.rest.service;

import com.hust.zaloclonebackend.rest.entity.UserLogin;
import com.hust.zaloclonebackend.rest.user.DPerson;

public interface UserService {
    UserLogin findById(String userLoginId);

//    DPerson findByPartyId(String partyId);

//    Page<DPerson> findAllPerson(Pageable page, SortAndFiltersInput query);
//
//    Page<UserRestBriefProjection> findPersonByFullName(Pageable page, String sString);
//
//    Page<UserRestBriefProjection> findUsersByUserLoginId(Pageable page, String sString);
//
//    List<UserLogin> getAllUserLogins();
//
//    UserLogin createAndSaveUserLogin(String userName, String password);
//
//    UserLogin updatePassword(UserLogin user, String password);
//
//    Party createAndSaveUserLogin(PersonModel personModel) throws Exception;
//
//    Party update(PersonUpdateModel personUpdateModel, UUID partyId);
//
//    UserLogin findUserLoginByPartyId(UUID partyId);
//
//    SimpleResponse register(RegisterIM im);
//
//    GetAllRegistsOM getAllRegists();
//
//    SimpleResponse approve(ApproveRegistrationIM im);
//
//    SimpleResponse disableUserRegistration(DisableUserRegistrationIM im);
//
//    UserLogin updatePassword2(String userLoginId, String password);
//
//    List<UserLogin> getALlUserLoginsByGroupId(String groupId);
//
//    List<String> getGroupPermsByUserLoginId(String userLoginId);
//
//    PersonModel findPersonByUserLoginId(String userLoginId);
//
//    List<String> findAllUserLoginIdOfGroup(String groupId);
}
