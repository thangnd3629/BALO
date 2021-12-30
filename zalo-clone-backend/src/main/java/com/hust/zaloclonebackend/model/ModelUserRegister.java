package com.hust.zaloclonebackend.model;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class ModelUserRegister {
    @NotBlank(message = "Được yêu cầu")
    @Size(max = 12, min = 9, message = "Độ dài từ 9 đến 12")
    String phoneNumber;

    @NotBlank(message = "Được yêu cầu")
    @Size(min = 6, message = "Độ dài vượt từ 9 đến 12")
    String password;

    @NotBlank(message = "Được yêu cầu")
    @Size(min = 10, max = 100, message = "Độ dài từ 10 đến 100")

    String name;
}
