// import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  addButton: document.querySelector(".toDoButton"),
  form: document.querySelector(".toDoForm"),
  input: document.querySelector(".toDoInput"),
  cardButton: document.querySelector(".buttonToDoCard"),
  appContainer: document.querySelector(".app"),
  clearApp: document.querySelector(".btnClear"),
};


refs.form.addEventListener("submit", handleFormSubmit);
refs.appContainer.addEventListener("click", handleAppContainerClick);
refs.clearApp.addEventListener("click", handelAppClear);

function populateCardsFromLocalStorage() {
  getStoredStrings().forEach((element) => {
    rendefCards(element);
  });
  
}

populateCardsFromLocalStorage();

function handleFormSubmit(event) {
  event.preventDefault();
 
  if (refs.input.value.trim() === "") {
    
// Notify.failure('Enter the task');
    return;
  }
  let formData = new FormData(event.target);
  resetForm();
  rendefCards(formData.get("toDoInpunValue"));
  addStringToArrayAndSave(formData.get("toDoInpunValue"));
  clearBtnrender()
}

function resetForm() {
  refs.form.reset();
 
}

function handleAppContainerClick(event) {
  if (event.target.classList.contains("buttonToDoCard")) {
    const cardList = event.target.closest(".toDoCardList");

    if (cardList) {
      cardList.remove();
      const textCard = cardList.firstChild.textContent;
      delStringToArraySave(textCard);
    }
  }
}
function handelAppClear() {
  saveStringsToLocalStorage([]);
  refs.appContainer.innerHTML = "";

}
function clearBtnrender(){
  if(refs.appContainer.textContent === ""){
    refs.clearApp.classList.add("is-hidden")
  }else{
    refs.clearApp.classList.remove("is-hidden")
  }

}
function getStoredStrings() {
  const storedData = localStorage.getItem("myCard");
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return [];
  }
}

function saveStringsToLocalStorage(stringsArray) {
  localStorage.setItem("myCard", JSON.stringify(stringsArray));
}

function addStringToArrayAndSave(itemCard) {
  const currentStringsArray = getStoredStrings();

  currentStringsArray.push(itemCard);

  saveStringsToLocalStorage(currentStringsArray);
}
function delStringToArraySave(textCard) {
  const storedStrings = getStoredStrings();
  const updatedStrings = storedStrings.filter(
    (element) => element !== textCard
  );
  saveStringsToLocalStorage(updatedStrings);
  clearBtnrender()

}

function rendefCards(element) {
  refs.appContainer.insertAdjacentHTML(
    "afterbegin",
    `<div class="toDoCardList"><div class="toDoCardItems">${element}</div> <button class="buttonToDoCard" type="button"></button></div>`
  );
}
