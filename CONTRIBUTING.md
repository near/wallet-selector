# Contributing

This project is using an [NX](https://nx.dev) style [monorepository](https://monorepo.tools) that helps divide and map the project dependencies for each project.

The core modules are in the `packages` directory and the example apps are in the `examples` directory. In order to figure out the commands you need to run, you can use the `nx` command line tool.

> You can also use the infix notation to run a target:
 nx [target] [project] [options, ...]

On the other hand, if you want to run a specific command in a package, you can use the `nx run` command. There are a lot of things defined in every project's `project.json` file:

To run a target:    
```bash
yarn nx run [project][:target][:configuration] [options, ...]
yarn nx r [project][:target][:configuration] [options, ...]
```

In order to run a specific example, make sure you build the UI library beforehand and on each modification by running:

```bash
yarn build # build core package

yarn nx serve react # run the react example
yarn nx serve angular # run the angular example
```

Build and deploy react example

```bash
yarn nx build react # build the react example
yarn nx deploy react # deploys react example to gh-pages
```

# Listing Third Party Wallet on Wallet Selector

Criteria for Including New Wallets for Wallet Selector
# Product Criteria:

A wallet project must have comply the following product criteria to listed on Wallet Selector.

- Non-custodial: The user controls their fund.
- Conformity to Wallet Standards: The wallet product conforms to NEAR NEP wallet standards. (Injected Wallet https://github.com/near/NEPs/pull/370 and  Bridged Wallet https://github.com/near/NEPs/pull/368)
- Ease of use: The wallet product provides a usable interface for the end users. Please provide a user guide.
- Ability to recover accounts: The wallet product allows users to be able to recover accounts.
- Actively maintained: The wallet is actively maintained by a team and can provide user support. 

# Security Criteria:

A wallet project must have the majority of these security program features in place with self-certification that remaining items will be in place within 6 months of being listed.

Wallets shall checkbox a statement of compliance to be maintained on the wallet’s github account.  When asserting that open items will be in place within six months of being listed, target dates shall be included. The overall statement must be dates and the date shall be commensurate with the commit date.  All wallet projects must maintain compliance. If a wallet is no longer in compliance, or no longer supported, the security statement must reflect that change. The wallet project shall make verification of the following requirements as easy as possible maximizing transparency through the use of relevant links pointing toward program descriptions, audit reports, etc. for the user/researcher.

- Has a security program in place that covers or is dedicated to the wallet
- Publishes information about its security program in an easily findable place
- Conducts regular audits of wallet code, at regular intervals of less than a year or based on meaningful code changes
- Conducts regular penetration tests, both “authenticated” and “non-authenticated” upon significant code changes
- Conducts penetration tests on related infrastructure, such as databases, virtual machines, web servers, etc.
- Remediates any critical, high, or medium findings from audits (3, 4, an 5 above) and tests in a rapid fashion, as suggested by auditors and penetration testers–with auditors validating the remediation in their reports.
- Makes such reports (audits, penetration tests) publicly available, on at least a summary level
- When making reports (7) available, wallet projects should ensure the equivalent reports appear on the security vendor’s site or simply links to the security vendor’s report. This ensures the authenticity of the audit reports.
- Conducts operational readiness reviews and testing or an equivalent process before deployment to production to ensure that code changes have not resulted in unanticipated behavior, compatibility issues, or in
- Maintains a testnet wallet
- Maintains a bug bounty program
- Implements minimal privilege and access policies with regard to supporting infrastructure
- Implements MFA and strong passwords for access to critical related systems, such as domain registration, hosting platforms, cloud platforms, etc.
- Conducts known vulnerability and vulnerable dependency checks; and remediates critical, medium, and high findings before bringing into testnet or production.
- If the wallet is a  browser “extension,” it is listed on the official extension marketplace
