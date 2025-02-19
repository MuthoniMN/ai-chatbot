import { Dispatch, SetStateAction } from 'react';

export type TChat = {
  id?: number,
  title: string,
  created_at: Date,
}

export type TMessage = {
  id?: number,
  chat_id: number,
  message: string,
  language: string,
  type: 'input' | 'output',
  created_at: Date
}

export type TTextContext = {
  chats: TChat[],
  chat: TChat,
  setChats: Dispatch<SetStateAction<TChat[]>>,
  setChat: Dispatch<SetStateAction<TChat>>,
  messages: TMessage[],
  setMessages: Dispatch<SetStateAction<TMessage[]>>,
  error: string,
  setError: Dispatch<SetStateAction<string>>
}

export type TShortLang = 'es' | 'en' | 'pt' | 'fr' | 'tr' | 'ru';

export type TLang = {
  [lang in TShortLang | string]: string
}

export interface AICapabilities {
  available: 'no' | 'readily' | 'with-download';
}

export interface AITool {
  capabilities: () => Promise<AICapabilities>;
  create: (options?: { 
  sharedContext?: string,
  type?: string | 'key-points' | 'tl:dr' | 'teaser' | 'headline',
  format?: string | 'markdown' | 'plain-text',
  length?: 'short' | 'medium' | 'long' | string, 
  sourceLanguage?: string, 
  targetLanguage?: string, 
  monitor?: (m: Monitor) => void }) => Promise<LanguageDetectorInstance>;
}

export interface LanguageDetectorResponse {
  confidence: number;
  detectedLanguage: string;
}

export interface SummarizerOptions {
  sharedContext?: string,
  type?: string | 'key-points' | 'tl:dr' | 'teaser' | 'headline',
  format?: string | 'markdown' | 'plain-text',
  length?: 'short' | 'medium' | 'long'
}

export interface LanguageDetectorInstance {
  ready: Promise<void>;
  detect: (s: string) => Promise<LanguageDetectorResponse[]>;
  translate: (s: string) => Promise<string>;
  summarize: (s: string) => Promise<string>;
}

export interface Monitor {
  addEventListener: (event: string, callback: (e: ProgressEvent) => void) => void;
}

export interface AI {
  languageDetector?: AITool;
  translator?: AITool;
  summarizer?: AITool;
}

export interface Self {
  ai?: AI;
}
