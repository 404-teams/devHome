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

module.exports = Object;