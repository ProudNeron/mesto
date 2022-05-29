function renderLoading(isLoading) {
  const btn = document.querySelector('.popup_opened').querySelector('.popup__submit-btn');
  if (isLoading) {
    btn.textContent = btn.textContent + '...';
  } else {
    btn.textContent = btn.textContent.substring(0, length-3);
  }
}

export {renderLoading};
