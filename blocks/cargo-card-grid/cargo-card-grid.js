function getCardImagePath(row, isLatest) {
  const text = row.textContent.toLowerCase();
  const alt = row.querySelector('img')?.alt?.toLowerCase() || '';
  const content = `${text} ${alt}`;
  if (isLatest) {
    if (content.includes('myvs')) return '/assets/cargo-home/news-myvs.jpg';
    if (content.includes('seoul') || content.includes('summer')) return '/assets/cargo-home/news-seoul.jpg';
    return '/assets/cargo-home/news-winter-2026.png';
  }
  if (content.includes('service levels')) return '/assets/cargo-home/service-levels.jpg';
  if (content.includes('schedule')) return '/assets/cargo-home/schedule.png';
  return '/assets/cargo-home/products.png';
}

export default function decorate(block) {
  const list = document.createElement('div');
  list.className = 'cargo-card-grid-list';
  const isLatest = block.classList.contains('latest');
  [...block.children].forEach((row) => {
    const [imageCell, bodyCell, ctaCell] = [...row.children];
    const article = document.createElement('article');
    article.className = 'cargo-card-grid-card';
    imageCell.className = 'cargo-card-grid-image';
    bodyCell.className = 'cargo-card-grid-body';
    ctaCell.className = 'cargo-card-grid-cta';
    const image = imageCell.querySelector('img');
    if (image) image.src = getCardImagePath(row, isLatest);
    const link = ctaCell.querySelector('a');
    if (link) link.className = 'cargo-arrow-link';
    article.append(imageCell, bodyCell, ctaCell);
    list.append(article);
  });
  block.replaceChildren(list);
}
