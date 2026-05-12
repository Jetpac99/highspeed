import { loadCSS } from '../../scripts/aem.js';

function createButton(label, className) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.textContent = label;
  return button;
}

function closeOpenPanels(block, except) {
  block.querySelectorAll('.cargo-header-nav-item[aria-expanded="true"]').forEach((item) => {
    if (item !== except) item.setAttribute('aria-expanded', 'false');
  });
}

function buildNavItem(row) {
  const source = row.firstElementChild;
  const heading = source.querySelector('h3');
  const links = source.querySelector('ul');
  const item = document.createElement('li');
  item.className = 'cargo-header-nav-item';
  item.setAttribute('aria-expanded', 'false');

  const button = createButton(heading.textContent.trim(), 'cargo-header-nav-button');
  button.setAttribute('aria-haspopup', 'true');
  button.setAttribute('aria-expanded', 'false');

  const panel = document.createElement('div');
  panel.className = 'cargo-header-dropdown';
  const title = document.createElement('p');
  title.className = 'cargo-header-dropdown-title';
  title.textContent = heading.textContent.trim();
  panel.append(title, links.cloneNode(true));

  button.addEventListener('click', () => {
    const expanded = item.getAttribute('aria-expanded') === 'true';
    closeOpenPanels(item.closest('.cargo-header'), expanded ? null : item);
    item.setAttribute('aria-expanded', String(!expanded));
    button.setAttribute('aria-expanded', String(!expanded));
  });

  item.append(button, panel);
  return item;
}

function buildPanel(source, type) {
  const panel = document.createElement('aside');
  panel.className = `cargo-header-panel cargo-header-panel-${type}`;
  panel.hidden = true;
  panel.append(...[...source.children].map((child) => child.cloneNode(true)));

  const close = createButton('Close', 'cargo-header-panel-close');
  panel.prepend(close);
  close.addEventListener('click', () => {
    panel.hidden = true;
  });
  return panel;
}

export default function decorate(block) {
  loadCSS(`${window.hlx.codeBasePath}/styles/cargo.css`);

  const rows = [...block.children];
  const topRow = rows[0];
  const navRows = rows.slice(1, 7);
  const utilityRow = rows[7];
  const [logoCell, accountCell, trackCell] = [...topRow.children];

  const shell = document.createElement('div');
  shell.className = 'cargo-header-shell';

  const accountBar = document.createElement('div');
  accountBar.className = 'cargo-header-account-bar';
  const accountInner = document.createElement('div');
  accountInner.className = 'cargo-header-account-inner';
  accountInner.append(...[...accountCell.querySelectorAll('a')].map((link) => link.cloneNode(true)));
  accountBar.append(accountInner);

  const mainBar = document.createElement('div');
  mainBar.className = 'cargo-header-main-bar';

  const logo = logoCell.querySelector('a').cloneNode(true);
  logo.className = 'cargo-header-logo';

  const nav = document.createElement('nav');
  nav.className = 'cargo-header-nav';
  nav.setAttribute('aria-label', 'Cargo main navigation');
  const navList = document.createElement('ul');
  navRows.forEach((row) => navList.append(buildNavItem(row)));
  nav.append(navList);

  const tools = document.createElement('div');
  tools.className = 'cargo-header-tools';
  const searchButton = createButton('Search', 'cargo-header-icon cargo-header-search-button');
  const alertButton = createButton('Alerts', 'cargo-header-icon cargo-header-alert-button');
  const menuButton = createButton('Menu', 'cargo-header-menu-button');
  const trackLink = trackCell.querySelector('a').cloneNode(true);
  trackLink.className = 'cargo-header-track';
  tools.append(alertButton, trackLink, menuButton);

  const mobileNav = nav.cloneNode(true);
  mobileNav.className = 'cargo-header-mobile-nav';
  mobileNav.hidden = true;
  mobileNav.querySelectorAll('.cargo-header-dropdown').forEach((panel) => { panel.hidden = false; });
  mobileNav.querySelectorAll('button').forEach((button) => button.remove());

  menuButton.addEventListener('click', () => {
    const { hidden } = mobileNav;
    mobileNav.hidden = !hidden;
    menuButton.setAttribute('aria-expanded', String(hidden));
  });

  mainBar.append(logo, nav, tools);

  const [searchSource, alertSource] = [...utilityRow.children];
  const searchPanel = buildPanel(searchSource, 'search');
  const alertPanel = buildPanel(alertSource, 'alerts');

  searchButton.addEventListener('click', () => {
    searchPanel.hidden = !searchPanel.hidden;
    alertPanel.hidden = true;
  });
  alertButton.addEventListener('click', () => {
    alertPanel.hidden = !alertPanel.hidden;
    searchPanel.hidden = true;
  });

  document.addEventListener('click', (event) => {
    if (!block.contains(event.target)) closeOpenPanels(block);
  });

  shell.append(accountBar, mainBar, mobileNav, searchPanel, alertPanel);
  block.replaceChildren(shell);
}
