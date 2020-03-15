const HEADER_NAV_MENU = document.getElementById('header-nav');
const SEND_BTN = document.getElementById('send-btn');
const CLOSE_MSG_BLOCK_BTN = document.getElementById('close-btn');

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
