# Google Tag Manager & Search Console – Setup and Verification

## What These Are

- **Google Tag Manager (GTM)** – Loads and manages tracking tags (Analytics, ads, etc.) from one place without editing code each time. Your site uses container ID **GTM-MSG7SZGW**.
- **Google Search Console** – Lets you see how Google indexes your site (pages, queries, errors) and verify you own jashom.com.

---

## 1. Google Tag Manager – Verify It’s Working

### In your site code (already done)
- **Head:** The GTM script is at the top of `<head>` in `index.html` with ID `GTM-MSG7SZGW`.
- **Body:** The GTM noscript iframe is right after the opening `<body>` tag (for users with JavaScript disabled).

### How to check GTM

1. **Preview in GTM**
   - Go to [Google Tag Manager](https://tagmanager.google.com/) and open your container (GTM-MSG7SZGW).
   - Click **Preview**, enter your live URL (e.g. `https://www.jashom.com`) and connect.
   - Your site opens in a new tab with the GTM debug panel. Confirm “Container Loaded” and that your tags fire as expected.

2. **Browser DevTools**
   - Open your live site (e.g. https://www.jashom.com).
   - Press **F12** → **Network** tab.
   - Reload the page.
   - Filter by “gtm” or “googletagmanager”. You should see requests to `googletagmanager.com/gtm.js?id=GTM-MSG7SZGW` and `ns.html?id=GTM-MSG7SZGW`.

3. **View page source**
   - On the live site: right‑click → **View Page Source**.
   - Search for `GTM-MSG7SZGW`. You should see it in:
     - The script in `<head>`
     - The noscript iframe right after `<body>`.

---

## 2. Google Search Console – Verification

You can verify using **HTML meta tag** (already in your site) or **DNS TXT record**.

### Option A: HTML meta tag (already in place)
- In `index.html` you have:
  ```html
  <meta name="google-site-verification" content="7s-g7AA6QgoODcEvc9ckmwyQhuqQ1l-ZAw9F0JQyyDQ" />
  ```
- After deploying, in Search Console choose **HTML tag** and click **Verify**. No DNS changes needed.

### Option B: DNS TXT record (if you prefer or if HTML fails)
1. In your domain registrar or DNS host (e.g. Cloudflare, GoDaddy, Namecheap) open DNS settings for **jashom.com**.
2. Add a **TXT** record:
   - **Name/Host:** `@` (or leave blank for root domain, depending on provider).
   - **Value:**  
     `google-site-verification=7s-g7AA6QgoODcEvc9ckmwyQhuqQ1l-ZAw9F0JQyyDQ`
3. Save. DNS can take from a few minutes up to 24–48 hours to propagate.
4. In [Google Search Console](https://search.google.com/search-console), choose **Domain** property and **Verify** using the **DNS** method.

### How to check Search Console verification

1. Go to [Search Console](https://search.google.com/search-console).
2. Select the property (e.g. `https://www.jashom.com` or `jashom.com`).
3. If verified, the dashboard loads and you see **URL Inspection**, **Sitemaps**, **Performance**, etc.
4. **URL Inspection:** Enter `https://www.jashom.com` and click **Test live URL** to see if Google can fetch the page and the verification meta tag.

### Check the meta tag on the live site
- Open https://www.jashom.com → right‑click → **View Page Source**.
- Search for `google-site-verification`. You should see the meta tag with content `7s-g7AA6QgoODcEvc9ckmwyQhuqQ1l-ZAw9F0JQyyDQ`.

---

## Quick checklist

| Item | Where to check |
|------|----------------|
| GTM script in `<head>` | View source → search `GTM-MSG7SZGW` |
| GTM noscript after `<body>` | View source → first thing after `<body>` |
| GTM loading in browser | F12 → Network → filter “gtm” |
| GTM tags firing | GTM → Preview → open live URL |
| Search Console meta tag | View source → search `google-site-verification` |
| Search Console verified | search.google.com/search-console → property loads |
| DNS TXT (if used) | Your DNS provider’s DNS records for jashom.com |

After changing `index.html`, **rebuild and redeploy** the site so the live pages use the new GTM ID and the verification meta tag.
