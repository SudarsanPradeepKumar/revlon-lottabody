export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 1) return;

  const contentRow = rows[0];
  contentRow.classList.add('columns-showcase-content');

  [...contentRow.children].forEach((col) => {
    const pic = col.querySelector('picture');
    const textP = [...col.querySelectorAll('p')].find(
      (p) => !p.querySelector('picture') && p.textContent.trim(),
    );
    if (pic && !textP) {
      col.classList.add('columns-showcase-img-col');
    } else if (textP) {
      col.classList.add('columns-showcase-text-col');
    }
  });

  // Pull title heading from preceding default content wrapper
  const wrapper = block.closest('.columns-showcase-wrapper');
  if (!wrapper) return;

  const prev = wrapper.previousElementSibling;
  if (prev && !prev.classList.contains('columns-showcase-wrapper')
    && !prev.classList.contains('carousel-hero-wrapper')) {
    const heading = prev.querySelector('h2, h3');
    if (heading) {
      heading.classList.add('columns-showcase-title');
      block.prepend(heading);
    }
    // Use the background image from the preceding paragraph as wrapper background
    const bgPicture = prev.querySelector('p picture, p > picture');
    if (bgPicture) {
      const bgImg = bgPicture.querySelector('img');
      const src = bgImg?.currentSrc || bgImg?.src || bgImg?.getAttribute('src') || '';
      if (src) {
        wrapper.style.backgroundImage = `url(${src})`;
        wrapper.classList.add('has-background');
      }
      bgPicture.closest('p')?.remove();
    }
    if (!prev.textContent.trim() && !prev.querySelector('picture')) {
      prev.remove();
    }
  }
}
