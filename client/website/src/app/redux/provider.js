"use client"; // 👈 Next.js App router ke liye yeh zaroori hai
import { Provider } from "react-redux";
import { store } from "./store"; // 👈 Aapka store import karein

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}