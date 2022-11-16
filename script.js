'use strict';   //이것을 쓰면 문법에대해 엄격하게 확인함: 변수선언안하면 오류발생!

// 스크롤에 따른 메뉴바 색상처리
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height; //가져와사각형.높이
console.log(navbarHeight);  //108
document.addEventListener('scroll', () => {
    // console.log('이벤트가 발생되었음!');
    // console.log(window.scrollY);
    if(window.scrollY>navbarHeight){
        navbar.classList.add('navbar--bold');   //#navbar.navbar--bold 추가
        
    }else{
        navbar.classList.remove('navbar--bold');
    }
})

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});   //css분법 넣기
}

// 스크롤에 따른 메뉴바 고정-- 메뉴바에 내용이 많아서 e사용
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) =>{
    // console.log(e);
    const target = e.target;
    const link = target.dataset.link;
    // console.log(link);
    if(link == null){
        return;
    }
    scrollIntoView(link);
})


// 연락주세요 버튼 스크롤가기! -- 하나뿐일때는 바로!
const homeContactBtn = document.querySelector('.home__contact')
homeContactBtn.addEventListener('click', ()=>{
    scrollIntoView('#contact');
})

// 위로 화살표 안보이다보이게+ 스크롤 맨위로    
const arrowUpBtn= document.querySelector('.arrow-up');
arrowUpBtn.addEventListener('click', ()=>{
    scrollIntoView('#home')
});

const home =document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

const arrowup = document.querySelector('.arrow-up');
document.addEventListener('scroll',() =>{
    if(window.scrollY > homeHeight/2){
        arrowup.classList.add('visible')
    }else{
        arrowup.classList.remove('visible')
    }
    home.style.opacity = 1-window.scollY/homeHeight;
})


