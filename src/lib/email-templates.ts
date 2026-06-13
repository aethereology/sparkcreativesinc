/**
 * Branded transactional email templates — SparkCreatives Inc.
 *
 * One shared, table-based shell plus per-email content. Email clients only
 * reliably honor INLINE styles and table layout, so everything here is inline
 * and uses nested tables (no flexbox/grid, no <style> reliance, no SVG — Gmail
 * strips SVG and external CSS). Light-mode only: dark-mode email rendering is
 * inconsistent across clients, so we ship one warm, legible design.
 *
 * Each template returns { subject, html, text } so callers always send an
 * HTML + plain-text pair (better deliverability + accessibility).
 *
 * Palette is hardcoded from the site tokens (globals.css) — CSS vars don't
 * resolve in email:
 *   paper #fdfbf7 · ink #1a1410 · ink-soft #4a4038 · ember/primary #c2410c
 *   teal/accent #0f766e · border #ece3da
 */
import { org } from "@/content/org";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? org.url;

// Brand palette (hardcoded — CSS vars are unavailable in email clients).
const C = {
  paper: "#fdfbf7",
  wrap: "#f3ede3", // slightly darker warm wrap behind the 600px card
  ink: "#1a1410",
  inkSoft: "#4a4038",
  inkFaint: "#6b6155",
  ember: "#c2410c",
  emberSoft: "#fbe9df", // tinted ember background for boxes/badges
  teal: "#0f766e",
  border: "#ece3da",
  white: "#ffffff",
} as const;

const FONT_SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
// Fraunces (the site display face) won't load in email; Georgia is the closest
// web-safe serif and reads as the same warm, editorial voice.
const FONT_SERIF = "Georgia, 'Times New Roman', Times, serif";

export type RenderedEmail = { subject: string; html: string; text: string };

/** Escape user-supplied text before interpolating into HTML. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Convert plain user text to HTML with line breaks preserved (after escaping). */
function escMultiline(value: string): string {
  return esc(value).replace(/\r?\n/g, "<br />");
}

