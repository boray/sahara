## Sahara

Sahara is a contact class and library lookup tool for Starknet. 

### Contract Classes and Libraries

Taking inspiration from object-oriented programming, StarkNet distinguishes between a contract and its implementation by separating contracts into classes and instances.

A contract class is the definition of the contract: Cairo byte code, hint information, entry point names, and everything that defines its semantics unambiguously. Each class is identified by its class hash, which is analogous to a class name in an object oriented programming language. A contract instance is a deployed contract corresponding to some class. Notice that only contract instances behave as contracts in that they have their own storage and can be called by transactions or other contracts.

A contract class does not necessarily have a deployed instance in StarkNet.

### Current Developer Experince 

Currently, a developer needs to use starknet-cli get_class_by_hash command in order to get json compilation file of the class contract. This json file is not easy to read. Also, finding a deployed contract's hash and lookup for the compilation file is a two-step process.

### How Sahara Improves The Developer Experience

Sahara parses the ABI of the class or library related to given class hash and visualizes the ABI to the dev. 

### History and Future of this project

Sahara is started in Starknet Paris Hackathon(2022). Shahar Papini has inspired me to do this project. Due to some unfortunate things I had at the hackathon time, I delivered only a static version of Sahara that represents the idea. 

This is a standalone project for now. However, integrating sahara into a starknet explorer seems to be a better path.

###TODO
- [ ] Prettier UI
- [ ] Error Handling
