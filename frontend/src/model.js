import { action } from "easy-peasy";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

export default {
  isLogged: false,
  toggleLog: action((state) => {
    state.isLogged = !state.isLogged;
  }),
};
