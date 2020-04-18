const Object = {};



Object.Cdn = function (val){
    this.name= val.name;
    this.latest = val.latest;
    this.version=val.version;
    this.description=val.description;
    this.author=val.author;
    this.filename=val.filename;
    this.keywords=val.keywords;
}


Object.user = function(obj){
    this.username=obj.username;
    this.email=obj.email;
    this.password=obj.password;
    this.img=obj.img||'https://d2hqr1s9kfm9jo.cloudfront.net/production/images/sales_agents/19129/data.original.?1583194255';
    this.status=obj.status;
    this.rank=0;
}


module.exports = Object;

