# Security Policy

## Reporting a Vulnerability

Please report suspected security issues privately through the contact form on the
site, or directly to the project maintainers. Do not open a public issue with
exploit details.

## Outstanding manual action: newsletter double opt-in

The public signup forms (Join, Seed Membership, Mycelium Membership, Contact)
accept any email address that is typed into them. Nothing in this codebase can
prove that the person submitting the form owns the address they entered.

Before any bulk email is sent to the subscriber list, a confirmation ("double
opt-in") step must be enabled in the email-sending provider so that an address
submitted by a third party is never mailed until its owner confirms. This has to
be configured in the email provider account; it cannot be enforced from the
website code.

## Server-side protections currently enforced in the database

- Row level security is enabled on every table; there are no client-readable
  policies, so form submissions cannot be read back through the public API.
- The browser-facing roles hold INSERT only. UPDATE and DELETE are revoked, so
  submitted records cannot be edited or removed from the client.
- Membership records inserted from the client are pinned to the `pending` status
  and `community` tier, cannot be linked to another account id, and cannot carry
  billing or email-provider identifiers.
- Email addresses are normalised (lowercased and trimmed) and format-checked by
  the database, and every user-supplied text column has a length limit.
- Newsletter consent timestamps and unsubscribe state are set by the database,
  not by the submitting browser.
