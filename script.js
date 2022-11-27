const section = document.querySelector('#section-1');
const card = document.querySelector('#card-popup');
const closebtn = document.querySelector('#close-popup');
let flag = false;


const cardPop = ()=>{
  const topOfSection = section.offsetTop;
  console.log(topOfSection);
  if (window.scrollY >= topOfSection && !flag) {
    card.style.display = "block";
    flag = true;
  }

  closebtn.addEventListener('click', (e) =>{
    card.style.display = "none";
  });
}

window.addEventListener('scroll', cardPop);