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
# Submitting a PR
The initial comment has instructions. For your PR to be considered, you must select a template, include details, and make the appropriate selections from the checkboxes provided.

1. Select the preview tab.
2. Select the applicable template. This replaces the comment with the correct placeholder text.

![Submit PR Step 1](https://github.com/near/wallet-selector/blob/main/images/submit_PR_step_1.png)
![Submit PR Step 2](https://github.com/near/wallet-selector/blob/main/images/submit_PR_step_2.png)

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

# Listing Criteria for Third Party Wallet on Wallet Selector

Criteria for Including New Wallets for Wallet Selector
# Wallet Product Criteria:

A wallet project must implement and comply with the following product criteria to be listed on the Wallet Selector:

1. Custody of account must be fully disclosed. In the case of 3rd party identity services, the wallet's onboarding information must include the use of custodial identity services.
2. Encryption passwords per session are allowed. You must inform the user that a) the password prompt is to encrypt local data and b) that the password expires at the end of the session.
3. Conformity to Wallet Standards: The wallet product conforms to NEAR NEP wallet standards;
   * Injected Wallet Standards - https://github.com/near/NEPs/pull/408
   * Bridged Wallet Standards - https://github.com/near/NEPs/pull/368
5. Ease of use: The wallet product provides a usable interface for the end users. Please provide a user guide.
6. Ability to recover accounts: The wallet product allows users to be able to recover accounts.
7. Actively maintained: The wallet is actively maintained by a team and can provide user support.

# Wallet Security Criteria:

A wallet project must have a significant portion of these security program features in place, and shall self-certify that they maintain a security program that is commensurate (sufficiently similar) or better than the elements of the program outlined below. A project may also certify that they have a significant program in place, but intend to enhance the program to a level commensurate with the program outlined below by a given date.

Wallets shall checkbox a statement of compliance to be maintained on the wallet’s GitHub account or Website. The statement may qualitatively discuss the security program and include additional elements, or simply state that it is compliant with the program outlined below. When asserting that open items will be in place within some time period of being listed, target dates shall be included and clearly defined. The overall statement must be dated and the date shall be commensurate with the commit date. All wallet projects must maintain compliance while being included in the wallet listing/selector program. If a wallet is no longer in compliance, or no longer supported, the security statement must reflect that change and the wallet selector team shall be notified. The wallet project shall make verification of the following requirements as easy as possible--maximizing transparency through the use of relevant links pointing toward program descriptions, audit reports, etc. for the user/researcher.


1. Has a security program in place that covers or is dedicated to the wallet and...

2. Publishes information about its security program in an easily findable place.

3. Conducts regular audits of wallet code, at regular intervals of less than a year or based on meaningful code changes.

4. Conducts regular penetration tests, both “authenticated” and “non-authenticated” upon significant code changes.

5. Conducts penetration tests on related infrastructure, such as databases, virtual machines, web servers, etc.

6. Remediates any critical, high, or medium findings from audits (3, 4, an 5 above) in a rapid fashion, as suggested by auditors.  Auditors should validate the remediation in their reports.

7. Makes such reports (audits, penetration tests) publicly available, on at least a summary level.

8. When making reports (7) available, wallet projects should ensure the equivalent reports appear on the security vendor’s site or simply links to the security vendor’s report. This ensures the authenticity of the audit reports.

9. Conducts operational readiness reviews and testing or an equivalent process before deployment to production to ensure that code changes have not resulted in unanticipated behavior, compatibility issues, or inclusion of vulnerabilities.

10. Maintains a testnet wallet, available to developers and security researchers.

11. Maintains a bug bounty program.

12. Implements minimal privilege and access policies with regard to supporting infrastructure.

13. Implements MFA and strong passwords for access to critical related systems, such as domain registration, hosting platforms, cloud platforms, etc.

14. Conducts known vulnerability and vulnerable dependency checks; and remediates critical, medium, and high findings before deploying to testnet or production.

15. If the wallet is a  browser “extension,” it is listed on the official extension marketplace.

16. Logs are collected from supporting infrastructure, web servers, etc.

17. Ensures that logs do not contain sensitive information, are encrypted at rest in storage, and have restricted access with least privilege.

18. Enables “audit logs” on related platforms (AWS, GCP, monitoring platforms, etc).

19. Logs shall be maintained for 90 days for forensic purposes.

20. Security feature shall be enabled in hosting environments, i.e. AWS GuardDuty.

21. Inputs shall be sanitized.

22. Code SAST scanning for vulnerabilities and vulnerable dependencies shall be conducted prior to production.

23. Vulnerability scanning shall be conducted regularly on websites, infrastructure-related VMs, etc.  Findings shall be quickly remediated.

24. Patch management shall be conducted frequently on supporting infrastructure.

25. VM and bare-metal infrastructure shall be protected by endpoint detection and response software.

26. An incident monitoring, alerting, and response program shall be in place.

27. Additional protective technologies, such as web application firewalls, should be put in place and appropriately configured to prevent attacks on the wallet.

28. White and black lists should be maintained for ip addresses and domains interacting with the wallet to the extent possible.

29. Reduction in attack surface shall be conducted by removing access to paths and unused ports; properly configuring domains, CSP, etc.

30. Access to infrastructure should be limited to VPNs or commensurate technology, IP restricted, etc. in order to prevent malicious access. For example, port 22 for the web server would not be accessible from the internet.

31. OWASP top 10 vulnerabilities shall be regularly tested and remediated.

32. Tools such as Nessus and Qualys, or similar should be used to scan for vulnerabilities.

33. Tools such as Burp Suite, or similar should be used to instrument and and analyze the interaction of the wallet with the browser for security issues.

34. Playbooks for public disclosure and communication to stakeholders and users should be prepared in advance and practiced via tabletop exercises in order to ensure rapid response and disclosure to protect such stakeholders and their assets.

35. An incident response retainer should be considered.

36. Wallet projects should clearly inform users of risks, risky behavior, best practices in the use of the wallet, and the most secure methods for using the wallet.

37. Wallet projects should have a clear path to reporting and receiving help on issues that is easily found by users.

38. Sensitive information should not be stored in the client-side wallet in a way that could be scraped from storage by malicious software, such as keys, recovery phrases, etc.

39. Encryption of sensitive data should likewise not rely on hard-coded keys or weak ciphers.

40. A user’s ability to recover their wallet under various circumstances should be clearly spelled out to the user when setting up the wallet.

41. Communication between infrastructure elements should be secured to the maximum extent possible.
    Please link to your the statement on your website or GitHub repo showing a statement of compliance. Please put link below (even if it is a placeholder).
