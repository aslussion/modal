var modalWindowBcg, modalWindow, modalWindow_close, modalWindow_ttl, modalWindow_inner;

document.addEventListener('DOMContentLoaded', function() {
  modalWindowCreate();

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
});

function modalWindowCreate(){
  modalWindowBcg = document.createElement('div');
  modalWindowBcg.className = "modalWindowBcg";
  document.body.appendChild(modalWindowBcg);

  modalWindow = document.createElement('div');
  modalWindow.className = "modalWindow";
  modalWindow.innerHTML = "<div class='modalWindow-close'>x</div><div class='modalWindow-ttl'>&nbsp;</div><div class='modalWindow-inner'></div>";
  document.body.appendChild(modalWindow);
}

//открытие модального окна

function showModal(text,ttl){
  ttl = ttl || '&nbsp;';
  modalWindow_ttl.innerHTML = ttl;

  switch(typeof text){
    //text-что вставить в окно, 
    //ttl-в заголовок окна, 
    case "string": 
      modalWindow_inner.innerHTML = text; 
      modalVisible();
    break;
    case 'object':
      text.onclick = function () {
        var id = text.getAttribute('data-src');
        var block = document.querySelector(id);
        if(block){
          modalWindow_inner.innerHTML = block.innerHTML;
          
          modalVisible();
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

}
function modalVisible(){
  modalWindow.style.display='block';
  modalWindowBcg.style.display='block';
}
function modalClose(){
  modalWindow.style.display='none';
  modalWindowBcg.style.display='none';
}
function modalError(){
  showModal('Ошибка');
}
