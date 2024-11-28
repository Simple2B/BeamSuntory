import { ModalOptions } from 'flowbite';
import type { ModalInterface } from 'flowbite';
export declare const formatDate: (date: string) => string;
export declare const modalOptions: ModalOptions;
export declare const initModal: (el: HTMLElement) => ModalInterface;
export declare const addDeleteEvent: (e: Element, url: string) => void;
export declare const addSearchEvent: (searchInput: HTMLInputElement, searchButton: Element) => void;
