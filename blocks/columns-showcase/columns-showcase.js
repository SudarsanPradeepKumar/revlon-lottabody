export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 1) return;

  let bgRow = null;
  let contentRow = null;

  if (rows.length >= 2) {
    // Row 0: background image (1 column with only a picture)
    // Row 1: content (2 columns: image | title + text + CTA)
    [bgRow, contentRow] = rows;
  } else {
    [contentRow] = rows;
  }

  // Apply background image from bgRow onto the wrapper
  if (bgRow) {
    const bgImg = bgRow.querySelector('img');
    if (bgImg) {
      const src = bgImg.currentSrc || bgImg.src || bgImg.getAttribute('src') || '';
      if (src) {
        const wrapper = block.closest('.columns-showcase-wrapper');
        if (wrapper) {
          wrapper.style.backgroundImage = `url(${src})`;
          wrapper.classList.add('has-background');
        }
      }
    }
    bgRow.remove();
  }

  // Style the content row
  if (contentRow) {
    contentRow.classList.add('columns-showcase-content');
    [...contentRow.children].forEach((col) => {
      const pic = col.querySelector('picture');
      const heading = col.querySelector('h1, h2, h3, h4, h5, h6');
      const textP = [...col.querySelectorAll('p')].find(
        (p) => !p.querySelector('picture') && p.textContent.trim(),
      );
      if (pic && !textP && !heading) {
        col.classList.add('columns-showcase-img-col');
      } else if (textP || heading) {
        col.classList.add('columns-showcase-text-col');
      }
    });
  }
}
