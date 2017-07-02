package com.yaoyao.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DB {
	/**
	 * Jdbc Util
	 */

	private String url = "jdbc:mysql://127.0.0.1:3306/dami_blog?characterEncoding=UTF-8";
	private String username = "root";
	private String password = "123456";
	
	
	public int update(String sql, Object[] params) {

		int res = -1;

		Connection conn = null;
		PreparedStatement pstmt = null;

		try {
			conn = (Connection) DriverManager.getConnection(url, username, password);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			for (int i = 0; i < params.length; i++) {
				pstmt.setObject(i + 1, params[i]);
			}
			res = pstmt.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		release(null, pstmt, conn);

		return res;
	}
	
	public List<Map<String, Object>> query(String sql ,Object[] params){
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet resultSet = null;
		
		try{
			conn = (Connection) DriverManager.getConnection(url, username, password);
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			for (int i = 0; i < params.length; i++) {
				pstmt.setObject(i + 1, params[i]);
			}
			
			resultSet = pstmt.executeQuery();
			
			ResultSetMetaData rsmd = resultSet.getMetaData();
			
			int count = rsmd.getColumnCount();
			
			while (resultSet.next()) {
				Map<String, Object> column = new HashMap<String, Object>();
				for (int i = 1; i <= count; i++) {
					String columnName = rsmd.getColumnName(i);
					Object object = resultSet.getObject(columnName);
					column.put(columnName, object);
				}
				list.add(column);
			}
			
		}catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return list;
	}

	private void release(ResultSet resultSet, PreparedStatement pstmt, Connection conn) {
		try {
			if (resultSet != null) {
				resultSet.close();
				resultSet = null;
			}
			if (pstmt != null) {
				pstmt.close();
				pstmt = null;
			}
			if (conn != null) {
				conn.close();
				conn = null;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	static {
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
