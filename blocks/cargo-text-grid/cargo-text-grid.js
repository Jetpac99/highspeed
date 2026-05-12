export default function decorate(block) {
  const list = document.createElement('div');
  list.className = 'cargo-text-grid-list';
  [...block.children].forEach((row) => {
    const [bodyCell, ctaCell] = [...row.children];
    const article = document.createElement('article');
    article.className = 'cargo-text-grid-card';
    bodyCell.className = 'cargo-text-grid-body';
    ctaCell.className = 'cargo-text-grid-cta';
    const link = ctaCell.querySelector('a');
    if (link) link.className = 'cargo-arrow-link';
    article.append(bodyCell, ctaCell);
    list.append(article);
  });
  block.replaceChildren(list);
}
