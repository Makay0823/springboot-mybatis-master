package com.hschool.controller;

import org.apache.log4j.Logger;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hschool.config.shiro.ShiroUtils;
import com.hschool.model.User;
import com.hschool.service.UserService;
import com.hschool.util.R;

/**
 * @author Wangl
 *
 */
@Controller
public class UserController {

    private Logger logger = Logger.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @RequestMapping("/getUserInfo")
    @ResponseBody
    public User getUserInfo() {
        User user = userService.getUserInfo();
        if(user!=null){
            System.out.println("user.getName():"+user.getUsername());
            logger.info("user.getAge():"+user.getUsername());
        }
        return user;
    }
    
    @RequestMapping("/hello2")
    public String greeting(@RequestParam(value="name", required=false, defaultValue="World") String name, Model model) {
    	
    	User user = userService.getUserInfo();
        if(user!=null){
            System.out.println("user.getName():"+user.getUsername());
            logger.info("user.getUsername():"+user.getUsername());
        }
    	model.addAttribute("name", user.getUsername());
        return "hello";
    }
    @RequestMapping("/goLogin")
    @ResponseBody
    public R login(@RequestParam(value="username", required=true, defaultValue="") String username,
    		@RequestParam(value="password", required=true, defaultValue="") String password) {
    	System.out.println(" username: " +username);
    	System.out.println(" password: " +password);
    	try {
    		Subject subject = ShiroUtils.getSubject();
    		//sha256加密
    		//password = new Sha256Hash(password).toHex();
    		UsernamePasswordToken token = new UsernamePasswordToken(username, password);
    		subject.login(token);
		}catch (UnknownAccountException e) {
			return R.error(e.getMessage());
		}catch (IncorrectCredentialsException e) {
			return R.error(e.getMessage());
		}
    	return R.ok();
    }
}
