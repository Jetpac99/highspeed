const TILE_IMAGES = {
  'book online': '/assets/cargo-home/icon-book-online.png',
  'contact us': '/assets/cargo-home/icon-contact-us.png',
  'flight schedules': '/assets/cargo-home/icon-flight-schedules.jpg',
  'fuel surcharge': '/assets/cargo-home/icon-fuel-surcharge.jpg',
};

export default function decorate(block) {
  const list = document.createElement('ul');
  [...block.children].forEach((row) => {
    const [imageCell, linkCell] = [...row.children];
    const item = document.createElement('li');
    imageCell.className = 'cargo-link-tile-icon';
    linkCell.className = 'cargo-link-tile-copy';
    const link = linkCell.querySelector('a');
    if (link) link.className = 'cargo-arrow-link';
    const image = imageCell.querySelector('img');
    const key = image?.alt?.trim().toLowerCase() || link?.textContent.trim().toLowerCase();
    if (image && TILE_IMAGES[key]) image.src = TILE_IMAGES[key];
    item.append(imageCell, linkCell);
    list.append(item);
  });
  block.replaceChildren(list);
}
