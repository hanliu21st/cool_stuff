const heading = document.querySelector('.scale');
heading.innerHTML = sparanWrap(heading.textContent);

function sparanWrap(word) {
  return [...word].map(letter => `<span>${letter}</span>`).join('');
}