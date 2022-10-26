"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyRing = void 0;
var bech32_1 = require("bech32");
var blake2b_1 = require("blake2b");
var buffer_1 = require("buffer");
/*
 * Constants
 */
var ZERO_KEY = buffer_1.Buffer.alloc(33, 0x00);
var KeyRing = /** @class */ (function () {
    /**
      * Create a key ring.
      * @constructor
      * @param {Buffer} privateKey
      */
    function KeyRing(privateKey) {
        this.publicKey = ZERO_KEY;
        this.privateKey = privateKey;
    }
    /**
      * Get private key.
      * @returns {Buffer} Private key.
      */
    KeyRing.prototype.getPrivateKey = function () {
        if (this.privateKey == null) {
            return null;
        }
        return this.privateKey;
    };
    /**
      * Get public key.
      * @returns {Buffer}
      */
    KeyRing.prototype.getPublicKey = function () {
        return this.publicKey;
    };
    /**
      * Get public key hash.
      * @returns {Buffer}
      */
    KeyRing.prototype.getKeyHash = function () {
        if (this._keyHash == null) {
            // this._keyHash = blake2b.digest(this.publicKey, 20)
            this._keyHash = (0, blake2b_1.default)(20).update(this.publicKey).digest();
        }
        return this._keyHash;
    };
    /**
      * Get pubkeyhash address.
      * @returns {string}
      */
    KeyRing.prototype.getKeyAddress = function () {
        if (!this._keyAddress) {
            var hash = this.getKeyHash();
            var words = bech32_1.default.toWords(hash);
            words.unshift(0);
            this._keyAddress = bech32_1.default.encode('hs', words);
        }
        return this._keyAddress;
    };
    /**
      * Get hash.
      * @returns {Buffer}
      */
    KeyRing.prototype.getHash = function () {
        return this.getKeyHash();
    };
    /**
      * Get base58 address.
      * @returns {string}
      */
    KeyRing.prototype.getAddress = function () {
        return this.getKeyAddress();
    };
    /**
      * Inject data from public key.
      * @param {Buffer} key
      * @returns {KeyRing}
      */
    KeyRing.prototype.fromPublic = function (key) {
        this.publicKey = key;
        return this;
    };
    /**
      * Instantiate keyring from a public key.
      * @param {Buffer} publicKey
      * @returns {KeyRing}
      */
    KeyRing.fromPublic = function (publicKey) {
        return new this().fromPublic(publicKey);
    };
    return KeyRing;
}());
exports.KeyRing = KeyRing;
