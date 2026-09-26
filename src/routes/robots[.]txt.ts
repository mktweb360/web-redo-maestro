import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";

// Rastreo abierto para buscadores y asistentes de IA (GEO): el grupo * incluye
// GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, etc.
// /propuesta lleva noindex (debe poder rastrearse para verlo); el PDF se bloquea.
const body = `User-agent: *
Allow: /
Disallow: /pingolino-propuesta-rediseno.pdf

Sitemap: ${SITE_URL}/sitemap.xml
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
