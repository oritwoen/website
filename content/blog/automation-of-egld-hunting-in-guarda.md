---
title: "Automation of EGLD hunting in Guarda!"
description: "Guarda ran a puzzle hunt to celebrate Elrond listing — 3 EGLD hidden behind fill-in-the-blank mnemonics. Instead of solving them by hand I brute-forced the BIP39 wordlist."
date: 2022-08-13
image:
  src: /images/blog/egld-hunting/cover.png
badge:
  label: crypto
authors:
  - name: oritwoen
    to: https://github.com/oritwoen
    avatar:
      src: https://github.com/oritwoen.png
---

![Automation of EGLD hunting in Guarda — cover](/images/blog/egld-hunting/cover.png)

> Originally published on [paragraph.com/@oritwoen](https://paragraph.com/@oritwoen/automation-of-egld-hunting-in-guarda).

Literally a few hours ago I came across a very nice action organized by [Guarda](https://grd.to/ref/eo4b).

On their platform, they added support for a new blockchain, which is Elrond, and decided to give away 3 ELGDs for simply finding boxes and solving puzzles.

So I took action of course. I have a problem solving puzzles so I started to wonder how I can automate the process so that everything is done for me.

Many people will think that this is quite a complication and exaggerated. However, I saw an opportunity to learn and find a solution that is unique.

_If you want, you can look directly at the repository. However, I recommend reading my adventure!_

[https://github.com/0ri2N/egldHunter](https://github.com/0ri2N/egldHunter)

## A small plan was created:

- Finding all the puzzles on the website.
- Checking all possible combinations of a given mnemonic.
- Generate a private key for each combination.
- Generating a private address from the key.
- Checking the address on the blockchain.

## Riddles

### From that which comes within itself, it builds its table on my shelf

![know family culture begin bring human foam enter $xxx switch change mirror](/images/blog/egld-hunting/riddle-1.png)

know family culture begin bring human foam enter $xxx switch change mirror

[https://guarda.com/coins/elrond-wallet/?utm_medium=social&utm_source=twitter&utm_campaign=egld-hunt](https://guarda.com/coins/elrond-wallet/?utm_medium=social&utm_source=twitter&utm_campaign=egld-hunt)

### \_ \_ \_ \_ \_ for the Dwarf-lords in their halls of stone

![purity wire please better mixture antenna betray $xxx dutch hen traffic glow](/images/blog/egld-hunting/riddle-2.png)

purity wire please better mixture antenna betray $xxx dutch hen traffic glow

[https://guarda.com/buy-elrond/?utm_medium=social&utm_source=twitter&utm_campaign=egld-hunt](https://guarda.com/buy-elrond/?utm_medium=social&utm_source=twitter&utm_campaign=egld-hunt)

### She's a 10 but needs a crypto top up first

![battle brave come phone bachelor subway unknown media claw venture check $xxx](/images/blog/egld-hunting/riddle-3.png)

battle brave come phone bachelor subway unknown media claw venture check $xxx

[https://guarda.com/coins/?utm_medium=social&utm_source=twitter&utm_campaign=egld-hunt](https://guarda.com/coins/?utm_medium=social&utm_source=twitter&utm_campaign=egld-hunt)

## Coding

The time has come for coding and automation. It's 1am but that's okay. I feel like I have to finish this.

### Permutations

I did some research on GitHub and decided that the `bip39` library from `bitcoinjs` was perfect for checking all combinations.

[https://github.com/bitcoinjs/bip39](https://github.com/bitcoinjs/bip39)

```js
import bip from 'bip39';

const riddleSolver = (mnemonic) => {
  bip.wordlists.english.forEach(async (word) => {
    const mnemonicTest = mnemonic.replace('$word', word)
    const mnemonicValid = bip.validateMnemonic(mnemonicTest);

    if (mnemonicValid) {
       ...
    }
  })
}
```

_So I created the prototype for the code._

### Keys

Typically, each blockchain has an `SDK` in various forms. So I searched the `Elrond` documentation and found some snippets and a library that I need.

[https://github.com/ElrondNetwork/elrond-core-js](https://github.com/ElrondNetwork/elrond-core-js)

And then I updated the code to create private keys.

```js
import bip from 'bip39';
import core from "@elrondnetwork/elrond-core-js";

const riddleSolver = (mnemonic) => {
  bip.wordlists.english.forEach(async (word) => {
    const mnemonicTest = mnemonic.replace('$word', word)
    const mnemonicValid = bip.validateMnemonic(mnemonicTest);

    if (mnemonicValid) {
       let account = new core.account();
       await account.loadFromMnemonic(mnemonicTest)
       console.log(word, account.address())
    }
  })
}
```

## Final

The script works beautifully. Everything is as it should be. All the riddles were answered in seconds.

Unfortunately, someone beat me, and although I solved the puzzles in a quite unique way, at the time of getting the answer the balances on each account were zero.

Nevertheless, I had a lot of fun doing it and learned some new things.

Final code looks like this:

![Final code](/images/blog/egld-hunting/final-code.png)

And of course it's also available on GitHub:

[https://github.com/0ri2N/egldHunter](https://github.com/0ri2N/egldHunter)

_**Thanks for reading!**_
