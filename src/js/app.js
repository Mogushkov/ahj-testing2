import americanexpress from '../img/american_express.png';
import dinersclub from '../img/diners_club.png';
import jcb from '../img/jcb.png';
import mastercard from '../img/mastercard.png';
import mir from '../img/mir.png';
import unionpay from '../img/unionpay.png';
import visa from '../img/visa.png';
import cardSystemIdentifier from './cardSystemIdentifier';
import luhnValidator from './luhnValidator';

document.addEventListener('DOMContentLoaded', () => {
  const homework = document.querySelector('.homework');
  homework.insertAdjacentHTML(
    'afterBegin',
    `
    <div class="cards">    
    <img src="${americanexpress}" alt="American Express" class="card amex">
    <img src="${dinersclub}" alt="Diners Club" class="card dinersclub">
    <img src="${jcb}" alt="JCB" class="card jcb">
    <img src="${mastercard}" alt="Mastercard" class="card mastercard">
    <img src="${mir}" alt="Mir" class="card mir">       
    <img src="${unionpay}" alt="Union Pay" class="card unionpay">
    <img src="${visa}" alt="Visa" class="card visa">
    </div>
    <form class="validation-card-number-form-widget">
      <div class="form-control">
      <label for="card-number-input">Credit card number:</label>
      <input id="card-number-input" class="card-number-input" type="text">
      </div>
      <button class="card-number-submit">Click to Validate</button>
      </form>
    `,
  );
  const formInput = document.querySelector('.card-number-input');
  const btn = document.querySelector('.card-number-submit');
  const cardsAllElems = document.querySelectorAll('.card');
  formInput.addEventListener('input', () => {
    formInput.classList.remove('invalid');
    formInput.classList.remove('valid');
    btn.textContent = 'Click to Validate';
  });

  const formSubmit = document.querySelector('.validation-card-number-form-widget');
  formSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    formInput.value = formInput.value.trim();
    const luhnIsValid = luhnValidator(formInput.value);
    const cardSys = cardSystemIdentifier(formInput.value);
    const cardElem = document.querySelector(cardSys);
    cardsAllElems.forEach((cardEl) => cardEl.classList.add('card-disable'));
    formInput.classList.add('invalid');
    formInput.classList.remove('valid');
    btn.textContent = 'Invalid card';
    if (cardSys && luhnIsValid) {
      formInput.classList.add('valid');
      formInput.classList.remove('invalid');
      btn.textContent = 'Valid card';
      cardElem.classList.add('card-enable');
      cardElem.classList.remove('card-disable');
    }
  });
});
