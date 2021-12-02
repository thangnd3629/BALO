package com.hust.zaloclonebackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModelGetPostBody {
    private String id;
    private String describe;
    private Date createAt;
    private int like;
    private int numComment;
    int isLike;
}
