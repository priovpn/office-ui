/* eslint-disable no-useless-catch */
import { reactive } from "vue";
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import api, { getToken } from "@/api";
import consts from "@/consts";
import statusStore from "./status.store";
import { SHA512 } from "crypto-js";
import { client } from "@passwordless-id/webauthn";

export default reactive({
  token: getToken(),
  user: null,
  mnemonic: null,

  async fetch() {
    try {
      this.user = await api.auth.fetch();
    } catch (e) {
      statusStore.status = "issues";
      sessionStorage.removeItem(consts.tokenKey);
      localStorage.removeItem(consts.tokenKey);
      this.token = null;
    }

    return this.user;
  },

  async signInWithKey(rk, code = undefined, car = undefined) {
    // Validate key
    const isValid = bip39.validateMnemonic(rk, wordlist);
    if (!isValid)
      throw {
        code: "INVALID_KEY",
        message: "INVALID_KEY",
      };

    const seed = SHA512((await bip39.mnemonicToSeed(rk)).toString()).toString();
    console.log(seed);

    try {
      const data = await api.auth.signIn({ seed, code, car });

      if (data.success && data.token) {
        this.token = data.token;
        return true;
      }
    } catch (e) {
      throw e.response?.data
        ? {
            ...e.response.data,
            code: e.response.data.code,
            message: e.response.data.message,
          }
        : e;
    }
  },

  async signUp(payload) {
    try {
      const data = await api.auth.signUp(payload);

      if (data.success && data.token) {
        this.token = data.token;
        this.mnemonic = data.mnemonic;
        return true;
      }
    } catch (e) {
      throw e.response?.data
        ? {
            code: e.response.data.code,
            message: e.response.data.message,
          }
        : e;
    }
  },

  async signOut() {
    await api.auth.signOut();
    window.location.href = "/";
  },

  async resetKey() {
    try {
      const data = await api.settings.key.reset();
      if (data.success && data.mnemonic) return data.mnemonic;
    } catch (e) {
      throw e.response?.data
        ? {
            code: e.response.data.code,
            message: e.response.data.message,
          }
        : e;
    }
  },

  async enable2FA() {
    try {
      const data = await api.settings.twofa.enable();
      if (data.success) return data;
    } catch (e) {
      throw e.response?.data
        ? {
            code: e.response.data.code,
            message: e.response.data.message,
          }
        : e;
    }
  },

  async disable2FA() {
    try {
      const data = await api.settings.twofa.disable();
      if (data.success) return data;
    } catch (e) {
      throw e.response?.data
        ? {
            code: e.response.data.code,
            message: e.response.data.message,
          }
        : e;
    }
  },

  async confirm2FA(code) {
    try {
      const data = await api.settings.twofa.confirm(code);
      if (data.success) return data;
    } catch (e) {
      throw e.response?.data
        ? {
            code: e.response.data.code,
            message: e.response.data.message,
          }
        : e;
    }
  },

  async enableFIDO(car = undefined) {
    console.log(car);
    try {
      const data = await api.settings.fido.enable(car);
      if (data.success) {
        if (!car) {
          const registration = await client.register(
            this.user.login,
            data.challenge,
            {
              authenticatorType: "local",
              userVerification: "preferred",
              timeout: 60000,
              attestation: true,
              debug: false,
            }
          );

          return registration;
        } else {
          return data;
        }
      }
    } catch (e) {
      throw e.response?.data
        ? {
            code: e.response.data.code,
            message: e.response.data.message,
          }
        : e;
    }
  },

  async disableFIDO() {
    try {
      const data = await api.settings.fido.disable();
      if (data.success) return true;
    } catch (e) {
      throw e.response?.data
        ? {
            code: e.response.data.code,
            message: e.response.data.message,
          }
        : e;
    }
  },

  async authenticateFido(challenge, credentials) {
    const authentication = await client.authenticate(credentials, challenge, {
      authenticatorType: "auto",
      userVerification: "required",
      timeout: 60000,
    });

    return authentication;
  },

  async deleteData() {
    try {
      await api.settings.twofa.deleteData();
      window.location.href = "/";
    } catch (e) {
      throw e.response?.data
        ? {
            code: e.response.data.code,
            message: e.response.data.message,
          }
        : e;
    }
  },
});
