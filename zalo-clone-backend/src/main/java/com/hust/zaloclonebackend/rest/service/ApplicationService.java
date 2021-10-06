package com.hust.zaloclonebackend.rest.service;

import com.hust.zaloclonebackend.rest.entity.Application;
import com.hust.zaloclonebackend.rest.entity.SecurityPermission;

import java.util.List;

public interface ApplicationService {

    List<Application> getListByPermissionAndType(List<SecurityPermission> permissionList, String type);

    Application getById(String applicationId);

    List<String> getScrSecurInfo(String userId);
}

