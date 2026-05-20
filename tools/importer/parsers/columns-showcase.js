/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-showcase
 * Source: https://lottabody.com/
 * Instances: #milk-and-honey-callout .et_pb_row, #ready-to-use .et_pb_row
 *
 * New structure (3 rows):
 * Row 1 (1 col): Background image (from section background)
 * Row 2 (1 col): Title heading (e.g., "Milk & Honey")
 * Row 3 (2 cols): Product image | Description + CTA link
 */
export default function parse(element, { document }) {
  const columns = element.querySelectorAll(':scope > .et_pb_column');

  // Skip single-column heading rows (they're consumed by the content row parser)
  if (!columns || columns.length < 2) {
    element.remove();
    return;
  }

  // Get parent section for background image and heading
  const section = element.closest('.et_pb_section');

  // Row 1: Background image from section
  let bgCell = '';
  if (section) {
    const bgStyle = section.style.backgroundImage || '';
    const bgMatch = bgStyle.match(/url\(["']?(.*?)["']?\)/);
    if (bgMatch && bgMatch[1]) {
      const img = document.createElement('img');
      img.src = bgMatch[1];
      bgCell = img;
    }
  }

  // Row 2: Title heading from section's first row
  let titleCell = '';
  if (section) {
    const sectionHeading = section.querySelector('.et_pb_row h3, .et_pb_row h2');
    if (sectionHeading) {
      const h3 = document.createElement('h3');
      h3.textContent = sectionHeading.textContent.trim();
      titleCell = h3;
    }
  }

  // Row 3: Product image and description from the 2-column row
  const col0HasImg = columns[0].querySelector('.et_pb_image');
  const col1HasImg = columns[1].querySelector('.et_pb_image');

  let productImgEl = '';
  let rightCell = [];

  if (col0HasImg) {
    // Image in col 0, text in col 1
    const link = columns[0].querySelector('a');
    const img = columns[0].querySelector('img');
    if (link && img) {
      const a = document.createElement('a');
      a.href = link.href;
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt || '';
      a.append(newImg);
      productImgEl = a;
    } else if (img) {
      productImgEl = img.cloneNode(false);
    }

    const textInner = columns[1].querySelector('.et_pb_text_inner');
    if (textInner) {
      const p = textInner.querySelector('p');
      if (p) rightCell.push(p.cloneNode(true));
      const cta = textInner.querySelector('a');
      if (cta) {
        const pp = document.createElement('p');
        const a = document.createElement('a');
        a.href = cta.href;
        a.textContent = cta.textContent;
        pp.append(a);
        rightCell.push(pp);
      }
    }
  } else if (col1HasImg) {
    // Text in col 0, image in col 1
    const link = columns[1].querySelector('a');
    const img = columns[1].querySelector('img');
    if (link && img) {
      const a = document.createElement('a');
      a.href = link.href;
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt || '';
      a.append(newImg);
      productImgEl = a;
    } else if (img) {
      productImgEl = img.cloneNode(false);
    }

    const textInner = columns[0].querySelector('.et_pb_text_inner');
    if (textInner) {
      const p = textInner.querySelector('p');
      if (p) rightCell.push(p.cloneNode(true));
      const cta = textInner.querySelector('a');
      if (cta) {
        const pp = document.createElement('p');
        const a = document.createElement('a');
        a.href = cta.href;
        a.textContent = cta.textContent;
        pp.append(a);
        rightCell.push(pp);
      }
    }
  }

  // Build cells
  const cells = [];
  if (bgCell) cells.push([bgCell]);
  if (titleCell) cells.push([titleCell]);
  cells.push([productImgEl, rightCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-showcase', cells });
  element.replaceWith(block);
}
