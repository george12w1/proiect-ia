renderFileComponents();
function waitForTextReadComplete(reader) {
    reader.onloadend = function(event) {
        var text = event.target.result;

        parseTextAsXml(text);
    }
}
document.getElementById("addImage").addEventListener('change', function () {
    if (this.files && this.files[0]) {
        let file = this.files[0];
        if(file.name.split('.')[1]=="xml"){
        fr = new FileReader();
        fr.onload = function(){ 
          renderFileComponents();
          window.localStorage.setItem(file.name+"("+uuidv4()+")", fr.result);};
        fr.readAsText(file);
        renderFileComponents();
        }else console.log("invalid format");

    }

});

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
function renderFileComponents() {
    let where = document.getElementById("files");
    where.innerText="";
    for (var i = 0; i < localStorage.length; i++) {
        
        let key = localStorage.key(i);
        if(key!="randid"){
        let name = key.split(".")[0]  +"."+key.split(".")[1].split("(")[0]; 
        let para = document.createElement("div");
        let button=document.createElement("button");
        button.setAttribute("id",key);
        button.setAttribute("name","deleteFile");
        button.innerText="Delete this";
        para.innerText=name;
        para.setAttribute("id",key);
        para.appendChild(button);
        where.appendChild(para);
        }
      
      }
      buttonsEvent();
}
function buttonsEvent(){
    let buttons = document.getElementsByName("deleteFile");
      for(let i=0;i<buttons.length;i++){
          buttons[i].addEventListener("click",function(){
              window.localStorage.removeItem(buttons[i].id);
              renderFileComponents();
          });
      }
}
function flatten(object) {
    var check = _.isPlainObject(object) && _.size(object) === 1;
    return check ? flatten(_.values(object)[0]) : object;
  }
function parse(xml) {
    var data = {};
  
    var isText = xml.nodeType === 3,
        isElement = xml.nodeType === 1,
        body = xml.textContent && xml.textContent.trim(),
        hasChildren = xml.children && xml.children.length,
        hasAttributes = xml.attributes && xml.attributes.length;

    if (isText) { return xml.nodeValue.trim(); }

    if (!hasChildren && !hasAttributes) { return body; }
    if (!hasChildren && body.length) { data.text = body; }
  
    if (isElement && hasAttributes) {
      data.attributes = _.reduce(xml.attributes, function(obj, name, id) {
        var attr = xml.attributes.item(id);
        obj[attr.name] = attr.value;
        return obj;
      }, {});
    }

    _.each(xml.children, function(child) {
      var name = child.nodeName;
  
      if (!_.has(data, name)) {
        data[name] = parse(child);
        return;
      }

      if (!_.isArray(data[name])) { data[name] = [data[name]]; }
  
      data[name].push(parse(child));
    });

    _.each(data.attributes, function(value, key) {
      if (data[key] != null) { return; }
      data[key] = value;
      delete data.attributes[key];
    });

    if (_.isEmpty(data.attributes)) { delete data.attributes; }
    return flatten(data);
  }

  function search(){
    let valueOfInput = document.getElementById("function1_value").value;
    //console.log(value);
    let results=[];
    for (var i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if(key!="randid"){
        let key=localStorage.key(i);
        let value=localStorage.getItem(key);
        let XML = new DOMParser().parseFromString(value, "text/xml");
        let obj = parse(XML);
        //search by tag name 
        let d = XML.getElementsByTagName(valueOfInput);
        if(d.length>0)
        results.push(key);
    }
    appendResults(results);
    }
}
function appendResults(results){
    let where = document.getElementById("results");
    where.innerText="";
    for(let i=0;i<results.length;i++){
    let name = results[i].split(".")[0] +"."+results[i].split(".")[1].split("(")[0]; 
    
    let para = document.createElement("div");
    para.innerText=name;
    para.setAttribute("id",results[i]);
  
    where.appendChild(para);
    }

}