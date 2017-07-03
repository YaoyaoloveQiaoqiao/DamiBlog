package com.yaoyao.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yaoyao.util.DB;
import com.yaoyao.util.StdModel;

/**
 * Servlet implementation class ArticleServlet
 */
@WebServlet("/ArticleServlet")
public class ArticleServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
			String sql = "SELECT * FROM `dami_article_type`,`dami_article` WHERE `dami_article_type`.`article_type_id`="+
		    "`dami_article`.`article_type_id` GROUP BY `dami_article`.`article_type_id` limit "+page_id*size+","+size;
		    Object[] params = {};
			List<Map<String,Object>> articleList = db.query(sql, params);
			StdModel std = new StdModel(articleList);
			String sqlGetcount = "SELECT count(*) FROM `dami_article`";
			long count = (long)db.query(sqlGetcount, params).get(0).get("count(*)");
			std.setPage(0);
		    std.setCount(count);
		    std.setPage_count((long) Math.ceil(count / (size * 1.0f)));
		    out.print(std.toString());

		}
		if("delete".equals(method)){
			int article_id = Integer.parseInt(request.getParameter("article_id"));
			String sql = "DELETE FROM `dami_article` WHERE `article_id` = ?";
			Object[] params = {article_id};
			int res = db.update(sql, params);
			StdModel std = new StdModel();
			if(res == 0){
				std.setCode(400);//fail
			}
			out.print(std.toString());
			
		}if("add".equals(method)){
			String article_name = request.getParameter("article_name");
			String article_type_id = request.getParameter("article_type_id");
			String article_content = request.getParameter("article_content");
			
			long article_time = System.currentTimeMillis();
			article_time = article_time / 1000;
			
			System.out.println(article_content);
			String sql = "INSERT INTO `dami_article` (`article_title`,`article_type_id`,`article_content`,`article_time`) VALUES (?,?,?,?)";
			Object[] params = {article_name,article_type_id,article_content,article_time};
			int res = db.update(sql, params);
			StdModel std = new StdModel();
			if(res == 0){
				std.setCode(400);
			}
			out.println(std.toString());
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
