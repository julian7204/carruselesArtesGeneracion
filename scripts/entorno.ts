import { existsSync } from "node:fs";

// Carga las llaves de .env (PIXABAY_API_KEY, PEXELS_API_KEY, UNSPLASH_ACCESS_KEY, OPENAI_API_KEY). Ese archivo no se sube a git.
if (existsSync(".env")) process.loadEnvFile(".env");
