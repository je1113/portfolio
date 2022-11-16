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
    scrollTo.scrollIntoView({ behavior: 'smooth' });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
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
    navbarMenu.classList.remove('open');
    scrollIntoView(link); 
    
    // 메뉴바 눌렀을때 테두리 표시 //내가짠 코드
    // const navActive = document.querySelector('.navbar__menu__item.active')
    // if(navActive == null){
    //     target.classList.add('active')
    //     return;
    // }
    // navActive.classList.remove('active')
    // target.classList.add('active')
})


//모바일 메뉴 버튼 설정
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', ()=>{
    navbarMenu.classList.toggle('open');
})

// 연락주세요 버튼 스크롤가기! -- 하나뿐일때는 바로!
const homeContactBtn = document.querySelector('.home__contact')
homeContactBtn.addEventListener('click', ()=>{
    scrollIntoView('#contact');
})

// 위로 화살표 안보이다보이게+ 스크롤 맨위로    
const home =document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

const arrowup = document.querySelector('.arrow-up');
document.addEventListener('scroll',() =>{
    if(window.scrollY > homeHeight/2){
        arrowup.classList.add('visible')
    }else{
        arrowup.classList.remove('visible')
    }
    home.style.opacity = 1 - window.scollY / homeHeight;
})


const arrowUp= document.querySelector('.arrow-up');
arrowUp.addEventListener('click', ()=>{
    scrollIntoView('#home')
});


/* 나의 연습코드
// work > project 버튼 누를때 보이게 하는것!?
const categoryBtn = document.querySelector('.work__categories');
const projectDetail = document.querySelectorAll('.project__description')
const project = document.querySelectorAll('.project')
console.log(projectDetail)
categoryBtn.addEventListener('click', (e) =>{
    const filter = e.target.dataset.filter;
    if(filter == null){
        return; 
    }
    if(filter == '*'){
        for(let i=0; i<project.length; i++){
                projectDetail[i].classList.add('visible')
        }
    }
    for(let i=0; i<project.length; i++){
        if(project[i].dataset.type == filter){
            projectDetail[i].classList.add('visible')
        }else{
            projectDetail[i].classList.remove('visible')
            project[i].classList.add('none')           
        }
    }
})

*/

const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click',(e) =>{
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }
    const active = document.querySelector('.category__btn.selected');
    if(active != null){
        active.classList.remove('selected')
    }
    e.target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(() =>{
        projects.forEach((project)=>{
            // console.log(project.dataset.type);
            if(filter === '*' || filter === project.dataset.type){
                project.classList.remove('invisible')
            }else{
                project.classList.add('invisible')
            }
        })
        projectContainer.classList.remove('anim-out')
    },300)

})

//navbar위치대로 
const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact'
];

const sections =sectionIds.map((id) => document.querySelector(id));
// console.log(sections);
const navItems = sectionIds.map((id) => document.querySelector(`[data-link="${id}"]`));
// console.log(navItems);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
}

const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            console.log('y');
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // console.log(index);
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index + 1;
            }else{
                selectedNavIndex = index - 1;
            }
            console.log(selectedNavIndex);
        }
    });
}
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
    if(window.scrollY === 0) {
        selectedNavIndex = 0;
    }else if(
        window.scrollY + window.innerHeight === document.body.clientHeight
    ) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});
