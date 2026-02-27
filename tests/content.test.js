const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const loadJson = (relativePath) => {
  const fullPath = path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
};

test("homepage feature cards are complete", () => {
  const { featureCards } = loadJson("src/content/homepage.json");

  assert.ok(Array.isArray(featureCards));
  assert.ok(featureCards.length > 0);

  for (const card of featureCards) {
    assert.ok(card.title);
    assert.ok(card.description);
    assert.ok(card.href);
    assert.ok(card.imageSrc);
  }
});

test("ausbildung content has categories and guidance", () => {
  const { categories, guidance } = loadJson("src/content/ausbildung.json");

  assert.ok(Array.isArray(categories));
  assert.ok(categories.length > 0);
  assert.ok(Array.isArray(guidance));
  assert.ok(guidance.length > 0);

  for (const category of categories) {
    assert.ok(category.title);
    assert.ok(category.emoji);
    assert.ok(Array.isArray(category.roles));
    assert.ok(category.roles.length > 0);
  }

  for (const item of guidance) {
    assert.ok(item.title);
    assert.ok(Array.isArray(item.points));
    assert.ok(item.points.length > 0);
  }
});
