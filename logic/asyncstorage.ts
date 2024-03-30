
// This is a declaration file for the AsyncStorage module. It is used to provide type information for the module.
declare module 'logic/asyncstorage' {
    export function setItem(key: string, value: string): Promise<void>;
    export function getItem(key: string): Promise<string | null>;
    export function removeItem(key: string): Promise<void>;
}
