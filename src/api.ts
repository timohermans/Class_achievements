import PocketBase from 'pocketbase';
import { QueryClient } from '@tanstack/react-query';

export const client = new QueryClient();
export const pb = new PocketBase(import.meta.env.VITE_API_URL);