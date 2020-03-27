const HEADER_NAV_MENU = document.getElementById('header-nav');
const HEADER_NAV_MENU_ANCHORS = document.querySelectorAll('.header-nav a[href*="#"]');

function removeActiveClassFromAllHeaderNavLinks() {
  HEADER_NAV_MENU.querySelectorAll('.nav-link').forEach(elem => elem.classList.remove('active'));
}

function activateHeaderNavLinkOnClick() {
  HEADER_NAV_MENU.addEventListener('click', (event) => {
    removeActiveClassFromAllHeaderNavLinks();
    event.target.classList.add('active');
  });
}

function activateCurrHeaderNavLinkOnScroll() {
  const sectionOffsetYPosition = new Map();
  document.querySelectorAll('main > section').forEach( elem => {
    sectionOffsetYPosition.set(elem.id, elem.offsetTop);
  });

  document.querySelector('a[href="#home"]').classList.add('active');
  window.addEventListener('scroll', () => {
    removeActiveClassFromAllHeaderNavLinks();
    document.querySelector('a[href="#home"]').classList.add('active');
    if (window.pageYOffset >= sectionOffsetYPosition.get('our-services-section')) {
      removeActiveClassFromAllHeaderNavLinks();
      document.querySelector('a[href="#our-services-section"]').classList.add('active');
    }
    if (window.pageYOffset >= sectionOffsetYPosition.get('portfolio-section')) {
      removeActiveClassFromAllHeaderNavLinks();
      document.querySelector('a[href="#portfolio-section"]').classList.add('active');
    }
    if (window.pageYOffset >= sectionOffsetYPosition.get('about-us-section')) {
      removeActiveClassFromAllHeaderNavLinks();
      document.querySelector('a[href="#about-us-section"]').classList.add('active');
    }
    if (window.pageYOffset === document.body.offsetHeight - window.innerHeight) {
      removeActiveClassFromAllHeaderNavLinks();
      document.querySelector('a[href="#quote-section"]').classList.add('active');
    }
  });
}

