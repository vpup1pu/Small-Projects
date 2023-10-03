const container = document.querySelector('#container');

const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'This is the glorious text-content!';

container.appendChild(content);

const para1 = document.createElement('p');
para1.textContent = "Hey I'm red!";
para1.setAttribute('style', 'color: red');
container.appendChild(para1);

const head3 = document.createElement('h3');
head3.textContent = "Hey I'm blue!";
head3.setAttribute('style', 'color: blue');
container.appendChild(head3);

const box = document.createElement('div');
const head1 = document.createElement('h1');
head1.textContent = "I'm in a div";
const para2 = document.createElement('p');
para2.textContent = "ME TOO!";
box.appendChild(head1);
box.appendChild(para2);
box.classList.toggle('box');
box.setAttribute('style', 'background-color: pink; border: 5px solid black');
container.appendChild(box);

