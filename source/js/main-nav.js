//Мобильное меню
const navMain = document.querySelector(".main-nav");
const navToggle = document.querySelector(".main-nav__toggle");

navMain.classList.remove("main-nav--nojs");

navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});

const scrollSectionVideo = document.querySelector('.video');
const scrollSectionVideoHeight = scrollSectionVideo.offsetHeight;
console.log('высота блока видео:' + scrollSectionVideoHeight)
const scrollVideo = document.querySelector('.video__file');
const scrollVideoTop = scrollVideo.getBoundingClientRect().top;
const scrollSectionForm = document.querySelector('.form');
const scrollSectionVideoTop = scrollSectionVideo.getBoundingClientRect().top;
const scrollSectionVideoFromBegin = scrollSectionVideoTop + pageYOffset;
console.log('видео относительно документа' + scrollSectionVideoFromBegin)
const scrollSectionVideoBottom = scrollSectionVideo.getBoundingClientRect().bottom;
console.log('нижняя раница блока видео:' + scrollSectionVideoBottom)
console.log('верхняя раница блока видео:' + scrollSectionVideoTop)
const scrollSectionFormTop = scrollSectionForm.getBoundingClientRect().top;
const scrollProductForm = document.querySelector('.product');
const pageBody = document.querySelector('.page-body');
const headerStatic = pageBody.querySelector('.page-header');
const siteItem = pageBody.querySelectorAll('.site-list__item');
const siteLink = pageBody.querySelectorAll('.site-list__link');
const headerLogo = pageBody.querySelector('.page-header__logo-img');
const runningTextRight = document.querySelector('.infinite-text-right');
const runningTextLeft = document.querySelector('.infinite-text-left');
const runStart = 4;
const runningTextPoint = scrollSectionVideoHeight / runStart;
  console.log('Точка запуска бегущей строки:' + runningTextPoint);

const flyingVideo = document.querySelector('.video__file-container');
const flyingProduct = document.querySelector('.product__img-wrapper');

//Бегущая строка при скролле


const activateRunText = () => {
  runningTextRight.classList.add('infinite-text-right--active');
  runningTextLeft.classList.add('infinite-text-left--active');
};


//Вылетающее видео

const activateFlyingDownVideo = () => {
  flyingVideo.classList.add('video__file-container--active-down');
};

const activateFlyingTopVideo = () => {
  flyingVideo.classList.add('video__file-container--active-top');
};

//Вылетающий вел

const activateFlyingDownProduct = () => {
  flyingProduct.classList.add('product__img-wrapper--active-down');
};

const activateFlyingTopProduct = () => {
  flyingProduct.classList.add('product__img-wrapper--active-top');
};


//Активация меняющего цвет липкого хедера
const activateStickyHeader = () => {
  headerStatic.classList.remove('page-header');
  headerStatic.classList.add('page-header--sticky');
}

const getWhiteStickyHeader = () => {
  siteItem.forEach((el)=> {
    el.classList.remove('site-list__item');
    el.classList.add('site-list__item--sticky');
  })

  siteLink.forEach((el)=> {
    el.classList.remove('site-list__link');
    el.classList.add('site-list__link--sticky');
  })

  headerLogo.classList.add('page-header__logo-img--sticky');
};

const removeWhiteStickyHeader = () => {
  siteItem.forEach((el)=> {
    el.classList.remove('site-list__item--sticky');
    el.classList.add('site-list__item');
  })

  siteLink.forEach((el)=> {
    el.classList.remove('site-list__link--sticky');
    el.classList.add('site-list__link');
  })

  headerLogo.classList.remove('page-header__logo-img--sticky');
};

//Запуск видео

const activateVideo = () => {
  window.addEventListener('scroll', function() { 
    if (pageYOffset > scrollSectionVideoTop) {
      scrollVideo.classList.remove('video__file');
      scrollVideo.classList.add('video__file--active')
    }
  })
};

//Фулскрин 
const activateFullVideoSection = () => {
  window.addEventListener('scroll', function() { 
    if (pageYOffset > scrollSectionVideoTop) {
      scrollSectionVideo.classList.add('video__fixed');
    }
  })
};

const deactivateFullVideoSection = () => {
  window.addEventListener('scroll', function() { 
    if (scrol = scrollSectionFormTop) {
      scrollSectionVideo.classList.remove('video__fixed');
    }
  })
};

const activateStickyHeaderOnScroll = () => {

  window.addEventListener('scroll', function() { 
    if (pageYOffset > scrollSectionVideoTop && pageYOffset < scrollSectionFormTop) {
      activateStickyHeader();
      getWhiteStickyHeader();
      
    } else {
      removeWhiteStickyHeader();
    } if (pageYOffset > 100) {
      console.log("Hello 100");
      activateRunText();
      activateFlyingDownVideo();
    }
      if (pageYOffset > 700) {
      console.log("Hello 600");
      activateFlyingTopVideo();
      activateFlyingDownProduct();
    }
      if (pageYOffset > 1000) {
      console.log("Hello 800");
      activateFlyingTopProduct();
    }
  })
};
activateStickyHeaderOnScroll();


//Валидация формы

const form = document.querySelector('.form__content')
const validateBtn = form.querySelector('.form__button-submit')
const inputName = form.querySelector('.form__input--name')
const inputTel = form.querySelector('.form__input--tel')
const fields = form.querySelectorAll('.form__input')
const message = form.querySelector('.message')


const removeValidation = function () {
  const errors = form.querySelectorAll('.error')

  for (let i = 0; i < errors.length; i++) {
    errors[i].remove()
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault()

  removeValidation();

  for (var i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      console.log('field is blank', fields[i])
      var error = document.createElement('p')
      error.className='error'
      error.style.color = '#FC0000'
      error.innerHTML = 'Поле обязательно для заполнения'
      form[i].parentElement.insertBefore(error, fields[i])
    }
  }
})

