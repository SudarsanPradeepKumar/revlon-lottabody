/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-details
 * Base block: columns
 * Source: https://lottabody.com/coconut-and-shea-oils/24hr-edge-gel/
 * Selector: .et_pb_row_inner_1
 * Layout: Left column (benefits heading + list + usage heading + text) | Right column (lifestyle image)
 * Generated: 2026-05-19
 */
export default function parse(element, { document }) {
  // Left column: extract text content (headings, list, paragraphs)
  const leftColumn = element.querySelector('.et_pb_column_inner_1, .et_pb_column_inner:first-child');
  const textContainer = leftColumn
    ? leftColumn.querySelector('.et_pb_text_inner, .et_pb_text')
    : null;

  // Build left cell content from the text container
  const leftCell = [];
  if (textContainer) {
    // Get all child elements in order: h4, ul, h4, p
    const inner = textContainer.classList.contains('et_pb_text_inner')
      ? textContainer
      : textContainer.querySelector('.et_pb_text_inner') || textContainer;

    const children = inner.children;
    for (let i = 0; i < children.length; i++) {
      leftCell.push(children[i]);
    }
  }

  // Right column: extract image
  const rightColumn = element.querySelector('.et_pb_column_inner_2, .et_pb_column_inner:last-child, .et-last-child');
  const image = rightColumn
    ? rightColumn.querySelector('img')
    : element.querySelector('.et_pb_image img, img');

  const rightCell = [];
  if (image) {
    rightCell.push(image);
  }

  // Build cells: single row with two columns
  const cells = [
    [leftCell, rightCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-details', cells });
  element.replaceWith(block);
}
