export default function decorate(block) {
  const list = document.createElement('div');
  list.className = 'cargo-card-grid-list';
  [...block.children].forEach((row) => {
    const [imageCell, bodyCell, ctaCell] = [...row.children];
    const article = document.createElement('article');
    article.className = 'cargo-card-grid-card';
    imageCell.className = 'cargo-card-grid-image';
    bodyCell.className = 'cargo-card-grid-body';
    ctaCell.className = 'cargo-card-grid-cta';
    const link = ctaCell.querySelector('a');
    if (link) link.className = 'cargo-arrow-link';
    article.append(imageCell, bodyCell, ctaCell);
    list.append(article);
  });
  block.replaceChildren(list);
}
