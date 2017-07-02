package com.yaoyao.util;

import java.util.List;
import java.util.Map;
import com.alibaba.fastjson.JSON;
public class StdModel {
    private int code;
    private long count = 0;
    private long page = 0;
    private long page_count = 0;
    private List<Map<String, Object>> model;
    
    public StdModel(List<Map<String, Object>> res){
        this.code = 200;
        this.setModel(res);
    }
    
    public StdModel(){
        this.code = 200;
    }
    
    public String toString(){
        return JSON.toJSONString(this);
    }
    public int getCode() {
        return code;
    }
    public void setCode(int code) {
        this.code = code;
    }
    public List<Map<String, Object>> getModel() {
        return model;
    }
    public void setModel(List<Map<String, Object>> model) {
        this.model = model;
    }
    public long getCount() {
        return count;
    }
    public void setCount(long count) {
        this.count = count;
    }
    public long getPage() {
        return page;
    }
    public void setPage(long page) {
        this.page = page;
    }
    public long getPage_count() {
        return page_count;
    }
    public void setPage_count(long page_count) {
        this.page_count = page_count;
    }	
}