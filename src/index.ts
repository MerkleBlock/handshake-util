import bech32 from 'bech32'
import blake2b from 'blake2b'
import { Buffer } from 'buffer'

/*
 * Constants
 */
const ZERO_KEY = Buffer.alloc(33, 0x00)

export class KeyRing {
  publicKey: Buffer
  privateKey?: Buffer

  _keyHash?: Uint8Array
  _keyAddress?: string

  /**
    * Create a key ring.
    * @constructor
    * @param {Buffer} privateKey
    */
  constructor (privateKey?: Buffer) {
    this.publicKey = ZERO_KEY
    this.privateKey = privateKey
  }

  /**
    * Get private key.
    * @returns {Buffer} Private key.
    */
  getPrivateKey () {
    if (this.privateKey == null) {
      return null
    }

    return this.privateKey
  }

  /**
    * Get public key.
    * @returns {Buffer}
    */
  getPublicKey () {
    return this.publicKey
  }

  /**
    * Get public key hash.
    * @returns {Buffer}
    */
  getKeyHash () {
    if (this._keyHash == null) {
      // this._keyHash = blake2b.digest(this.publicKey, 20)
      this._keyHash = blake2b(20).update(this.publicKey).digest()
    }

    return this._keyHash
  }

  /**
    * Get pubkeyhash address.
    * @returns {string}
    */
  getKeyAddress () {
    if (!this._keyAddress) {
      const hash = this.getKeyHash()
      const words = bech32.toWords(hash)
      words.unshift(0)
      this._keyAddress = bech32.encode('hs', words)
    }

    return this._keyAddress
  }

  /**
    * Get hash.
    * @returns {Buffer}
    */
  getHash () {
    return this.getKeyHash()
  }

  /**
    * Get base58 address.
    * @returns {string}
    */
  getAddress (): string {
    return this.getKeyAddress()
  }

  /**
    * Inject data from public key.
    * @param {Buffer} key
    * @returns {KeyRing}
    */
  private fromPublic (key: Buffer) {
    this.publicKey = key
    return this
  }

  /**
    * Instantiate keyring from a public key.
    * @param {Buffer} publicKey
    * @returns {KeyRing}
    */
  static fromPublic (publicKey: Buffer): KeyRing {
    return new this().fromPublic(publicKey)
  }
}
