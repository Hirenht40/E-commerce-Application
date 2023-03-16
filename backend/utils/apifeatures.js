const { json } = require("express");

class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword
        ?{
            name:{
                $regex : this.queryStr.keyword,
                $options: "i",
            }, 
        }
        :{};

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr}

        // Removing some fileds for category
        const removeFileds = ["Keyword", "page", "limit"];

        removeFileds.forEach(key=>delete queryCopy[key]);

        // Filter for price and Rating
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;

    }

    pagination(resultperPage){
        const currentpage = Number(this.queryStr.page) || 1;
    
        const skip = resultperPage * (currentpage - 1);
    
        this.query = this.query.limit(resultperPage).skip(skip);
    
        return this;
    }
};




module.exports = ApiFeatures;
