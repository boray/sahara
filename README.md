## Classary

Classary is a contact class and library lookup tool for Starknet. 

### Contract Classes and Libraries

Taking inspiration from object-oriented programming, StarkNet distinguishes between a contract and its implementation by separating contracts into classes and instances.

A contract class is the definition of the contract: Cairo byte code, hint information, entry point names, and everything that defines its semantics unambiguously. Each class is identified by its class hash, which is analogous to a class name in an object oriented programming language. A contract instance is a deployed contract corresponding to some class. Notice that only contract instances behave as contracts in that they have their own storage and can be called by transactions or other contracts.

A contract class does not necessarily have a deployed instance in StarkNet.

### Current Developer Experince 

Currently, a developer needs to use starknet-cli get_class_by_hash command in order to get json compilation file of the class contract. This json file is not easy to read. Also, finding a deployed contract's hash and lookup for the compilation file is a two-step process.

### How Classary Makes Experience Better

Classary parses given class hash and shows to the dev in a more easy-to-read way. 

