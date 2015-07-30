package com.springdataservices.crud.tutorial;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.util.List;

@Controller
public class UsersController
{	
	@RequestMapping("/home")
	public String home() {
		return "index";
	}
}
