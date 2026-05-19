/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-product variant.
 * Base block: columns
 * Source: https://lottabody.com/coconut-and-shea-oils/24hr-edge-gel/
 * Generated: 2026-05-19
 *
 * Layout: 2-column product hero
 * - Left column (1/4 width): product image, "Where to Buy" CTA, "Buy on Amazon" CTA
 * - Right column (3/4 width): H1 product name heading, description paragraph
 *
 * The instance selector matches two elements:
 *   1. .et_pb_column_1_4 (left column with image + buttons)
 *   2. .et_pb_row_inner_0 (right column content with heading + text)
 * This parser handles both cases:
 *   - If called on the left column, it finds the sibling right content and builds the full block.
 *   - If called on the row_inner_0, it removes itself (block already created by first call).
 */
export default function parse(element, { document }) {
  // Determine which element we received
  const isLeftColumn = element.classList.contains('et_pb_column_1_4') || element.classList.contains('et_pb_column_single');
  const isRightInner = element.classList.contains('et_pb_row_inner_0') || element.classList.contains('et_pb_row_inner');

  // If this is the right column inner row, it was already consumed by the left column parse.
  // Remove it to avoid orphaned content.
  if (isRightInner && !isLeftColumn) {
    element.remove();
    return;
  }

  // === LEFT COLUMN: Product image + CTA buttons ===
  const leftContent = [];

  // Product image
  const productImg = element.querySelector('.et_pb_image img, img[class*="wp-image"]');
  if (productImg) {
    leftContent.push(productImg);
  }

  // "Where to Buy" button link (direct child wrapper, not inside et_pb_code)
  const whereToBuyLink = element.querySelector(':scope > .et_pb_button_module_wrapper > a.et_pb_button, a.et_pb_button[href*="where-to-buy"]');
  if (whereToBuyLink) {
    leftContent.push(whereToBuyLink);
  }

  // "Buy on Amazon" button link (inside et_pb_code module)
  const amazonLink = element.querySelector('.et_pb_code a.et_pb_button, a.et_pb_button[href*="amazon"]');
  if (amazonLink) {
    leftContent.push(amazonLink);
  }

  // === RIGHT COLUMN: Heading + description ===
  // Navigate to sibling: the right column (.et_pb_column_3_4) is a sibling of left column
  const rightContent = [];
  const parentRow = element.parentElement;
  const rightCol = parentRow ? parentRow.querySelector('.et_pb_column_3_4, .et_pb_specialty_column') : null;

  if (rightCol) {
    // Find heading and description inside .et_pb_row_inner_0
    const innerRow = rightCol.querySelector('.et_pb_row_inner_0, .et_pb_row_inner:first-child');
    if (innerRow) {
      const heading = innerRow.querySelector('h1, h2, h3');
      if (heading) {
        rightContent.push(heading);
      }

      const description = innerRow.querySelector('p');
      if (description) {
        rightContent.push(description);
      }
    }
  } else {
    // Fallback: try to find heading/description in adjacent elements
    const section = element.closest('.et_pb_section_1, .et_pb_section');
    if (section) {
      const heading = section.querySelector('.et_pb_row_inner_0 h1, .et_pb_row_inner h1, h1');
      if (heading) rightContent.push(heading);

      const description = section.querySelector('.et_pb_row_inner_0 p, .et_pb_row_inner p');
      if (description) rightContent.push(description);
    }
  }

  // === Build cells array: single row with 2 columns ===
  const cells = [
    [leftContent, rightContent],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-product', cells });
  element.replaceWith(block);
}
