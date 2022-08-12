document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelector('.menu-block')
    .addEventListener('click', function menu(e) {
      if (e.target.closest('.menu-block')) {
        document.querySelector('.menu-btn').classList.toggle('menu-btn_active');
        document.querySelector('.menu-nav').classList.toggle('menu-nav_active');
      }
      if (e.target.closest('.menu-btn')) {
        e.preventDefault();
      }
    });
  document.addEventListener('keyup', function (event) {
    if (event.code === 'Escape') {
      document.querySelector('.menu-btn').classList.remove('menu-btn_active');
      document.querySelector('.menu-nav').classList.remove('menu-nav_active');
    }
  });

  const textAnimated = document.querySelector('.animated-intro');
  textAnimated.innerHTML = '';
  const text = `I'm 40. At the moment I live in Bendery, Moldova. I love travelling and try not to miss the opportunity to see
something new.`;
  const text_ru = `Мне 40. На данный момент я живу в Бендерах, Молдова. Люблю путешествовать и стараюсь не упускать возможности увидеть что-то новое.`;
  let textList = [...text];
  let limit = textList.length;
  let switchLang = false;
  const forward = async () => {
    for (let i = 0; i < limit; i++) {
      if (switchLang) {
        textAnimated.innerHTML = '';
        switchLang = false;
        break;
      }
      const symbol = textList[i];
      textAnimated.innerHTML += textList[i];
      await new Promise((resolve, reject) => setTimeout(resolve, 100));
    }
  };
  const revert = async () => {
    while (textAnimated.innerHTML.length > 0) {
      if (switchLang) {
        textAnimated.innerHTML = '';
        switchLang = false;
        break;
      }
      textAnimated.innerHTML = textAnimated.innerHTML.slice(0, -1);
      await new Promise((resolve, reject) => setTimeout(resolve, 100));
    }
  };
  document.querySelector('.lang').addEventListener('click', (e) => {
    e.preventDefault();
    switchLang = true;
    if (e.target.closest('.en')) {
      textList = [...text];
      limit = textList.length;
    }
    if (e.target.closest('.ru')) {
      textList = [...text_ru];
      limit = textList.length;
    }
  });

  (async () => {
    while (true) {
      await forward();
      await revert();
    }
  })();

  const animItems = document.querySelectorAll('._anim-items');

  if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 15;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if (
          scrollY > animItemOffset - animItemPoint &&
          scrollY < animItemOffset + animItemHeight
        ) {
          animItem.classList.add('_active');
        }
      }
    }
    function offset(el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.scrollX || document.documentElement.scrollLeft,
        scrollTop = window.scrollY || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    setTimeout(() => {
      animOnScroll();
    }, 300);
  }

  const issueItems = document.querySelectorAll('.issue');
  const caseItems = document.querySelectorAll('.case');

  function growthTimeLine() {
    for (let index = issueItems.length; index >= 0; index--) {
      const issueItem = issueItems[index];
      const caseItem = caseItems[index];

      if (
        issueItem == document.querySelector('._selected') &&
        index !== issueItems.length - 1
      ) {
        issueItem.classList.remove('_selected');
        issueItems[index + 1].classList.add('_selected');
        caseItems.forEach((item) => {
          item.classList.remove(
            '_slideInLeft',
            '_slideInRight',
            '_slideOutLeft',
            '_slideOutRight'
          );
        });
        caseItem.classList.add('_slideOutRight');
        caseItems[index + 1].classList.add('_slideInLeft');
        setTimeout(() => {
          caseItem.classList.remove('_selected');
          caseItems[index + 1].classList.add('_selected');
        }, 500);
      }
    }
  }

  function declineTimeLine() {
    for (let index = 0; index < issueItems.length; index++) {
      const issueItem = issueItems[index];
      const caseItem = caseItems[index];

      if (issueItem == document.querySelector('._selected') && index !== 0) {
        issueItem.classList.remove('_selected');
        issueItems[index - 1].classList.add('_selected');
        caseItems.forEach((item) => {
          item.classList.remove(
            '_slideInLeft',
            '_slideInRight',
            '_slideOutLeft',
            '_slideOutRight'
          );
        });
        caseItem.classList.add('_slideOutLeft');
        caseItems[index - 1].classList.add('_slideInRight');
        setTimeout(() => {
          caseItem.classList.remove('_selected');
          caseItems[index - 1].classList.add('_selected');
        }, 500);
      }
    }
  }

  function finiteElements() {
    if (issueItems[0] == document.querySelector('._selected')) {
      document.querySelector('.prev-issue').classList.add('_selected');
      document.querySelector('.next-issue').classList.remove('_selected');
    } else if (
      issueItems[issueItems.length - 1] == document.querySelector('._selected')
    ) {
      document.querySelector('.next-issue').classList.add('_selected');
      document.querySelector('.prev-issue').classList.remove('_selected');
    } else {
      document.querySelector('.next-issue').classList.remove('_selected');
      document.querySelector('.prev-issue').classList.remove('_selected');
    }
  }

  document
    .querySelector('.timeline')
    .addEventListener('click', function menu(elem) {
      if (elem.target.closest('.issue')) {
        let indexNewTarget = [...issueItems].indexOf(elem.target);
        let indexOldTarget = [...issueItems].indexOf(
          document.querySelector('._selected')
        );
        document.querySelector('._selected').classList.remove('_selected');
        elem.target.classList.add('_selected');
        caseItems.forEach((item) => {
          item.classList.remove(
            '_slideInLeft',
            '_slideInRight',
            '_slideOutLeft',
            '_slideOutRight'
          );
        });
        if (indexNewTarget > indexOldTarget) {
          caseItems[indexOldTarget].classList.add('_slideOutRight');
          caseItems[indexNewTarget].classList.add('_slideInLeft');
          setTimeout(() => {
            caseItems[indexOldTarget].classList.remove('_selected');
            caseItems[indexNewTarget].classList.add('_selected');
          }, 500);
        }
        if (indexNewTarget < indexOldTarget) {
          caseItems[indexOldTarget].classList.add('_slideOutLeft');
          caseItems[indexNewTarget].classList.add('_slideInRight');
          setTimeout(() => {
            caseItems[indexOldTarget].classList.remove('_selected');
            caseItems[indexNewTarget].classList.add('_selected');
          }, 500);
        }
      }
      if (elem.target.closest('.next-issue')) {
        elem.preventDefault();
        growthTimeLine();
      }
      if (elem.target.closest('.prev-issue')) {
        elem.preventDefault();
        declineTimeLine();
      }
      finiteElements();
    });

  const formEn = document.querySelector('.form-en');
  formEn.addEventListener('submit', formSend);
  const formRu = document.querySelector('.form-ru');
  formRu.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();
    let form = e.target;

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove('_sending');
      } else {
        alert('Error');
        form.reset();
        form.classList.remove('_sending');
      }
    } else {
      alert('Fill in the required fields.');
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReqEn = document.querySelectorAll('._req-en');
    let formReqRu = document.querySelectorAll('._req-ru');
    let formReq;
    if (form == formEn) {
      formReq = formReqEn;
    } else {
      formReq = formReqRu;
    }

    for (let index = 0; index < formReqEn.length; index++) {
      let input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  const langEn = document.querySelectorAll('.lang-en');
  const langRu = document.querySelectorAll('.lang-ru');
  const translateEn = document.querySelector('.en');
  const translateRu = document.querySelector('.ru');

  document.querySelector('.lang').addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.closest('.en')) {
      langEn.forEach((item) => {
        item.classList.remove('_hide');
      });
      langRu.forEach((item) => {
        item.classList.add('_hide');
      });
      translateEn.classList.add('_picked-out');
      translateRu.classList.remove('_picked-out');
    }
    if (e.target.closest('.ru')) {
      langEn.forEach((item) => {
        item.classList.add('_hide');
      });
      langRu.forEach((item) => {
        item.classList.remove('_hide');
      });
      translateEn.classList.remove('_picked-out');
      translateRu.classList.add('_picked-out');
    }
  });
});
