//index.html
const dropdown = document.getElementById("myDropdown");

//Función para el dropdown de sign up
function dropdownFunction(event) {
    event.stopPropagation();
    dropdown.classList.toggle("show");
}

//Para cerrar el dropdown si el usuario clickea fuera del mismo:
window.onclick = (event) => {
    if (!event.target.closest(".dropdown") && dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
    }
};