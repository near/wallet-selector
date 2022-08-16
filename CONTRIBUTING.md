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

In order to run a specific example, make sure you build the packages beforehand by running:

```bash
yarn build:all # builds all packages

yarn nx serve react # run the react example
yarn nx serve angular # run the angular example
```

> Note: [`modal-ui`](/packages/modal-ui) package must be re-build after every change in the source files of this package `yarn nx run modal-ui:build`


Build and deploy angular example

```bash
yarn nx build angular # build the angular example
yarn nx deploy angular # deploys angular example to gh-pages
```


# Branching

In this project there are two important branches `main` and `dev` branch. Pushing or committing directly in these two branches is forbidden.

### Main branch

This is the default branch and will be equal the latest official release.

### Dev Branch

This is the branch for development used by the team and/or other contributors from the community.
New features, fixes and other improvements are first implemented and tested in this
branch.
When adding new features/fixes team members must always create a new branch locally based on latest changes of `dev` branch.
When your work is ready a merge request should be opened from your branch to `dev`. When your PR is reviewed and approved then it can be merged.

### Other branches

Except `main` and `dev` branch other branches are work in progress by the team or related to the open PR(s).

# Release Process

Once the planned work has been finished and the set date has arrived a merge request from `dev` to `main` should be made.
After merging only two steps remain:</br>
 - Publish packages to NPM.
 - Draft release in Github.

Since `main` is the default branch of this project in case of regular release it will be always equal to the latest release.</br> In case of a `pre-release`  a specific branch will be linked to the `pre-release` version(tag).

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
