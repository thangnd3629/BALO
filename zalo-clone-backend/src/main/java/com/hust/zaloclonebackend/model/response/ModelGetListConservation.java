package com.hust.zaloclonebackend.model.response;

import com.hust.zaloclonebackend.model.ModelConservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModelGetListConservation {
    private int code;
    private String message;
    private List<ModelConservation> data;
    private int numNewMessage;
}
