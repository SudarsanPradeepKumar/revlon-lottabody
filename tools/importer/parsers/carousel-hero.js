/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-hero
 * Base block: carousel
 * Source: https://lottabody.com/
 * Selector: #hero-slides .et_pb_slider
 *
 * Output: 2-column rows — col1: slide image, col2: link URL (or empty if no link)
 * The block JS reads the URL from col2 and makes the entire image clickable.
 */
export default function parse(element, { document }) {
  const slides = element.querySelectorAll('.et_pb_slide');
  if (!slides || slides.length === 0) return;

  const cells = [];

  slides.forEach((slide) => {
    let bgUrl = '';
    const bgStyle = slide.style.backgroundImage || '';
    const match = bgStyle.match(/url\(["']?(.*?)["']?\)/);
    if (match && match[1]) {
      bgUrl = match[1];
    }

    if (!bgUrl) return;

    const img = document.createElement('img');
    img.src = bgUrl;

    // Extract CTA link URL for column 2
    const ctaLink = slide.querySelector('.et_pb_slide_description a.et_pb_button, .et_pb_button');
    let linkCell = '';
    if (ctaLink) {
      const link = document.createElement('a');
      link.href = ctaLink.href;
      link.textContent = ctaLink.href;
      linkCell = link;
    }

    cells.push([img, linkCell]);
  });

  if (cells.length === 0) return;

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}
