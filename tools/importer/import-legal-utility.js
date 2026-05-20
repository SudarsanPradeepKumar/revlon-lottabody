/* eslint-disable */
/* global WebImporter */

// TRANSFORMER IMPORTS
import lottabodyCleanupTransformer from './transformers/lottabody-cleanup.js';

// TRANSFORMER REGISTRY
const transformers = [
  lottabodyCleanupTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'legal-utility',
  description: 'Legal and utility pages with long-form text content',
  urls: [
    'https://lottabody.com/privacy/',
    'https://lottabody.com/terms/',
    'https://lottabody.com/exercise-your-privacy-rights/',
    'https://lottabody.com/sitemap/',
    'https://lottabody.com/thanks-for-registering/',
    'https://lottabody.com/lottaselfie-terms/',
    'https://lottabody.com/lottabody-control-24hr-edge-gel/',
  ],
  blocks: [],
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, payload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers
    executeTransformers('beforeTransform', main, payload);

    // 2. Execute afterTransform transformers
    executeTransformers('afterTransform', main, payload);

    // 3. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 4. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
      },
    }];
  },
};
