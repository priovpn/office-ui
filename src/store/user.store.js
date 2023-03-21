import { reactive } from "vue";
import axios from "axios";
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import AES from "crypto-js/aes";
import consts from "@/consts";

const api = axios.create({
  baseURL: consts.apiUrl,
});

export default reactive({
  token: localStorage.getItem("pvak"),
  user: {
    id: "e123...",
    login: "admin",
  },

  async signInWithPassword({ login, password }) {
    login = login?.trim();
    password = password?.trim();

    if (!/^[A-Za-z][A-Za-z0-9_]{4,14}$/.test(login))
      throw {
        code: "INVALID_LOGIN",
        message: "Invalid login",
      };

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}$/.test(password))
      throw {
        code: "INVALID_PASSWORD",
        message: "Invalid password",
      };

    if (!login || !password)
      throw {
        code: "INVALID_LOGIN_OR_PASSWORD",
        message: "Invalid login or password",
      };

    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await api.post("/signIn", {
        login: AES.encrypt(login, "prio").toString(),
        password: AES.encrypt(password, "prio").toString(),
      });
      console.log(data);
    } catch (e) {
      throw e;
    }
  },

  async signInWithRecoveryKey(rk) {
    // Validate recovery key
    const isValid = bip39.validateMnemonic(rk, wordlist);
    if (!isValid)
      throw {
        code: "INVALID_RECOVERY_KEY",
        message: "Invalid recovery key",
      };

    const seed = btoa(await bip39.mnemonicToSeed(rk));
    console.log(seed);

    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await api.post("/signIn", {
        seed: AES.encrypt(seed, "prio").toString(),
      });
      console.log(data);
    } catch (e) {
      throw e;
    }
  },

  signOut() {
    this.token = null;
    localStorage.removeItem("pvak");
  },
});
