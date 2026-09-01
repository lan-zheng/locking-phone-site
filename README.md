# Locking Phone legal site

Static product, privacy, terms, paid-service, auto-renewal, and support pages prepared for App Store submission.

## Before deployment

1. Confirm that `support@logihope.com` can receive and send a test message. Verified on 2026-08-27.
2. Confirm the policy date.
3. Publish the whole directory on a public HTTPS host.
4. Use these public URLs in the app and App Store metadata:
   - `/privacy.html` — Privacy Policy
   - `/terms.html` — Terms of Use / User Agreement
   - `/membership.html` — Membership Service Agreement
   - `/auto-renewal.html` — Auto-Renewal Service Agreement
   - `/support.html` — Support
5. Update `CommercialConfiguration.swift` with those final public URLs.

No build step or server-side service is required.

## Recommended first-release hosting

Use GitHub Pages as the host and bind a custom product domain. The site remains
plain HTML/CSS/JavaScript, so it can later move to Cloudflare Pages or another
host without rewriting the pages.

1. Push this repository after checking that it contains no private material.
2. Open repository **Settings → Pages** and choose **GitHub Actions** as the source.
3. Open **Actions → Deploy Locking Phone website → Run workflow**.
4. Confirm that `/`, `/privacy.html`, `/terms.html`, `/membership.html`, `/auto-renewal.html`, and `/support.html` are publicly reachable by HTTPS.
5. Add the custom domain in repository Pages settings and configure its DNS.
6. Recheck HTTPS after DNS propagation; a `CNAME` file is not required for this Actions workflow.

The workflow is manual on purpose: pushing application code alone will not
publish or change the public website.