function todayLong(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * The shared shell. Wraps body HTML (a string of table rows / blocks) in the
 * branded header + footer. `preheader` is the hidden inbox-preview snippet.
 */
function renderEmail(opts: { preheader: string; bodyHtml: string }): string {
  const { preheader, bodyHtml } = opts;
  const addr = org.address;
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light" />
<title>${esc(org.name)}</title>
</head>
<body style="margin:0; padding:0; width:100%; background-color:${C.wrap}; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">
<div style="display:none; font-size:1px; color:${C.wrap}; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">${esc(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.wrap};">
<tr>
<td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; margin:0 auto;">

<!-- Header / wordmark -->
<tr>
<td style="padding:8px 8px 20px 8px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="vertical-align:middle; padding-right:9px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td width="14" height="14" style="width:14px; height:14px; background-color:${C.teal}; border-radius:50%; font-size:0; line-height:0;">&nbsp;</td>
</tr></table>
</td>
<td style="vertical-align:middle; font-family:${FONT_SERIF}; font-size:22px; font-weight:bold; letter-spacing:-0.3px; color:${C.ink};">Spark<span style="color:${C.ember};">Creatives</span></td>
</tr>
</table>
</td>
</tr>

<!-- Card -->
<tr>
<td style="background-color:${C.paper}; border:1px solid ${C.border}; border-radius:16px; padding:36px 36px 32px 36px;">
${bodyHtml}
</td>
</tr>

<!-- Footer -->
<tr>
<td style="padding:24px 16px 8px 16px;">
<p style="margin:0 0 6px 0; font-family:${FONT_SANS}; font-size:13px; line-height:1.5; color:${C.inkFaint};">
<strong style="color:${C.inkSoft};">${esc(org.name)}</strong> &middot; ${esc(addr.street)}, ${esc(addr.city)}, ${esc(addr.region)} ${esc(addr.postalCode)}
</p>
<p style="margin:0 0 6px 0; font-family:${FONT_SANS}; font-size:13px; line-height:1.5; color:${C.inkFaint};">
${esc(org.legalStatus)} &middot; EIN ${esc(org.ein)}
</p>
<p style="margin:0; font-family:${FONT_SANS}; font-size:13px; line-height:1.5; color:${C.inkFaint};">
<a href="mailto:${esc(org.email)}" style="color:${C.teal}; text-decoration:none;">${esc(org.email)}</a>
&middot;
<a href="${esc(SITE_URL)}" style="color:${C.teal}; text-decoration:none;">${esc(SITE_URL.replace(/^https?:\/\//, ""))}</a>
</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>`;
}

/** A primary (ember) button. Uses padding + inline color for client support. */
function button(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 4px 0;"><tr>
<td style="border-radius:10px; background-color:${C.ember};">
<a href="${esc(href)}" style="display:inline-block; padding:13px 26px; font-family:${FONT_SANS}; font-size:15px; font-weight:bold; color:${C.white}; text-decoration:none; border-radius:10px;">${esc(label)}</a>
</td>
</tr></table>`;
}

function heading(text: string): string {
  return `<h1 style="margin:0 0 16px 0; font-family:${FONT_SERIF}; font-size:26px; line-height:1.25; font-weight:bold; color:${C.ink};">${esc(text)}</h1>`;
}

function paragraph(html: string): string {
  return `<p style="margin:0 0 16px 0; font-family:${FONT_SANS}; font-size:15px; line-height:1.65; color:${C.inkSoft};">${html}</p>`;
}

/** A small definition table used for receipt details / inquiry fields. */
function detailRows(rows: Array<{ label: string; value: string }>): string {
  const cells = rows
    .map(
      (r, i) => `<tr>
<td style="padding:${i === 0 ? "0" : "10px"} 16px 10px 0; font-family:${FONT_SANS}; font-size:13px; color:${C.inkFaint}; vertical-align:top; white-space:nowrap;">${esc(r.label)}</td>
<td style="padding:${i === 0 ? "0" : "10px"} 0 10px 0; font-family:${FONT_SANS}; font-size:15px; color:${C.ink}; vertical-align:top; font-weight:600;">${r.value}</td>
</tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${cells}</table>`;
}

/** A tinted box wrapper (used for the receipt summary + quoted message). */
function box(innerHtml: string, opts?: { tint?: boolean }): string {
  const bg = opts?.tint ? C.emberSoft : C.white;
  const border = opts?.tint ? "transparent" : C.border;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 20px 0;"><tr>
<td style="background-color:${bg}; border:1px solid ${border}; border-radius:12px; padding:20px 22px;">${innerHtml}</td>
</tr></table>`;
}

const TAGLINE = "Your support helps turn surplus into opportunity.";

// ----------------------------------------------------------------------------
// Template 1 — Donor receipt (donor-facing)
// ----------------------------------------------------------------------------

export function renderDonationReceipt(input: {
  amount: string;
  designation: string;
  date?: string;
}): RenderedEmail {
  const date = input.date ?? todayLong();
  const subject = `Your donation receipt — ${org.name}`;

  const bodyHtml = `
${heading("Thank you for your gift.")}
${paragraph(`Your generosity makes our work possible. Here is your receipt for your records — please keep it for tax purposes.`)}
${box(
  detailRows([
    { label: "Amount", value: `<span style="color:${C.ember};">${esc(input.amount)}</span>` },
    { label: "Designation", value: esc(input.designation) },
    { label: "Date", value: esc(date) },
    { label: "Organization", value: esc(org.name) },
    { label: "EIN", value: esc(org.ein) },
  ]),
  { tint: true },
)}
${paragraph(`<em style="color:${C.inkFaint};">${esc(TAGLINE)}</em>`)}
${paragraph(
  `${esc(org.name)} is a ${esc(org.legalStatus)} (EIN ${esc(org.ein)}). Donations are tax-deductible to the extent allowed by law. No goods or services were provided in exchange for this contribution.`,
)}
${button(SITE_URL, "See your impact")}
`;

  const text = [
    `Thank you for your gift of ${input.amount} to ${org.name}.`,
    ``,
    `Amount: ${input.amount}`,
    `Designation: ${input.designation}`,
    `Date: ${date}`,
    `Organization: ${org.name}`,
    `EIN: ${org.ein}`,
    ``,
    TAGLINE,
    ``,
    `${org.name} is a ${org.legalStatus} (EIN ${org.ein}). Donations are tax-deductible to the extent allowed by law. No goods or services were provided in exchange for this contribution. Please keep this receipt for your tax records.`,
    ``,
    org.email,
    SITE_URL,
  ].join("\n");

  return { subject, html: renderEmail({ preheader: `Your donation receipt from ${org.name}.`, bodyHtml }), text };
}

// ----------------------------------------------------------------------------
// Template 2 — Contact auto-reply (inquirer-facing, NEW)
// ----------------------------------------------------------------------------

/** Map an inquiry type to a friendly mid-sentence phrase. */
function inquiryTopicPhrase(inquiryType: string): string {
  const map: Record<string, string> = {
    Donation: "your donation inquiry",
    Volunteer: "volunteering with us",
    Partnership: "a possible partnership",
    "Host a Spark Lab": "hosting a Spark Lab",
    "Donate goods": "donating goods",
    General: "your message",
  };
  return map[inquiryType] ?? "your message";
}

export function renderContactAutoReply(input: {
  name: string;
  inquiryType: string;
  message: string;
}): RenderedEmail {
  const firstName = input.name.trim().split(/\s+/)[0] || "there";
  const topic = inquiryTopicPhrase(input.inquiryType);
  const subject = `Thanks for reaching out to ${org.name}`;

  const bodyHtml = `
${heading(`Thanks for reaching out, ${firstName}.`)}
${paragraph(`We received your message about <strong style="color:${C.ink};">${esc(topic)}</strong> and a member of our team will get back to you soon.`)}
${paragraph(`Here's a copy of what you sent us:`)}
${box(`<p style="margin:0; font-family:${FONT_SANS}; font-size:15px; line-height:1.65; color:${C.inkSoft};">${escMultiline(input.message)}</p>`)}
${paragraph(`<em style="color:${C.inkFaint};">${esc(TAGLINE)}</em>`)}
${paragraph(`While you wait, you're welcome to explore our programs and the work your support makes possible.`)}
${button(SITE_URL, "Explore our work")}
`;

  const text = [
    `Thanks for reaching out, ${firstName}.`,
    ``,
    `We received your message about ${topic} and a member of our team will get back to you soon.`,
    ``,
    `Here's a copy of what you sent us:`,
    `"${input.message}"`,
    ``,
    TAGLINE,
    ``,
    `Explore our work: ${SITE_URL}`,
    ``,
    `${org.name} · ${org.email}`,
  ].join("\n");

  return {
    subject,
    html: renderEmail({ preheader: `We got your message and will be in touch soon.`, bodyHtml }),
    text,
  };
}

// ----------------------------------------------------------------------------
// Template 3 — Team notification (internal)
// ----------------------------------------------------------------------------

export function renderContactNotification(input: {
  name: string;
  email: string;
  organization?: string;
  inquiryType: string;
  message: string;
}): RenderedEmail {
  const subject = `New ${input.inquiryType} inquiry from ${input.name}`;
  const submitted = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const rows: Array<{ label: string; value: string }> = [
    { label: "Name", value: esc(input.name) },
    {
      label: "Email",
      value: `<a href="mailto:${esc(input.email)}" style="color:${C.teal}; text-decoration:none;">${esc(input.email)}</a>`,
    },
  ];
  if (input.organization) rows.push({ label: "Organization", value: esc(input.organization) });
  rows.push({ label: "Type", value: esc(input.inquiryType) });
  rows.push({ label: "Submitted", value: esc(submitted) });

  const bodyHtml = `
${heading(`New ${input.inquiryType} inquiry`)}
${box(detailRows(rows), { tint: true })}
<p style="margin:0 0 8px 0; font-family:${FONT_SANS}; font-size:13px; color:${C.inkFaint};">Message</p>
${box(`<p style="margin:0; font-family:${FONT_SANS}; font-size:15px; line-height:1.65; color:${C.inkSoft};">${escMultiline(input.message)}</p>`)}
${button(`mailto:${input.email}?subject=${encodeURIComponent(`Re: your ${input.inquiryType} inquiry`)}`, `Reply to ${input.name.split(/\s+/)[0]}`)}
`;

  const text = [
    `New ${input.inquiryType} inquiry`,
    ``,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.organization ? `Organization: ${input.organization}` : null,
    `Type: ${input.inquiryType}`,
    `Submitted: ${submitted}`,
    ``,
    `Message:`,
    input.message,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject,
    html: renderEmail({ preheader: `New ${input.inquiryType} inquiry from ${input.name}.`, bodyHtml }),
    text,
  };
}
