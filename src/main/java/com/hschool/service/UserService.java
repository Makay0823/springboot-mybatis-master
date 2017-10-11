package com.hschool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hschool.mapper.UserMapper;
import com.hschool.model.User;


/**
 * @author Wangl
 *
 */
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public User getUserInfo(){
        User user=userMapper.findUserInfo();
        //User user=null;
        return user;
    }
    public User findUserInfo(String username ,String password){
    	int k =userMapper.findUserInfoByUserName(username);
    	User user = new User();
    	if(k  >0 ){
    		user.setUsername(username);
    		user.setPassword(password);
    		user= userMapper.findUserInfoByUserNameAndPasswprd(user);
    	}
    	
    	return user;
    }

}
