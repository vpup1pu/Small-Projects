const unorderL = document.querySelector("ul");
const box = document.querySelector("input");
const btn = document.querySelector("button");

btn.addEventListener('click', () =>{
    const item = box.value;
    box.value = '';

    const list = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    
    list.appendChild(span);
    span.textContent = item;
    list.appendChild(deleteBtn);
    deleteBtn.textContent = "Delete";
    unorderL.appendChild(list);

    deleteBtn.addEventListener('click', ()=>{
        unorderL.removeChild(list);
    })

    box.focus();
})