import {  createContext } from "react";
import { TTextContext } from "../types/";

export const TextContext = createContext<TTextContext | null>(null);
