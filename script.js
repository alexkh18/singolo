const HEADER_NAV_MENU = document.getElementById('header-nav');


let resetForm = (formId) => document.getElementById(formId).reset();
let validateInputFiled = function (inputId, validationRegex) {
  const isFocus = 0;
  const isError = 0;
  const inputValue = document.getElementById(inputId).value.toString().trim()

  // if(!inputValue.checkValidity()){
  //   document.getElementById(inputId).focus();
  //   document.getElementById(inputId).innerHTML = "WRONG!";
  // }

  if(inputValue === '') {
    // document.getElementById(inputId).html('This is a required field.');
    document.getElementById(inputId).focus();
  } else if(!validationRegex.test(email)) {
    // document.getElementById(inputId).html('Invalid email address.');
    document.getElementById(inputId).focus();
  }
}

HEADER_NAV_MENU.addEventListener('click', (event) => {
  HEADER_NAV_MENU.querySelectorAll('.header-nav__link').forEach(elem => elem.classList.remove('active'));
  event.target.classList.add('active');
})

const SEND_BTN = document.getElementById('send-btn');
const CLOSE_MSG_BLOCK_BTN = document.getElementById('close-btn');

function openPopUpMessageForSendBtn() {
  SEND_BTN.addEventListener('click', (event) => {
    const subjectTxt = document.getElementById('subject').value.toString();
    const descriptionTxt = document.getElementById('description').value.toString();

    let setMsgText = (elemId, text) => document.getElementById(elemId).innerText = text;


    // validateInputFiled('userName', `[A-Za-z]{1}[A-Za-z' -\.]{0,30}`);
    if(subjectTxt) {
      setMsgText('message-subject', `Subject: ${subjectTxt}`);
    }
    if(descriptionTxt) {
      setMsgText('message-description', `Description: ${descriptionTxt}`);
    }
    document.getElementById('message-block').classList.remove('hidden');
    event.preventDefault();
  })

  CLOSE_MSG_BLOCK_BTN.addEventListener('click', () => {
    document.getElementById('message-block').classList.add('hidden');
    resetForm('form')
  })
}

const SLIDER_CONTROL_PREV = document.querySelector('.left-arrow');
const SLIDER_CONTROL_NEXT = document.querySelector('.right-arrow');

function slideSliderSectionContent(sliderControl) {
  sliderControl.addEventListener('click', () => {
    let sliderCounter = 0;
    const currLeftValue = document.querySelectorAll('.slider__item')[0].style.left.replace(/[^\d-]/g, '');
    const setSlideBackground = (backgroundColorStyle, borderBottomStyle) => {
      document.querySelector('.slider-section').style.backgroundColor = backgroundColorStyle;
      document.querySelector('.slider-section').style.borderBottom = borderBottomStyle;
    };

    if (currLeftValue === '' || currLeftValue === '0') {
      const slide = setInterval(() => {
        document.querySelectorAll('.slider__item').forEach(sliderItem => {
          sliderCounter -= 1;
          sliderItem.style.left = `${sliderCounter}%`;
          if (sliderItem.style.left === '-100%') {
            /*
            current if() work only for one of sliderItem because it stops func and
            other sliderItem will not have requiring value, so forEach() below this comment
            resolve this problem and set requiring value for all sliderItem
            */
            document.querySelectorAll('.slider__item').forEach(sliderItem => {
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
        document.querySelectorAll('.slider__item').forEach(sliderItem => {
          sliderCounter += 1;
          sliderItem.style.left = `${sliderCounter}%`;
          if (sliderItem.style.left === '0%') {
            document.querySelectorAll('.slider__item').forEach(sliderItem => {
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

slideSliderSectionContent(SLIDER_CONTROL_PREV);
slideSliderSectionContent(SLIDER_CONTROL_NEXT);
switchPhoneScreenState(VERTICAL_PHONE_BTN);
switchPhoneScreenState(HORIZONTAL_PHONE_BTN);
