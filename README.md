# Queryable Encryption + Azure KMS + Automatic Encryption(Atlas)

### Install
To learn what you must install to use Queryable Encryption, see below

### What You Need
Before you can use Queryable Encryption, you must set up the following items in your development environment:

- Download the Automatic Encryption Shared Library (recommended) or mongocryptd properly configured/setup
- Install a MongoDB Driver Compatible with Queryable Encryption
- Atlas Cluster running MongoDB 6.2
- Install specific driver dependencies.

### You can set up Queryable Encryption using the following mechanisms:
- Automatic Encryption: Enables you to perform encrypted read and write operations without you having to write code to specify how to encrypt fields.
- Explicit Encryption: Enables you to perform encrypted read and write operations through your MongoDB driver's encryption library. You must specify the logic for encryption with this library throughout your application.

Today we will be focusing on Automatic Encryption using MongoDB Atlas. But before, lets talk a little bit about Envelope Encryption - which is what Client Side Field Level Encryption works.

# Envelope Encryption
An analogy that helped me understand this was - think of a "Lockbox".
![alt text](https://ae01.alicdn.com/kf/H9e2485b079db4fe2abe2d8b5a7884a7bO/Key-Lock-Box-Combination-Lockbox-with-Code-for-House-Key-Storage-Combo-Door-Locker.jpg_.webp "Title")

We will have a Customer Master Key (CMK) - which in our analogy will be the combination to the lockbox itself.
And with this CMK, we will protect the "keys inside".

The "keys inside" are going to be called the Data Encryption Keys (DEK). These are the keys that will be used to actually encrypt/decrypt the fields. And access to them will be protected by the CMK.

## Encrypt
![alt text](https://rockelitix-ituwr.mongodbstitch.com/imageedit_4_9354567901.png "Title")

## Decrypt
![alt text](https://rockelitix-ituwr.mongodbstitch.com/imageedit_5_5000319473.png "Title")



# Automatic Encryption/Decryption
Automatic encryption essentially fetches the keys from the keyvault automatically and lets you get straight to encrypting/decrypting.
To encrypt/decrypt your fields automatically, you must configure your MongoClient instance as follows:
- Specify your Key Vault collection
- Specify a kmsProviders object

# Writing an Encrypted Field
![alt text](https://www.mongodb.com/docs/manual/images/CSFLE_Write_Encrypted_Data.png "Title")

# Reading an Encrypted Field
![alt text](https://www.mongodb.com/docs/manual/images/CSFLE_Read_Encrypted_Data.png "Title")

# Now for the good stuff. Let's see some code in action!
