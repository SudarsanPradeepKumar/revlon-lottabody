/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-hero
 * Base block: carousel
 * Source: https://lottabody.com/
 * Selector: #hero-slides .et_pb_slider
 *
 * Each slide has a background-image and an optional CTA link.
 * The image is wrapped in the CTA link to make the entire slide clickable.
 * Output: single-column carousel with one linked image per row.
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

    // Wrap image in the CTA link so the entire slide is clickable
    const ctaLink = slide.querySelector('.et_pb_slide_description a.et_pb_button, .et_pb_button');
    let cell;
    if (ctaLink) {
      const link = document.createElement('a');
      link.href = ctaLink.href;
      link.append(img);
      cell = link;
    } else {
      cell = img;
    }

    cells.push([cell]);
  });

  if (cells.length === 0) return;

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}
