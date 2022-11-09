The security of a wallet is based, in our view, on three key foundations:
- utilized technology
- conducted tests
- a team working on an app

**Technology:**

The technology highlighted as the first foundation should be understood not as a specific programming language, but as a structure used to safekeep the keys of private users. Some wallets keep the key data in local storage, which results in every website having access to them. Nightly’s approach to this topic is different - the key is stored in an encrypted version in Chrome Storage, which makes the data available only to the extension. Thanks to that, even if the user's computer is physically stolen, there is no way to reach the key data without knowing the user’s password that unlocks the wallet. In addition to that, the keys are decrypted only for a short moment of signing the transaction and immediately forgotten after that. We use the Ed25519 standard (the keys are Ed25519, encrypted by us with symmetrical encrypting) for encrypting our keys. Also, every network has separate private keys and an eventual leak doesn’t reveal other networks’ private keys. Still, every private key is generated from a single seed, so the user has to remember only one seed. 
An important factor increasing our wallet’s security is that we are constantly monitoring the way in which blockchains sign transactions. In order to do that, we do not use default packages, which makes us immune to attacks resulting from SDK’s vulnerability and we are preparing our own solutions for every blockchain. Our key-storing architecture is very similar to that which is used by Metamask - a dependable and safe solution. Nightly supports hardware wallets, such as Ledger as well, where it serves as a transaction making interface, which makes full protection against private keys’ leak possible. The key-keeping and signing module is independent of the rest of the application - thanks to that, even in case of finding some vulnerabilities in other sections of the code, gaining access to encrypted private keys and signing transactions is impossible. Nightly doesn’t allow mutation of the “sign” command so that an attack based on including other transaction in the place of a transaction desired by the user is also impossible. Our wallet doesn’t support “autosign” (it only allows autoconnection to verified websites), making asset theft by an app harder, because the user’s approval is needed for every transaction. The keys are a sole property of the user, stored only on the device instead of an online storage and there is no other way to reach them than using seed.

**Team:**

The application’s core is written by Norbert Bodziony, who has large experience in the field of cryptography and knowledge of rules of dealing with keys, resulting from his previous work in his other projects, such as Synthetify or Invariant. Aforementioned projects have been proven through audits to not have any vulnerabilities, and have not suffered any damage resulting from an attack. Norbert is also frequently engaging in other projects in the role of advisor. Besides him, there are people with at least a year of experience in building blockchain apps working on our project. Our company also has victories in hackathons under its belt, such as MoveCTF lately.

**Tests:**
Our app has been tested through various methods, including:
- Full tests
- End to end tests
- Simulation tests
- Visual tests
- Ledger connection tests
- In addition to these, every version goes through Quality Assurance procedure. Key modules have 100% coverage of their code - each and every one of the code lines is tested. Those tests are run automatically whenever there is a new version of the app.

