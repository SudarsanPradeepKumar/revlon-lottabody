/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-showcase
 * Base block: columns
 * Source: https://lottabody.com/
 * Instances: #milk-and-honey-callout .et_pb_row, #ready-to-use .et_pb_row
 * Generated: 2026-05-19
 * Validated: manually verified - produces correct 2-column block tables
 *
 * Product line showcase layout with 2 columns:
 * - One column contains a linked product group image
 * - Other column contains descriptive paragraph text + "Learn More" CTA link
 * - Column order varies between instances (image left/text right or text left/image right)
 */
export default function parse(element, { document }) {
  // Only process multi-column rows; skip single-column heading rows (default content)
  const columns = element.querySelectorAll(':scope > .et_pb_column');
  if (!columns || columns.length < 2) {
    return;
  }

  // Build cells array - one row with content from each column in DOM order
  const cells = [];
  const row = [];

  for (const column of columns) {
    const cellContent = [];

    // Check for image module (linked product group image)
    const imageModule = column.querySelector('.et_pb_image');
    if (imageModule) {
      const link = imageModule.querySelector('a');
      const img = imageModule.querySelector('img');
      if (link && img) {
        // Reference existing elements - clone to avoid DOM mutation issues
        const anchor = link.cloneNode(false);
        anchor.textContent = '';
        const imgClone = img.cloneNode(false);
        anchor.appendChild(imgClone);
        cellContent.push(anchor);
      } else if (img) {
        cellContent.push(img.cloneNode(false));
      }
    }

    // Check for text module (paragraph + CTA link)
    const textModule = column.querySelector('.et_pb_text');
    if (textModule) {
      const textInner = textModule.querySelector('.et_pb_text_inner');
      if (textInner) {
        // Extract paragraph text
        const paragraph = textInner.querySelector('p');
        if (paragraph) {
          cellContent.push(paragraph.cloneNode(true));
        }

        // Extract CTA link (e.g., "Learn More")
        const ctaLink = textInner.querySelector('a');
        if (ctaLink) {
          cellContent.push(ctaLink.cloneNode(true));
        }
      }
    }

    row.push(cellContent);
  }

  cells.push(row);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-showcase', cells });
  element.replaceWith(block);
}
