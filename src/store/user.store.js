/* eslint-disable no-useless-catch */
import { reactive } from "vue";
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import api, { getToken } from "@/api";
import consts from "@/consts";
import statusStore from "./status.store";
import { SHA512 } from "crypto-js";

export default reactive({
  token: getToken(),
  user: null,
  mnemonic: null,

  async fetch() {
    try {
      this.user = (await api.get("/user")).data;
    } catch (e) {
      statusStore.status = "issues";
      sessionStorage.removeItem(consts.tokenKey);
      localStorage.removeItem(consts.tokenKey);
      this.token = null;
    }

    return this.user;
  },

  async signInWithKey(rk) {
    // Validate key
    const isValid = bip39.validateMnemonic(rk, wordlist);
    if (!isValid)
      throw {
        code: "INVALID_KEY",
        message: "Invalid key",
      };

    const seed = SHA512((await bip39.mnemonicToSeed(rk)).toString()).toString();
    console.log(seed);

    try {
      const { data } = await api.post("/signIn", {
        seed: seed,
      });

      if (data.success && data.token) {
        this.token = data.token;
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

  async signUp(payload) {
    try {
      const { data } = await api.post("/signUp", payload);

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

  signOut() {
    this.token = null;
    sessionStorage.removeItem(consts.tokenKey);
    localStorage.removeItem(consts.tokenKey);
  },
});
