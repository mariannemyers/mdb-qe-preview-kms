# Queryable Encryption + AWS KMS + Automatic Encryption(Atlas)

### What You Need
Before you can use Queryable Encryption, you must set up the following items in your development environment:

- Download the Automatic Encryption Shared Library (recommended) or mongocryptd properly configured/setup
- Install a MongoDB Driver Compatible with Queryable Encryption
- Atlas Cluster running MongoDB 6.2
- Install specific driver dependencies.
- AWS KMS + AWS IAM User with in-line privileges (which will be our "master key")

### For this tutorial/demo, need to have mongocryptd or the shared_lib properly configured. This is a critical step
https://www.mongodb.com/docs/manual/core/queryable-encryption/reference/shared-library
https://www.mongodb.com/docs/manual/core/queryable-encryption/reference/mongocryptd/

### You can set up Queryable Encryption using the following mechanisms:
- Automatic Encryption: Enables you to perform encrypted read and write operations without you having to write code to specify how to encrypt fields.
- Explicit Encryption: Enables you to perform encrypted read and write operations through your MongoDB driver's encryption library. You must specify the logic for encryption with this library throughout your application.

Today we will be focusing on Automatic Encryption using MongoDB Atlas. But before, lets talk a little bit about Envelope Encryption - which is what Queryable Encryption uses under the hood.

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

## Encrypted Collection for Queryable Encryption
## First, we need to create our keyVault and our DEKs
![alt text](https://rockelitix-ituwr.mongodbstitch.com/step0-qe.png "Title")
## Then, we can use the keyVault and DEKs to create an encrypted collection, and include details about what fields will be encrypted as well as what query_types will be supported for those fields.
![alt text](https://rockelitix-ituwr.mongodbstitch.com/step1-qe.png "Title")

## After the encrypted collection is set up, it is now ready to be used

# Setup your encrypted client with your KMS configuration and autoencrypt settings, and you're good to go.
![alt text](https://rockelitix-ituwr.mongodbstitch.com/cryptoclient.png "Title")

# For the code to work, you will need to update your credentials
![alt text](https://rockelitix-ituwr.mongodbstitch.com/azure.png "Title")

# You can use these credentials to set up In-Use Encryption from Compass by setting up these Advanced Connection Settings

![alt text](https://rockelitix-ituwr.mongodbstitch.com/compass.png "Title")

# Key Rotation
## Update your CMK using Azure KMS. Get the new key version. Login to your mongoshell (mongosh). And call KeyVault.rewrapManyDataKey() with the new Key Version. This method Decrypts multiple Data Encryption Keys (DEK) and re-encrypts them with a new Customer Master Key (CMK).
![alt text](https://rockelitix-ituwr.mongodbstitch.com/keyrotate.png "Title")

# Reference links

https://github.com/mongodb/specifications/blob/ed45dc95ca174a5832d653adec5a842184b7a82f/source/client-side-encryption/client-side-encryption.rst#masterkey

https://www.mongodb.com/docs/manual/reference/method/KeyVault.rewrapManyDataKey/

Key Management Best Practices

https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final

https://csrc.nist.gov/publications/detail/sp/800-57-part-2/rev-1/final

https://csrc.nist.gov/publications/detail/sp/800-57-part-3/rev-1/final



# Credits
https://github.com/mongodb-university/docs-in-use-encryption-examples

is where I got most of the source code. I just modified a few things

# Code Setup: NODE
- ` cd node `
- `npm i`
- `node make_data_key.js` which sets up the encrypted collection with the supported queries and kms config
- `node insert_encrypted_document.js`

# Code Setup: JAVA (required maven installed)
- `cd java`
- `mvn clean compile`
- `mvn compile exec:java -Dexec.mainClass="com.mongodb.qe.MakeDataKey" -Dexec.cleanupDaemonThreads=false`
- `mvn compile exec:java -Dexec.mainClass="com.mongodb.qe.InsertEncryptedDocument" -Dexec.cleanupDaemonThreads=false`
