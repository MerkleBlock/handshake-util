import { Buffer } from 'buffer';
export declare class KeyRing {
    publicKey: Buffer;
    privateKey?: Buffer;
    _keyHash?: Uint8Array;
    _keyAddress?: string;
    /**
      * Create a key ring.
      * @constructor
      * @param {Buffer} privateKey
      */
    constructor(privateKey?: Buffer);
    /**
      * Get private key.
      * @returns {Buffer} Private key.
      */
    getPrivateKey(): Buffer | null;
    /**
      * Get public key.
      * @returns {Buffer}
      */
    getPublicKey(): Buffer;
    /**
      * Get public key hash.
      * @returns {Buffer}
      */
    getKeyHash(): Uint8Array;
    /**
      * Get pubkeyhash address.
      * @returns {string}
      */
    getKeyAddress(): string;
    /**
      * Get hash.
      * @returns {Buffer}
      */
    getHash(): Uint8Array;
    /**
      * Get base58 address.
      * @returns {string}
      */
    getAddress(): string;
    /**
      * Inject data from public key.
      * @param {Buffer} key
      * @returns {KeyRing}
      */
    private fromPublic;
    /**
      * Instantiate keyring from a public key.
      * @param {Buffer} publicKey
      * @returns {KeyRing}
      */
    static fromPublic(publicKey: Buffer): KeyRing;
}
