const Object = {};

Object.Job = function(val) {
    this.type = val.type;
    this.company = val.company;
    this.company_url = val.company_url;
    this.location = val.location;
    this.title = val.title;
    this.description = val.description;
    this.company_logo = val.company_logo;
  
  }

module.exports = Object;
