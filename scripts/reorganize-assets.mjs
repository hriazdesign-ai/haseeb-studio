#!/usr/bin/env node
/**
 * One-shot asset reorganization: move files + print path map.
 * Does not edit TS — we update code separately from the map.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const moves = [];
const archives = [];

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function moveFile(fromRel, toRel, list = moves) {
  const from = path.join(root, fromRel);
  const to = path.join(root, toRel);
  if (!fs.existsSync(from)) {
    console.warn("MISSING source:", fromRel);
    return false;
  }
  if (fs.existsSync(to) && path.resolve(from) === path.resolve(to)) {
    return false;
  }
  if (fs.existsSync(to)) {
    // Same basename already at destination — skip if identical size, else keep both via archive conflict name
    const a = fs.statSync(from);
    const b = fs.statSync(to);
    if (a.size === b.size) {
      fs.unlinkSync(from); // duplicate of destination
      list.push({ from: fromRel, to: toRel, note: "removed duplicate of existing dest" });
      return true;
    }
    console.warn("DEST EXISTS different file:", toRel, "— leaving source", fromRel);
    return false;
  }
  ensureDir(path.dirname(to));
  fs.renameSync(from, to);
  list.push({ from: fromRel, to: toRel });
  return true;
}

// --- Active home-parallax → work/[project] ---
const homeActive = [
  ["public/images/home-parallax/mu-cover-2.png", "public/images/work/mums-united/mu-cover-2.png"],
  ["public/images/home-parallax/bright-path-4.png", "public/images/work/bright-path-learning/bright-path-4.png"],
  ["public/images/home-parallax/bright-path-5.png", "public/images/work/bright-path-learning/bright-path-5.png"],
  ["public/images/home-parallax/meridian-2.png", "public/images/work/meridian-and-co/meridian-2.png"],
];
for (const [f, t] of homeActive) moveFile(f, t);

// --- Unused home-parallax → project archives ---
const homeArchive = [
  ["public/images/home-parallax/mu-cover-1.png", "public/images/work/mums-united/archive/mu-cover-1.png"],
  ["public/images/home-parallax/mums-united.png", "public/images/work/mums-united/archive/mums-united.png"],
  ["public/images/home-parallax/mums-united-1.png", "public/images/work/mums-united/archive/mums-united-1.png"],
  ["public/images/home-parallax/mums-united-2.png", "public/images/work/mums-united/archive/mums-united-2.png"],
  ["public/images/home-parallax/mums-united-home-3.png", "public/images/work/mums-united/archive/mums-united-home-3.png"],
  ["public/images/home-parallax/bright-path.png", "public/images/work/bright-path-learning/archive/bright-path.png"],
  ["public/images/home-parallax/bright-path-1.png", "public/images/work/bright-path-learning/archive/bright-path-1.png"],
  ["public/images/home-parallax/bright-path-3.png", "public/images/work/bright-path-learning/archive/bright-path-3.png"],
  ["public/images/home-parallax/meridian.png", "public/images/work/meridian-and-co/archive/meridian.png"],
  ["public/images/home-parallax/archive/meridian-2.png", "public/images/work/meridian-and-co/archive/meridian-2-home-parallax-archive.png"],
];
for (const [f, t] of homeArchive) moveFile(f, t, archives);

// --- Videos → videos/[project] ---
const videoMoves = [
  ["public/images/work/mums-united/case-study/mu-lf-2.webm", "public/videos/mums-united/mu-lf-2.webm"],
  ["public/images/work/bright-path-learning/case-study/bright-2.webm", "public/videos/bright-path-learning/bright-2.webm"],
  ["public/videos/mu-lf-2.webm", "public/videos/mums-united/mu-lf-2.webm"], // may already exist after first move
];
for (const [f, t] of videoMoves) moveFile(f, t);

// --- Unused work images → archive (from audit; exclude ui/divider, exclude already-archive) ---
const unusedWork = [
  // brand-identity
  "brand-identity/case-study/balqees-logo.png",
  "brand-identity/case-study/hero.png",
  "brand-identity/case-study/street-foods.png",
  "brand-identity/cover.png",
  // bright-path
  "bright-path-learning/case-study/bright-5.png",
  "bright-path-learning/case-study/bright-6.png",
  "bright-path-learning/case-study/bright-LF-1-mobile.png",
  "bright-path-learning/case-study/bright-LF-1.png",
  "bright-path-learning/case-study/cover-1.png",
  "bright-path-learning/case-study/hero-1-mobile.png",
  "bright-path-learning/case-study/hero-1.png",
  "bright-path-learning/case-study/hero-2-mobile.png",
  "bright-path-learning/case-study/hero-2.png",
  "bright-path-learning/case-study/hero.png",
  "bright-path-learning/case-study/mobile-confidence.png",
  "bright-path-learning/case-study/mobile-support.png",
  "bright-path-learning/case-study/service-overview.png",
  "bright-path-learning/case-study/student-support.png",
  "bright-path-learning/cover.jpg",
  // delivery-drop
  "delivery-drop/case-study/category-browsing.png",
  "delivery-drop/case-study/digital-advertising-1.png",
  "delivery-drop/case-study/digital-advertising.png",
  "delivery-drop/case-study/hero.png",
  "delivery-drop/case-study/illustration-system.png",
  "delivery-drop/cover.png",
  // digital-editions
  "digital-editions/case-study/digital-covers.png",
  "digital-editions/case-study/editorial-system.png",
  "digital-editions/case-study/hero.png",
  "digital-editions/case-study/interactive-edition-1-mobile.png",
  "digital-editions/case-study/interactive-edition-1.png",
  "digital-editions/case-study/interactive-edition.png",
  "digital-editions/case-study/vogue-exploration.png",
  "digital-editions/case-study/wired-exploration.png",
  "digital-editions/cover-1.png",
  "digital-editions/cover-new-1.png",
  "digital-editions/cover-new-2.png",
  // editorial-experience
  "editorial-experience/case-study/future-exploration.png",
  "editorial-experience/case-study/global-publishing-1-mobile.png",
  "editorial-experience/case-study/hero-1.png",
  "editorial-experience/case-study/hero-2.png",
  "editorial-experience/case-study/hero-3.png",
  "editorial-experience/case-study/hero-4-mobile.png",
  "editorial-experience/case-study/hero-4.png",
  "editorial-experience/case-study/hero-5-mobile.png",
  "editorial-experience/case-study/storytelling-desktop-mobile-1-mobile.png",
  "editorial-experience/cover-1.png",
  "editorial-experience/cover-2.png",
  "editorial-experience/cover-3.png",
  "editorial-experience/cover.png",
  // editorial-publications
  "editorial-publications/case-study/hero-1.png",
  "editorial-publications/case-study/hero.png",
  "editorial-publications/cover-1.png",
  "editorial-publications/cover-1a.png",
  // meridian
  "meridian-and-co/case-study/account-6.png",
  "meridian-and-co/case-study/feature-sections.png",
  "meridian-and-co/case-study/hero.png",
  "meridian-and-co/case-study/meridian-1.png",
  "meridian-and-co/case-study/mobile-consistent.png",
  "meridian-and-co/case-study/mobile-experience.png",
  "meridian-and-co/case-study/pricing-feature.png",
  "meridian-and-co/case-study/pricing-overview.png",
  "meridian-and-co/case-study/pricing-structure.png",
  "meridian-and-co/case-study/service-overview.png",
  "meridian-and-co/cover-a.png",
  "meridian-and-co/cover-b-small.png",
  "meridian-and-co/cover-b.png",
  "meridian-and-co/cover-c.png",
  "meridian-and-co/meridian-1.png",
  // mums
  "mums-united/case-study/hero-1-mobile.png",
  "mums-united/case-study/hero-1.png",
  "mums-united/case-study/hero.png",
  "mums-united/case-study/impact-snapshot.png",
  "mums-united/case-study/mobile-experience.png",
  "mums-united/case-study/mu-hero-2-mobile.png",
  "mums-united/case-study/mu-hero-3.png",
  "mums-united/case-study/mu-hero-4-mobile.png",
  "mums-united/case-study/mu-hero-4.png",
  "mums-united/case-study/mu-hero.jpg",
  "mums-united/case-study/mu-lf-1.png",
  "mums-united/case-study/programme-directory.png",
  "mums-united/case-study/programmes-feature.png",
  "mums-united/case-study/service-overview.png",
  "mums-united/cover-1.png",
  "mums-united/cover.png",
  // onenav
  "onenav/case-study/cross-brand-rollout.png",
  "onenav/case-study/cross-device-navigation.png",
  "onenav/case-study/hero-1.png",
  "onenav/case-study/hero-2.png",
  "onenav/case-study/hero.png",
  "onenav/case-study/navigation-architecture.png",
  "onenav/case-study/navigation-patterns.png",
  "onenav/case-study/platform-evolution.png",
  "onenav/case-study/responsive-navigation.png",
  "onenav/cover-1.png",
  "onenav/cover-2.png",
  "onenav/cover-3.png",
  "onenav/cover-4.png",
  "onenav/cover.png",
  // verso
  "verso-design-system/case-study/across-brands-1.png",
  "verso-design-system/case-study/across-brands.png",
  "verso-design-system/case-study/built-for-publishing.png",
  "verso-design-system/case-study/design-tokens.png",
  "verso-design-system/case-study/hero.png",
  "verso-design-system/case-study/in-production.png",
  "verso-design-system/cover-1.png",
  "verso-design-system/cover-2.png",
  "verso-design-system/cover-3.png",
  "verso-design-system/cover.png",
];

for (const rel of unusedWork) {
  const from = `public/images/work/${rel}`;
  const parts = rel.split("/");
  const project = parts[0];
  const file = parts[parts.length - 1];
  // preserve subpath hint in filename if from case-study to avoid collisions
  const prefix = parts.includes("case-study") ? "case-study-" : "";
  const to = `public/images/work/${project}/archive/${prefix}${file}`;
  moveFile(from, to, archives);
}

// Remove empty home-parallax dirs
function rmEmpty(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) rmEmpty(path.join(dir, e.name));
  }
  if (fs.readdirSync(dir).length === 0) {
    fs.rmdirSync(dir);
    console.log("REMOVED empty:", dir);
  }
}
rmEmpty(path.join(root, "public/images/home-parallax"));

fs.writeFileSync(
  path.join(root, "scripts/asset-move-report.json"),
  JSON.stringify({ moves, archives }, null, 2),
);
console.log("\nMoves:", moves.length, "Archives:", archives.length);
