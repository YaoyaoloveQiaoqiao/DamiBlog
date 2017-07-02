package com.yaoyao.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.alibaba.fastjson.JSON;
import com.yaoyao.util.DB;
import com.yaoyao.util.StdModel;


/**
 * Servlet implementation class ArticleTypeServlet
 */
@WebServlet("/ArticleTypeServlet")
public class ArticleTypeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		DB db = new DB();
		String method = request.getParameter("m");
		PrintWriter out = response.getWriter();
		if("list".equals(method)){
			String para_page_id = request.getParameter("page_id");
		    if (para_page_id == null) {
		        para_page_id = "0";
		    }
		    int page_id = Integer.parseInt(para_page_id);
		    int size = 10;
			String sql = "SELECT * FROM `dami_article_type` limit "+page_id*size+","+size;
		    Object[] params = {};
			List<Map<String,Object>> articleTypeList = db.query(sql, params);
			StdModel std = new StdModel(articleTypeList);
			String sqlGetcount = "SELECT count(*) FROM `dami_article_type`";
			long count = (long)db.query(sqlGetcount, params).get(0).get("count(*)");
			
			std.setPage(0);
		    std.setCount(count);
		    std.setPage_count((long) Math.ceil(count / (size * 1.0f)));
		    out.print(std.toString());

		}
		if("delete".equals(method)){
			int article_type_id = Integer.parseInt(request.getParameter("article_type_id"));
			String sql = "DELETE FROM `dami_article_type` WHERE `article_type_id` = ?";
			Object[] params = {article_type_id};
			int res = db.update(sql, params);
			StdModel std = new StdModel();
			if(res == 0){
				std.setCode(400);//fail
			}
			out.print(std.toString());
			
		}
		if("add".equals(method)){
			String article_type_name = request.getParameter("article_type_name");
			System.out.println(article_type_name);
			String sql = "INSERT INTO `dami_article_type` (`article_type_name`) VALUES (?)";
			Object[] params = {article_type_name};
			int res = db.update(sql, params);
			StdModel std = new StdModel();
			if(res == 0){
				std.setCode(400);
			}
			out.println(std.toString());
		}
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
