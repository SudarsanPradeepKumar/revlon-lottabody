/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import carouselHeroParser from './parsers/carousel-hero.js';
import columnsShowcaseParser from './parsers/columns-showcase.js';
import columnsSignupParser from './parsers/columns-signup.js';

// TRANSFORMER IMPORTS
import lottabodyCleanupTransformer from './transformers/lottabody-cleanup.js';

// PARSER REGISTRY
const parsers = {
  'carousel-hero': carouselHeroParser,
  'columns-showcase': columnsShowcaseParser,
  'columns-signup': columnsSignupParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  lottabodyCleanupTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Homepage with video hero, product line showcases, and email signup form',
  urls: ['https://lottabody.com/'],
  blocks: [
    {
      name: 'carousel-hero',
      instances: ['#hero-slides .et_pb_slider'],
    },
    {
      name: 'columns-showcase',
      instances: ['#milk-and-honey-callout .et_pb_row', '#ready-to-use .et_pb_row'],
    },
    {
      name: 'columns-signup',
      instances: ['#mailing-list .et_pb_row'],
    },
  ],
  sections: [
    {
      id: 'section-hero',
      name: 'Hero Carousel',
      selector: '#hero-slides',
      style: null,
      blocks: ['carousel-hero'],
      defaultContent: [],
    },
    {
      id: 'section-milk-honey',
      name: 'Milk and Honey Callout',
      selector: '#milk-and-honey-callout',
      style: 'pink',
      blocks: ['columns-showcase'],
      defaultContent: ['#milk-and-honey-callout h3'],
    },
    {
      id: 'section-ready-to-use',
      name: 'Coconut and Shea Oils',
      selector: '#ready-to-use',
      style: 'blue',
      blocks: ['columns-showcase'],
      defaultContent: ['#ready-to-use h3'],
    },
    {
      id: 'section-mailing-list',
      name: 'Mailing List Signup',
      selector: '#mailing-list',
      style: 'dark',
      blocks: ['columns-signup'],
      defaultContent: ['#mailing-list .et_pb_text_0'],
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

    // 1. Execute beforeTransform transformers
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

    // 3. Execute afterTransform transformers
    executeTransformers('afterTransform', main, payload);

    // 4. Create section metadata for styled sections
    PAGE_TEMPLATE.sections.forEach((section) => {
      if (section.style) {
        const sectionEl = document.querySelector(section.selector);
        if (sectionEl) {
          const cells = [
            ['Section Metadata'],
            ['style', section.style],
          ];
          const table = WebImporter.DOMUtils.createTable(cells, document);
          sectionEl.append(table);
          // Add section break
          const hr = document.createElement('hr');
          sectionEl.after(hr);
        }
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
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
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
