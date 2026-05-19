/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import columnsProductParser from './parsers/columns-product.js';
import columnsDetailsParser from './parsers/columns-details.js';

// TRANSFORMER IMPORTS
import lottabodyCleanupTransformer from './transformers/lottabody-cleanup.js';

// PARSER REGISTRY
const parsers = {
  'columns-product': columnsProductParser,
  'columns-details': columnsDetailsParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  lottabodyCleanupTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'product-detail',
  description: 'Product detail page with breadcrumb, product hero image, description, benefits list, directions, and model image',
  urls: [
    'https://lottabody.com/coconut-and-shea-oils/24hr-edge-gel/',
    'https://lottabody.com/coconut-and-shea-oils/love-me-5-n-1-leave-in-treatment/',
    'https://lottabody.com/coconut-and-shea-oils/moisturize-me-curl-and-style-milk/',
    'https://lottabody.com/coconut-and-shea-oils/sleek-me-blowout-lotion/',
    'https://lottabody.com/coconut-and-shea-oils/style-me-texturizing-setting-lotion/',
    'https://lottabody.com/coconut-and-shea-oils/wrap-me-foaming-mousse/',
    'https://lottabody.com/coconut-and-shea-oils/control-me-edge-gel/',
    'https://lottabody.com/milk-and-honey/refine-me-curl-defining-mousse/',
  ],
  blocks: [
    {
      name: 'columns-product',
      instances: ['.et_pb_section_1 .et_pb_column_1_4, .et_pb_section_1 .et_pb_row_inner_0'],
    },
    {
      name: 'columns-details',
      instances: ['.et_pb_row_inner_1'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Product Content',
      selector: '.et_pb_section_0, .et_pb_section_1',
      style: 'light-blue-textured',
      blocks: ['columns-product', 'columns-details'],
      defaultContent: ['#breadcrumbs'],
    },
  ],
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find and parse blocks
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name}:`, e);
        }
      }
    });

    // 3. Execute afterTransform transformers (final cleanup)
    executeTransformers('afterTransform', main, payload);

    // 4. Create section metadata for styled sections
    PAGE_TEMPLATE.sections.forEach((section) => {
      if (section.style) {
        const cells = [
          ['Section Metadata'],
          ['style', section.style],
        ];
        const table = WebImporter.DOMUtils.createTable(cells, document);
        main.append(table);
      }
    });

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
