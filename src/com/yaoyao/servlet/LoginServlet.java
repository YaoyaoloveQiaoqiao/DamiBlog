package com.yaoyao.servlet;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.yaoyao.util.DB;
import com.yaoyao.util.StdModel;




@WebServlet("/ManagerPage/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		DB db = new DB();
		String sql = "SELECT * FROM `dami_user` WHERE `user_name` = ? AND `user_password` = md5(?)" ; 
		Object[] params = {username, password};
		List<Map<String, Object>> list = db.query(sql, params);
		StdModel res = new StdModel(list);
		res.setCount(list.size());
		
		if(res.getCount() == 1){
	        HttpSession session = request.getSession();
            session.setAttribute("user", username);
			response.getWriter().append("{\"code\":200}");
		}
		else{
			response.getWriter().append("{\"code\":400}");
		}
		
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
