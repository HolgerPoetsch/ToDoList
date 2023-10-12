const inputBox = document.getElementById("input-box"); 
const listContainer = document.getElementById("list-container"); 
function addTask(){
        let li = document.createElement("li"); 
        listContainer.appendChild(li);
        let p = document.createElement("p")
        p.innerHTML= inputBox.value; 
        li.appendChild(p)
        let span1 = document.createElement("span");
        span1.classList.add("editSpan") 
        span1.innerHTML = "&#128393"; 
        li.appendChild(span1); 
        let span = document.createElement("span"); 
        span.innerHTML = "\u00d7"; 
        li.appendChild(span); 
    
    inputBox.value = ""; 
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked"); 
        saveData();
        
    } else if (e.target.classList[0] === "editSpan") {
        if (!e.target.classList.value.includes("saveSpan")) {
          let currentTask = e.target.previousSibling.innerText;
          e.target.previousSibling.remove();
          e.target.parentElement.insertAdjacentHTML("afterbegin", `<input type="text" id="input-box" placeholder="${currentTask}">`)
          e.target.innerHTML = "&#128427"
          e.target.classList.add("saveSpan")
      } else {
        let editedTask = e.target.previousSibling.value;
        e.target.previousSibling.remove();
        e.target.parentElement.insertAdjacentHTML("afterbegin", `<p>${editedTask}</p>`)
        e.target.innerHTML = "&#128393";
        e.target.classList.remove("saveSpan")
        saveData();

      }
    } else if(e.target.tagName === "SPAN"){
            e.target.parentElement.remove(); 
            saveData();
    }
}, false); 

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML); 
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data"); 
}

showTask(); 