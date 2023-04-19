import { createContext } from 'react';

export const initialUser = {
  nickName: "",
  loggedIn: false
};

const Usercontext = createContext();

export default Usercontext;