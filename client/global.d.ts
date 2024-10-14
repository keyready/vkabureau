interface ImportMetaEnv {
    readonly DEV: boolean;
    readonly VITE_PASSWORD_PUBKEY: string;
    readonly VITE_PASSWORD_PRIVKEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
