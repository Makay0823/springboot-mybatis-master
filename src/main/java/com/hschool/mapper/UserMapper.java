package com.hschool.mapper;

import com.hschool.model.User;


/**
 * @author Wangl
 *
 */
public interface UserMapper {
    public User findUserInfo();
    /**
     * 根据用户名查询用户是否存在
     * @return
     */
    public int findUserInfoByUserName(String username);
    
    /**
     * 根据用户名、密码 查询用户是否存在
     * @return
     */
    public User findUserInfoByUserNameAndPasswprd(User uer);
}
