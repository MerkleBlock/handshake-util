const bech32 = require('bech32')
const blake2b = require('./blake2b.js')

/*
 * Constants
 */

const ZERO_KEY = Buffer.alloc(33, 0x00)

class KeyRing {
  /**
   * Create a key ring.
   * @constructor
   * @param {Object} options
   */

  constructor (privatekey) {
    this.publicKey = ZERO_KEY
    this.privateKey = privatekey
  }

  /**
   * Get private key.
   * @returns {Buffer} Private key.
   */

  getPrivateKey () {
    if (!this.privateKey) { return null }

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
    if (!this._keyHash) { this._keyHash = blake2b.digest(this.publicKey, 20) }

    return this._keyHash
  }

  /**
   * Get pubkeyhash address.
   * @returns {Address}
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
   * @returns {Address}
   */

  getAddress () {
    return this.getKeyAddress()
  }

  /**
   * Inject data from public key.
   * @private
   * @param {Buffer} key
   */

  fromPublic (key) {
    this.publicKey = key
    return this
  }

  /**
   * Instantiate keyring from a public key.
   * @param {Buffer} publicKey
   * @returns {KeyRing}
   */

  static fromPublic (key) {
    return new this().fromPublic(key)
  }
}

exports.KeyRing = KeyRing
