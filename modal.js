var modalWindowBcg, modalWindow, modalWindow_close, modalWindow_ttl, modalWindow_inner;

//открытие модального окна
function showModal(param,ttl){

  if(!modalWindow)
    modalWindowCreate();

  modalWindow_ttl.innerHTML = ttl || '&nbsp;';

  switch(typeof param){
    case "string": 
      //param-что вставить в окно, 
      //ttl-в заголовок окна, 

      //показать окно сейчас
      modalSetTexts(param,ttl);
    break;
    case 'object':
      //показать окно при клике на объект
      param.onclick = function () {
        var id = param.getAttribute('data-src');
        var block = document.querySelector(id);
        if(block){
          ttl = ttl || '&nbsp;';
          modalSetTexts(block.innerHTML,ttl);
        }
        else
          modalError();
        return false;
      }
    break;
    default:
      modalError();
    break;
  }


  function modalWindowCreate(){
    modalWindowBcg = document.createElement('div');
    modalWindowBcg.className = "modalWindowBcg";
    document.body.appendChild(modalWindowBcg);

    modalWindow = document.createElement('div');
    modalWindow.className = "modalWindow";
    modalWindow.innerHTML = "<div class='modalWindow-close'>x</div><div class='modalWindow-ttl'>&nbsp;</div><div class='modalWindow-inner'></div>";
    document.body.appendChild(modalWindow);
        
    modalWindow_ttl = document.querySelector('.modalWindow-ttl');
    modalWindow_inner = document.querySelector('.modalWindow-inner');
    modalWindow_close = document.querySelector('.modalWindow-close');

    //закрытие модального окна
    modalWindowBcg.onclick = function() {
      modalClose();
    }
    modalWindow_close.onclick = function() {
      modalClose();
    }
    
  }

  function modalVisible(){
    var windowH = document.documentElement.clientHeight;
    modalWindow.style.display='block';
    modalWindowBcg.style.display='block';

    var modalH = modalWindow.offsetHeight;
    var modalTop = (windowH - modalH)/2;
    modalWindow.style.top=modalTop+'px';

  }
  function modalClose(){
    modalWindow.style.display='none';
    modalWindowBcg.style.display='none';
  }
  function modalError(){
    showModal('Ошибка');
  }
  function modalSetTexts(text,ttl){
    modalWindow_inner.innerHTML = text; 
    modalWindow_ttl.innerHTML = ttl || '&nbsp;';
    modalVisible();
  }

}