function setActive(block, index) {
  const slides = [...block.querySelectorAll('.cargo-hero-slide')];
  const dots = [...block.querySelectorAll('.cargo-hero-dot')];
  slides.forEach((slide, i) => {
    slide.hidden = i !== index;
    slide.setAttribute('aria-hidden', String(i !== index));
  });
  dots.forEach((dot, i) => {
    dot.setAttribute('aria-selected', String(i === index));
    dot.tabIndex = i === index ? 0 : -1;
  });
  block.dataset.activeSlide = String(index);
}

export default function decorate(block) {
  const rows = [...block.children];
  const viewport = document.createElement('div');
  viewport.className = 'cargo-hero-viewport';

  rows.forEach((row, index) => {
    const [imageCell, copyCell, ctaCell] = [...row.children];
    const slide = document.createElement('article');
    slide.className = 'cargo-hero-slide';
    slide.id = `cargo-hero-slide-${index + 1}`;
    slide.append(imageCell, copyCell, ctaCell);

    imageCell.className = 'cargo-hero-image';
    copyCell.className = 'cargo-hero-copy';
    ctaCell.className = 'cargo-hero-cta';
    const link = ctaCell.querySelector('a');
    if (link) link.className = 'cargo-button';
    viewport.append(slide);
  });

  const controls = document.createElement('div');
  controls.className = 'cargo-hero-controls';
  const previous = document.createElement('button');
  previous.type = 'button';
  previous.className = 'cargo-hero-control cargo-hero-prev';
  previous.textContent = 'Previous';
  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'cargo-hero-control cargo-hero-next';
  next.textContent = 'Next';
  const pause = document.createElement('button');
  pause.type = 'button';
  pause.className = 'cargo-hero-control cargo-hero-pause';
  pause.textContent = 'Pause';

  const dots = document.createElement('div');
  dots.className = 'cargo-hero-dots';
  rows.forEach((row, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'cargo-hero-dot';
    dot.textContent = `Slide ${index + 1}`;
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-controls', `cargo-hero-slide-${index + 1}`);
    dot.addEventListener('click', () => setActive(block, index));
    dots.append(dot);
  });

  previous.addEventListener('click', () => {
    const active = Number(block.dataset.activeSlide || 0);
    setActive(block, (active + rows.length - 1) % rows.length);
  });
  next.addEventListener('click', () => {
    const active = Number(block.dataset.activeSlide || 0);
    setActive(block, (active + 1) % rows.length);
  });
  pause.addEventListener('click', () => {
    block.dataset.paused = block.dataset.paused === 'true' ? 'false' : 'true';
    pause.textContent = block.dataset.paused === 'true' ? 'Play' : 'Pause';
  });

  controls.append(previous, next, pause, dots);
  block.replaceChildren(viewport, controls);
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Featured cargo stories');
  setActive(block, 0);
}
