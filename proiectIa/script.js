renderFileComponents();
addEventForAddFunctions();

function addEventForAddFunctions() {
    let searchButton = document.getElementById("add_function");
    searchButton.addEventListener("click", function () {
        let dropdown = document.getElementById("addFunction");
        let selected = dropdown.options[dropdown.selectedIndex].value;
        let where = document.getElementById("functions");
        if (selected == "default") return;
        else if (selected == "f1") where.append(renderContainsTag());
        else if (selected == "f2") where.append(renderWordBeforeElement());
        else if (selected == "f3") where.append(renderWordAfterElement());
        else if (selected == "f4") where.append(renderHasDepth());
        else if (selected == "f5") where.append(renderNumberOfElements());
    
    });

}
function renderNumberOfElements(){

    let uniqueName=uuidv4();
    let divFunction=document.createElement("div");divFunction.setAttribute("id","function");
    let label = document.createElement("label");label.innerText="are un anumit nr de elemente";
    let input = document.createElement("input");input.setAttribute("type","checkbox");input.setAttribute("checked","checked");input.setAttribute("value","f5");input.setAttribute("name",uniqueName);
    label.appendChild(input);
    divFunction.appendChild(label);
    let input2 = document.createElement("input");input2.setAttribute("type","text");input2.setAttribute("placeholder","nr elemente");input2.setAttribute("name",uniqueName);
    let input3 = document.createElement("input");input3.setAttribute("type","text");input3.setAttribute("placeholder","nume element");input3.setAttribute("name",uniqueName);
    divFunction.appendChild(input2);
    divFunction.appendChild(input3);
    return divFunction;

}
function renderWordAfterElement(){
    let uniqueName=uuidv4();
    let divFunction=document.createElement("div");divFunction.setAttribute("id","function");
    let label = document.createElement("label");label.innerText="n elemente au o anumita valoarea ";
    let input = document.createElement("input");input.setAttribute("type","checkbox");input.setAttribute("checked","checked");input.setAttribute("value","f3");input.setAttribute("name",uniqueName);
    label.appendChild(input);
    divFunction.appendChild(label);
    let input2 = document.createElement("input");input2.setAttribute("type","text");input2.setAttribute("placeholder","nr elemente(n)");input2.setAttribute("name",uniqueName);
    let input3 = document.createElement("input");input3.setAttribute("type","text");input3.setAttribute("placeholder","nume element");input3.setAttribute("name",uniqueName);
    let input4 = document.createElement("input");input4.setAttribute("type","text");input4.setAttribute("placeholder","nume valoare");input4.setAttribute("name",uniqueName);
    divFunction.appendChild(input2);
    divFunction.appendChild(input3);
    divFunction.appendChild(input4);
    return divFunction;


}
function renderWordBeforeElement(){
    let uniqueName=uuidv4();
    let divFunction=document.createElement("div");divFunction.setAttribute("id","function");
    let label = document.createElement("label");label.innerText="fiecare element contine elementul";
    let input = document.createElement("input");input.setAttribute("type","checkbox");input.setAttribute("checked","checked");input.setAttribute("value","f2");input.setAttribute("name",uniqueName);
    label.appendChild(input);
    divFunction.appendChild(label);
    let input2 = document.createElement("input");input2.setAttribute("type","text");input2.setAttribute("placeholder","element");input2.setAttribute("name",uniqueName);
    let input3 = document.createElement("input");input3.setAttribute("type","text");input3.setAttribute("placeholder","element continut");input3.setAttribute("name",uniqueName);
    divFunction.appendChild(input2);
    divFunction.appendChild(input3);
    return divFunction;


}
function renderHasDepth(){
    let uniqueName=uuidv4();
    let divFunction=document.createElement("div");divFunction.setAttribute("id","function");
    let label = document.createElement("label");label.innerText="are adancimea >= decat un numar";
    let input = document.createElement("input");input.setAttribute("type","checkbox");input.setAttribute("checked","checked");input.setAttribute("value","f4");input.setAttribute("name",uniqueName);
    label.appendChild(input);
    divFunction.appendChild(label);
    let input2 = document.createElement("input");input2.setAttribute("type","text");input2.setAttribute("placeholder","valoarea adancimii");input2.setAttribute("id","somevalue");input2.setAttribute("name",uniqueName);
    divFunction.appendChild(input2);
    return divFunction;
}
function renderContainsTag() {
    /* 
     <div id="function">
                   <label class="container">contine  tagul urmator
                       <input type="checkbox" checked="checked">
                     </label>
                   <input id="function1_value" type="text" placeholder="numele tagului">
               </div>
               */
    let uniqueName=uuidv4();
    let divFunction=document.createElement("div");divFunction.setAttribute("id","function");
    let label = document.createElement("label");label.innerText="contine urmatorul tag";
    let input = document.createElement("input");input.setAttribute("type","checkbox");input.setAttribute("checked","checked");input.setAttribute("value","f1");input.setAttribute("name",uniqueName);
    label.appendChild(input);
    divFunction.appendChild(label);
    let input2 = document.createElement("input");input2.setAttribute("type","text");input2.setAttribute("placeholder","numele tagului");input2.setAttribute("id","somevalue");input2.setAttribute("name",uniqueName);
    divFunction.appendChild(input2);
    return divFunction;

}
document.getElementById("search").addEventListener("click",function(){
    let selectedFunctions = document.querySelectorAll('input:checked');
    let results=[];let wn=true;
    for(let i=0;i<selectedFunctions.length;i++){
    let name = selectedFunctions[i].name;
    let afunction =selectedFunctions[i].value;
    let valueInputs=document.querySelectorAll('input[type=text][name="'+name+'"]');
    
    if(afunction=="f1"){
        let lr=[];
        for(let i=0;i<ContainsTag(valueInputs[0].value).length;i++)
        lr.push(ContainsTag(valueInputs[0].value)[i]);
        if(wn){
        wn=false;
        results=lr;
        }else 
        results=_.intersection(lr,results);
    }
    else if(afunction=="f2"){
        let lr=[];
        //console.log(elementHasElement(valueInputs[0].value,valueInputs[1].value).length);
        for(let i=0;i<elementHasElement(valueInputs[0].value,valueInputs[1].value).length;i++)
        lr.push(elementHasElement(valueInputs[0].value,valueInputs[1].value)[i]);
        if(wn){
        wn=false;
        results=lr;
        }else 
        results=_.intersection(lr,results);
    }
    else if(afunction=="f3"){
        let lr=[];
        //console.log(wordBeforeElement(valueInputs[0].value,valueInputs[1].value).length);
        for(let i=0;i<nElemsHasValue(valueInputs[0].value,valueInputs[1].value,valueInputs[2].value).length;i++)
        lr.push(nElemsHasValue(valueInputs[0].value,valueInputs[1].value,valueInputs[2].value)[i]);
        if(wn){
        wn=false;
        results=lr;
        }else 
        results=_.intersection(lr,results);
    }  
    else if(afunction=="f4"){
        let lr=[];
        //console.log(HasDepth(valueInputs[0].value).length);
        for(let i=0;i<HasDepth(valueInputs[0].value).length;i++)
        lr.push(HasDepth(valueInputs[0].value)[i]);
        if(wn){
        wn=false;
        results=lr;
        }else 
        results=_.intersection(lr,results);
    }  else if(afunction=="f5"){
        let lr=[];
        //console.log(NumberOfElements(valueInputs[0].value,valueInputs[1].value).length);
        for(let i=0;i<NumberOfElements(valueInputs[0].value,valueInputs[1].value).length;i++)
        lr.push(NumberOfElements(valueInputs[0].value,valueInputs[1].value)[i]);
        if(wn){
        wn=false;
        results=lr;
        }else 
        results=_.intersection(lr,results);
    }
      
    
}
appendResults(results);    //console.log(selectedFunctions);

});


