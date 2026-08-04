import * as fs from "fs";
import * as path from "path";
const domain = "https://theaveniq.site";
const currentDate = new Date().toISOString().split("T")[0];
const routes = [
    // Homepage (1.0)
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/about", priority: "0.85", changefreq: "weekly" },
    // Services (0.95)
    { path: "/ai-automation-development", priority: "0.95", changefreq: "weekly" },
    { path: "/saas-development", priority: "0.95", changefreq: "weekly" },
    { path: "/mobile-app-development", priority: "0.95", changefreq: "weekly" },
    { path: "/custom-software-development", priority: "0.95", changefreq: "weekly" },
    { path: "/web-development-company", priority: "0.95", changefreq: "weekly" },
    { path: "/mvp-development", priority: "0.95", changefreq: "weekly" },
    { path: "/startup-software-development", priority: "0.95", changefreq: "weekly" },
    { path: "/ui-ux-design", priority: "0.95", changefreq: "weekly" },
    // Engineering Authority & Hubs (0.85 - 0.90)
    { path: "/docs", priority: "0.85", changefreq: "weekly" },
    { path: "/architecture", priority: "0.85", changefreq: "weekly" },
    { path: "/playbooks", priority: "0.85", changefreq: "weekly" },
    { path: "/integrations", priority: "0.85", changefreq: "weekly" },
    { path: "/best-practices", priority: "0.85", changefreq: "weekly" },
    { path: "/procurement", priority: "0.85", changefreq: "weekly" },
    { path: "/developers", priority: "0.80", changefreq: "weekly" },
    // Tools & Articles (0.80)
    { path: "/tools/ai-roi-calculator", priority: "0.80", changefreq: "monthly" },
    { path: "/tools/saas-cost-estimator", priority: "0.80", changefreq: "monthly" },
    { path: "/articles", priority: "0.80", changefreq: "weekly" },
    { path: "/articles/single-agent-vs-multi-agent-architectures", priority: "0.80", changefreq: "monthly" },
    // EEAT & Trust Pages (0.60)
    { path: "/trust/editorial-policy", priority: "0.60", changefreq: "monthly" },
    { path: "/trust/security-policy", priority: "0.60", changefreq: "monthly" },
    { path: "/trust/engineering-standards", priority: "0.60", changefreq: "monthly" },
    { path: "/contact", priority: "0.70", changefreq: "monthly" },
    { path: "/start-project", priority: "0.75", changefreq: "monthly" },
];
function generateSitemapXML(routeList) {
    const xmlEntries = routeList
        .map((r) => `  <url>
    <loc>${domain}${r.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`)
        .join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}
export function writeSitemapToPublic() {
    const xmlContent = generateSitemapXML(routes);
    const publicDir = path.resolve(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }
    const outputPath = path.join(publicDir, "sitemap.xml");
    fs.writeFileSync(outputPath, xmlContent, "utf-8");
    console.log(`✓ Generated sitemap.xml with ${routes.length} routes at ${outputPath}`);
}
writeSitemapToPublic();
