function renderLoading(isLoading) {
  const btn = this._form.querySelector('.popup__submit-btn');
  if (isLoading) {
    btn.textContent = btn.textContent + '...';
  } else {
    btn.textContent = btn.textContent.slice(0, length-3);
  }
}

export {renderLoading};
