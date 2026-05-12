export default function decorate(block) {
  const [footerRow, cookieRow] = [...block.children];
  const footer = document.createElement('div');
  footer.className = 'cargo-footer-main';
  [...footerRow.children].forEach((cell) => {
    const column = document.createElement('section');
    column.className = 'cargo-footer-column';
    column.append(...[...cell.children]);
    footer.append(column);
  });

  const cookie = document.createElement('aside');
  cookie.className = 'cargo-cookie-banner';
  cookie.setAttribute('role', 'alert');
  const cookieText = cookieRow.firstElementChild.cloneNode(true);
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'cargo-cookie-close';
  close.textContent = 'Close';
  close.addEventListener('click', () => {
    cookie.hidden = true;
    window.sessionStorage.setItem('cargo-cookie-dismissed', 'true');
  });
  cookie.append(cookieText, close);
  if (window.sessionStorage.getItem('cargo-cookie-dismissed') === 'true') cookie.hidden = true;

  block.replaceChildren(footer, cookie);
}
