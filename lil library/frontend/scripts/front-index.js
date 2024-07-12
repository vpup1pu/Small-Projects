//index.html
const PORT = 3000;
const SERVER_URL = `http://localhost:${PORT}`;

//FRONT DEL DROPDOWN
const dropdown = document.getElementById('myDropdown');

//Función para el dropdown de sign up
function dropdownFunction(event) {
    event.stopPropagation();
    dropdown.classList.toggle('show');
}

//Para cerrar el dropdown si el usuario clickea fuera del mismo:
window.onclick = (event) => {
    if (!event.target.closest('.dropdown') && dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
    }
};

//MANEJO DEL LOGIN
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event)=>{
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    }

    try{
        const res = await fetch(`${SERVER_URL}/auth/login`, options)
        if (!res.ok){
            throw new Error('Error al iniciar sesión');
        }
        const data = await res.json();
        localStorage.setItem('token', data.token);
        window.location.href = 'user-library.html';
    } catch (error) {
        console.error('Error: ', error);
        const loginError = document.getElementById('loginError');
        loginError.style.display = 'block';
    }
});

//MANEJO DEL SIGN UP
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async (event)=>{
    event.preventDefault();
    const username = document.getElementById('sUsername').value;
    const password = document.getElementById('sPassword').value;
    const email = document.getElementById('sEmail').value;
    const signUpSpan = document.getElementById('signUpSpan');

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
    };

    try{
        const res = await fetch(`${SERVER_URL}/auth/register`, options)
        if (!res.ok){
            throw new Error('Error al registrarse');
        }
        await res.json();
        signUpSpan.style.display = 'block';
        signUpSpan.innerHTML = 'Your account has been succesfully created';
        signUpSpan.style.color = '#465E46';
        signUpSpan.style.border = '2px solid #465E46';
        signUpSpan.style.backgroundColor = 'rgba(70, 94, 70, 0.3)';
    } catch (error){
        console.error('Error: ', error);
        signUpSpan.style.display = 'block';
        signUpSpan.innerHTML = 'Something went wrong, try again';
    }
});