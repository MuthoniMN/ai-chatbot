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
  setError: Dispatch<SetStateAction<string>>,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  valid: boolean,
  setValid: Dispatch<SetStateAction<boolean>>
}

export type TShortLang = 'es' | 'en' | 'pt' | 'fr' | 'tr' | 'ru';

export type TLang = {
  [lang in TShortLang | string]: string
}

export type AISummarizerType = {
  addEventListener: (event: string, fn: (e: DownloadEvent) => void) => void,
  ready: Promise<boolean>,
} & AISummarizer

export type DownloadEvent = {
  loaded: number,
  total: number
}

export type AILanguageDetectorType = {
  ready: Promise<boolean>,
} & AILanguageDetector
