/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-signup
 * Base block: columns
 * Source: https://lottabody.com/
 * Selector: #mailing-list .et_pb_row
 * Generated: 2026-05-19T00:00:00Z
 *
 * Extracts the mailing list signup section into a two-column layout:
 * - Left column: heading text + placeholder for email signup form
 * - Right column: model image
 *
 * The parser is designed to be called on the form row (.et_pb_row_5)
 * which contains the 3/4 + 1/4 column layout. It also looks for
 * the heading in a sibling header row (.et_pb_row_4) or within the
 * parent section.
 */
export default function parse(element, { document }) {
  // Determine context - element could be the header row or the form row
  const parent = element.parentElement;

  // Find the heading - could be in the current element or a sibling row
  let heading = element.querySelector('h4, h3, h2');
  if (!heading && parent) {
    // Look in sibling rows for the heading
    const headerRow = parent.querySelector('.et_pb_row.header, .et_pb_row_4');
    if (headerRow) {
      heading = headerRow.querySelector('h4, h3, h2');
    }
  }

  // Find the model image in the 1/4 column (right column)
  let modelImage = element.querySelector('.et_pb_column_1_4 img, .et_pb_image.model img');
  if (!modelImage && parent) {
    // Look in sibling form row for the model image
    const formRow = parent.querySelector('.et_pb_row.form, .et_pb_row_5, .et_pb_row_3-4_1-4');
    if (formRow) {
      modelImage = formRow.querySelector('.et_pb_column_1_4 img, .et_pb_image.model img, .et-last-child img');
    }
  }

  // Build left column content: heading + form placeholder
  const leftContent = [];

  if (heading) {
    const h = heading.cloneNode(true);
    leftContent.push(h);
  }

  // Add placeholder paragraph for email signup form (form will be migrated separately)
  const placeholder = document.createElement('p');
  placeholder.textContent = 'Email signup form';
  leftContent.push(placeholder);

  // Build right column content: model image
  const rightContent = [];
  if (modelImage) {
    rightContent.push(modelImage);
  }

  // Build cells array: single content row with two columns
  const cells = [
    [leftContent, rightContent],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-signup', cells });
  element.replaceWith(block);
}