function animatedScrollingForAnchorsNavigation() {
  HEADER_NAV_MENU_ANCHORS.forEach(el => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      const sectionId = el.getAttribute('href').substr(1);
      document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

const SEND_BTN = document.getElementById('send-btn');
const CLOSE_MSG_BLOCK_BTN = document.getElementById('close-btn');
const NAME_INPUT_FIELD = document.getElementById('userName');
const EMAIL_INPUT_FIELD = document.getElementById('email');

const getFieldValue = (elemId) => document.getElementById(elemId).value;
const setTextValue = (elemId, text) => document.getElementById(elemId).innerText = text;
const resetForm = (formId) => document.getElementById(formId).reset();
const namePattern = /^[a-zA-Z]{2,}[A-Za-z' -\.]{0,30}$/;
const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const nameInputErrMsg = 'Invalid name: The field should contain minimum two letters';
const emailInputErrMsg = 'Invalid email address: Enter an email address in the correct format, like name@example.com';

function validateField(field, pattern, errorMsg) {
  const fieldValue = field.value;

  if (pattern.test(fieldValue) === false) {
    field.setCustomValidity(errorMsg);
    return false;
  }
  field.setCustomValidity('');
  return true;
}

function validateFieldAfterChanging(field, pattern, errorMsg) {
  field.addEventListener('input', () => validateField(field, pattern, errorMsg));
}

function openTheLetterWasSentPopUp() {
  SEND_BTN.addEventListener('click', (event) => {
    if (validateField(NAME_INPUT_FIELD, namePattern, nameInputErrMsg) === false) {
      return;
    }
    if (validateField(EMAIL_INPUT_FIELD, emailPattern, emailInputErrMsg) === false) {
      return;
    }
    if (getFieldValue('subject')) {
      setTextValue('message-subject', `Subject: ${getFieldValue('subject')}`);
    } else {
      setTextValue('message-subject', 'Without Subject');
    }
    if (getFieldValue('description')) {
      setTextValue('message-description', `Description: ${getFieldValue('description')}`);
    } else {
      setTextValue('message-description', 'Without Description');
    }

    event.preventDefault();
    document.getElementById('message-block').classList.remove('hidden');
  });
}

function closeTheLetterWasSentPopUp() {
  CLOSE_MSG_BLOCK_BTN.addEventListener('click', () => {
    document.getElementById('message-block').classList.add('hidden');
    resetForm('form');
  });
}

const SLIDER_CONTROL_PREV = document.querySelector('.left-arrow');
const SLIDER_CONTROL_NEXT = document.querySelector('.right-arrow');

function slideSliderSectionContent(sliderControl) {
  sliderControl.addEventListener('click', () => {
    let sliderCounter = 0;
    const currLeftValue = document.querySelectorAll('.slider-list__item')[0].style.left.replace(/[^\d-]/g, '');
    const setSliderSectionBackground = (backgroundColorStyle, borderBottomStyle) => {
      document.querySelector('.slider-section').style.backgroundColor = backgroundColorStyle;
      document.querySelector('.slider-section').style.borderBottom = borderBottomStyle;
    };

    if (currLeftValue === '' || currLeftValue === '0') {
      const slide = setInterval(() => {
        document.querySelectorAll('.slider-list__item').forEach(sliderItem => {
          sliderCounter -= 1;
          sliderItem.style.left = `${sliderCounter}%`;
          if (sliderItem.style.left === '-100%') {
            /*
            current if() work only for one of sliderItem because it stops func and
            other sliderItem will not have requiring value, so forEach() below this comment
            resolve this problem and set requiring value for all sliderItem
            */
            document.querySelectorAll('.slider-list__item').forEach(sliderItem => {
              sliderItem.style.left = `${sliderCounter}%`;
            });
            clearInterval(slide);
            setSliderSectionBackground('#648BF0', '6px solid #5170C1');
            return;
          }
        });
      }, 5);
    } else {
      sliderCounter = +currLeftValue;

      const slide = setInterval(() => {
        document.querySelectorAll('.slider-list__item').forEach(sliderItem => {
          sliderCounter += 1;
          sliderItem.style.left = `${sliderCounter}%`;
          if (sliderItem.style.left === '0%') {
            document.querySelectorAll('.slider-list__item').forEach(sliderItem => {
              sliderItem.style.left = `${sliderCounter}%`;
            });
            clearInterval(slide);
            setSliderSectionBackground('#f06c64', '6px solid #ea676b');
            return;
          }
        });
      }, 5);
    }
  });
}

const VERTICAL_PHONE_BTN = document.querySelector('.phone-vertical-btn');
const HORIZONTAL_PHONE_BTN = document.querySelector('.phone-horizontal-btn');

function switchPhoneScreenState(slidePhoneImg) {
  const currPhoneImgScreen = slidePhoneImg.previousElementSibling;

  slidePhoneImg.addEventListener('click', () => {
    const currScreenState = currPhoneImgScreen.style.display;
    (currScreenState === 'none') ? currPhoneImgScreen.style.display = 'unset' : currPhoneImgScreen.style.display = 'none';
  });
}

const PORTFOLIO_TABS_MENU = document.querySelector('.portfolio-nav');
const PORTFOLIO_MENU_ALL_TAB_LINK = document.querySelector('.portfolio-nav :nth-child(1) > a');
const PORTFOLIO_MENU_WEB_DESIGN_TAB_LINK = document.querySelector('.portfolio-nav :nth-child(2) > a');
const PORTFOLIO_MENU_GRAPHIC_DESIGN_TAB_LINK = document.querySelector('.portfolio-nav :nth-child(3) > a');
const PORTFOLIO_MENU_WEB_ARTWORK_TAB_LINK = document.querySelector('.portfolio-nav :nth-child(4) > a');
const PORTFOLIO_GALLERY_ITEMS = document.querySelectorAll('.gallery__item > img');
const PORTFOLIO_GALLERY = document.querySelector('.portfolio__gallery');

function switchPortfolioTabs() {
  PORTFOLIO_TABS_MENU.addEventListener('click', (event) => {
    PORTFOLIO_TABS_MENU.querySelectorAll('.portfolio-nav__link').forEach(elem => elem.classList.remove('active'));
    event.target.classList.add('active');
  });
}

function switchPortfolioTabContent(portfolioMenuTabLink) {
  portfolioMenuTabLink.addEventListener('click', () => {
    // if tab already active, there is not get any change for tab content
    if (portfolioMenuTabLink.classList.contains('active')) {
      return;
    }
    // remove border from gallery item when changing tab
    PORTFOLIO_GALLERY_ITEMS.forEach(elem => {
      if (elem.classList.contains('active')) {
        elem.classList.remove('active');
      }
    });
    document.querySelectorAll('.gallery__item').forEach((el, i, arrOfItems) => {
      if (arrOfItems[0].style.order === '1') {
        el.style.order = 12 - i;
      } else {
        el.style.order = i + 1;
      }
    });
  });
}

function addBorderForPortfolioImg() {
  PORTFOLIO_GALLERY.addEventListener('click', (event) => {
    PORTFOLIO_GALLERY_ITEMS.forEach(elem => {
      elem.classList.remove('active');
      event.target.classList.add('active');
    });
  });
}

activateHeaderNavLinkOnClick();
activateCurrHeaderNavLinkOnScroll();
animatedScrollingForAnchorsNavigation();
slideSliderSectionContent(SLIDER_CONTROL_PREV);
slideSliderSectionContent(SLIDER_CONTROL_NEXT);
switchPhoneScreenState(VERTICAL_PHONE_BTN);
switchPhoneScreenState(HORIZONTAL_PHONE_BTN);
openTheLetterWasSentPopUp();
closeTheLetterWasSentPopUp();
validateFieldAfterChanging(EMAIL_INPUT_FIELD, emailPattern, emailInputErrMsg);
validateFieldAfterChanging(NAME_INPUT_FIELD, namePattern, nameInputErrMsg);
switchPortfolioTabs();
switchPortfolioTabContent(PORTFOLIO_MENU_ALL_TAB_LINK);
switchPortfolioTabContent(PORTFOLIO_MENU_WEB_DESIGN_TAB_LINK);
switchPortfolioTabContent(PORTFOLIO_MENU_GRAPHIC_DESIGN_TAB_LINK);
switchPortfolioTabContent(PORTFOLIO_MENU_WEB_ARTWORK_TAB_LINK);
addBorderForPortfolioImg();
