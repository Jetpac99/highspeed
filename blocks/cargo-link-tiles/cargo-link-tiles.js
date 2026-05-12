export default function decorate(block) {
  const list = document.createElement('ul');
  [...block.children].forEach((row) => {
    const [imageCell, linkCell] = [...row.children];
    const item = document.createElement('li');
    imageCell.className = 'cargo-link-tile-icon';
    linkCell.className = 'cargo-link-tile-copy';
    const link = linkCell.querySelector('a');
    if (link) link.className = 'cargo-arrow-link';
    item.append(imageCell, linkCell);
    list.append(item);
  });
  block.replaceChildren(list);
}