function waitForTextReadComplete(reader) {
    reader.onloadend = function (event) {
        var text = event.target.result;

        parseTextAsXml(text);
    }
}
document.getElementById("addImage").addEventListener('change', function () {
    if (this.files && this.files[0]) {
        let file = this.files[0];
        if (file.name.split('.')[1] == "xml") {
            fr = new FileReader();
            fr.onload = function () {

                window.localStorage.setItem(file.name + "(" + uuidv4() + ")", fr.result);
                renderFileComponents();
            };
            fr.readAsText(file);
            renderFileComponents();
        } else console.log("invalid format");

    }

});

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function renderFileComponents() {
    let where = document.getElementById("files");
    where.innerText = "";
    for (var i = 0; i < localStorage.length; i++) {

        let key = localStorage.key(i);
        if (key != "randid") {
            let name = key.split(".")[0] + "." + key.split(".")[1].split("(")[0];
            let para = document.createElement("div");
            let button = document.createElement("button");
            button.setAttribute("id", key);
            button.setAttribute("name", "deleteFile");
            button.innerText = "Delete this";
            para.innerText = name;
            para.setAttribute("id", key);
            para.appendChild(button);
            where.appendChild(para);
        }

    }
    buttonsEvent();
}

function buttonsEvent() {
    let buttons = document.getElementsByName("deleteFile");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
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

    if (isText) {
        return xml.nodeValue.trim();
    }

    if (!hasChildren && !hasAttributes) {
        return body;
    }
    if (!hasChildren && body.length) {
        data.text = body;
    }

    if (isElement && hasAttributes) {
        data.attributes = _.reduce(xml.attributes, function (obj, name, id) {
            var attr = xml.attributes.item(id);
            obj[attr.name] = attr.value;
            return obj;
        }, {});
    }

    _.each(xml.children, function (child) {
        var name = child.nodeName;

        if (!_.has(data, name)) {
            data[name] = parse(child);
            return;
        }

        if (!_.isArray(data[name])) {
            data[name] = [data[name]];
        }

        data[name].push(parse(child));
    });

    _.each(data.attributes, function (value, key) {
        if (data[key] != null) {
            return;
        }
        data[key] = value;
        delete data.attributes[key];
    });

    if (_.isEmpty(data.attributes)) {
        delete data.attributes;
    }
    return flatten(data);
}

