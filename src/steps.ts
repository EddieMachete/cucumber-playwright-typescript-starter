import { Given, Then, When } from '@cucumber/cucumber';
import { BrowserWorld } from './world';
import { loadImage } from './utils';
import { PNG, PNGWithMetadata } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { writeFileSync } from 'fs';

/**
 * Given "http://example.com"
 */
Given(
  /^\"(.*)\"$/i,
  async function(this: BrowserWorld, url) {
    await this.page.goto(url);
  },
);

Given(
  'that a merchant is at the Markets landing page',
  async function() {
    await this.page.goto('https://www.shopify.com/markets');
  },
);

When(
  'they are looking at the Growth Tools section',
  async function(this: BrowserWorld) {
    // this.page.scrollTo
  },
);

/**
 * Then save screenshot
 */
Then(
  'save {string} screenshot',
  async function(this: BrowserWorld, name: string) {
    await this.page.screenshot({ path: `./data/${name}.png`});
  },
);

Then(
  'the screen matches the design for {string}',
    async function(this: BrowserWorld, sectionName: string) {
      const expectedImage: PNGWithMetadata | null = await loadImage(`./assets/designs/${sectionName}.png`);

      if (!expectedImage) {
        throw 'Design not found';
      }

      const actualImageData: Buffer = await this.page.screenshot({ path: `./data/${sectionName}.png`});
      const actualImage: PNGWithMetadata | null = PNG.sync.read(actualImageData);

      const comparison: {image: PNG, difference: number} =
        compareScreenshots(expectedImage, actualImage);

      if (comparison.difference > 0) {
        writeFileSync(
          `./data/${sectionName}-difference.png`,
          PNG.sync.write(comparison.image),
        );

        throw 'The screen does not match the design';
      }
  },
);

function compareScreenshots(
  expected: PNGWithMetadata,
  actual: PNGWithMetadata,
  ): {image: PNG, difference: number} {
  const {width, height} = actual;
  const comparisonImage: PNG = new PNG({width, height});
  const difference = pixelmatch(actual.data, expected.data, comparisonImage.data, width, height);

  return {
    image: comparisonImage,
    difference,
  };
}