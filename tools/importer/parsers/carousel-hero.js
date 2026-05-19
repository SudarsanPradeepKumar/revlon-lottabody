/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-hero
 * Base block: carousel
 * Source: https://lottabody.com/
 * Selector: #hero-slides .et_pb_slider
 *
 * Slides use CSS background-image (not <img> tags).
 * Extracts background-image URL from inline style and creates img elements.
 */
export default function parse(element, { document }) {
  const slides = element.querySelectorAll('.et_pb_slide');
  if (!slides || slides.length === 0) return;

  const cells = [];

  slides.forEach((slide) => {
    // Extract background-image URL from inline style or computed style
    let bgUrl = '';
    const bgStyle = slide.style.backgroundImage || '';
    const match = bgStyle.match(/url\(["']?(.*?)["']?\)/);
    if (match && match[1]) {
      bgUrl = match[1];
    }

    // Create an img element from the background-image URL
    let imageCell = '';
    if (bgUrl) {
      const img = document.createElement('img');
      img.src = bgUrl;
      imageCell = img;
    }

    // Extract optional CTA button link
    const ctaLink = slide.querySelector('.et_pb_slide_description a.et_pb_button, .et_pb_button');
    const ctaCell = ctaLink || '';

    cells.push([imageCell, ctaCell]);
  });

  if (cells.length === 0) return;

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}