function ContainsTag(i1) {
    let valueOfInput = i1;
    let results = [];
    for (var i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key != "randid") {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            let XML = new DOMParser().parseFromString(value, "text/xml");
            let obj = parse(XML);
            let d = XML.getElementsByTagName(valueOfInput);
            if (d.length > 0)
                results.push(key);
        }
        
    }
    return results;
}
function NumberOfElements(hm,elem){
    let valueOfInput = elem;
    let results = [];
    for (var i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key != "randid") {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            let XML = new DOMParser().parseFromString(value, "text/xml");
            let obj = parse(XML);
            let d = XML.getElementsByTagName(valueOfInput);
            
            if (d.length >= hm)
                results.push(key);
        }
        
    }
    return results;
}

function containsElement(elem1,elem2){
    
    for(let i=0;i<elem1.childNodes.length;i++)
    if(elem1.childNodes[i].childNodes[0])
    if(elem1.childNodes[i].childNodes[0].parentNode.tagName==elem2)return true;
    return false;

}
function docRespectEonE(d,el){
    
    //d este multimea elementelor cu numele book .
    //functia trebuie sa returneze true daca toate elementele contin el
    //ia valoarea nodului 
        //console.log(d[i].childNodes[1].childNodes[0]);
    
    for(let i=0;i<d.length;i++)
        if(!containsElement(d[i],el))return false;
        if(d.length==0)return false;
        return true;
    }
function elementHasElement(element,elementContinut){
    let valueOfInput = element;
    let results = [];
    for (var i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key != "randid") {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            let XML = new DOMParser().parseFromString(value, "text/xml");
            let obj = parse(XML);
            let d = XML.getElementsByTagName(valueOfInput);
            if (docRespectEonE(d,elementContinut))
                results.push(key);
        }
        
    }
    return results;

}
function nrElemHasVal(elems,val){
    let i=0;
    for(let j=0;j<elems.length;j++){
        //console.log(elems[j].childNodes[0].textContent);
        if(elems[j].childNodes[0].textContent==val){i++;
        }
    }
    return i;
}
function nElemsHasValue(nrElem,elem,val){
    let results = [];
    for (var i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key != "randid") {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            let XML = new DOMParser().parseFromString(value, "text/xml");
            let obj = parse(XML);
            let d = XML.getElementsByTagName(elem);
            //console.log(nrElemHasVal(d,val));
            if (nrElemHasVal(d,val)>=nrElem)
                results.push(key);
        }
        
    }
    return results;

}

function HasDepth(i1) {
    let valueOfInput = i1;
    let results = [];
    for (var i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key != "randid") {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            let XML = new DOMParser().parseFromString(value, "text/xml");
            let obj = parse(XML);
            if (height(XML) >= valueOfInput)
                results.push(key);
        }
        
    }
    return results;
}

function appendResults(results) {
    let where = document.getElementById("results");
    where.innerText = "";
    for (let i = 0; i < results.length; i++) {
        let name = results[i].split(".")[0] + "." + results[i].split(".")[1].split("(")[0];

        let para = document.createElement("div");
        para.innerText = name;
        para.setAttribute("id", results[i]);

        where.appendChild(para);
    }

}

function contains(dom, word) {
    return dom;
}


function height(el) {
    if (!el.children)
        return 0;
    var max = -1;
    for (var i = 0; i < el.children.length; i++) {
        var h = height(el.children[i]);
        if (h > max) {
            max = h;
        }
    }
    return max + 1;
}