import { customAlphabet } from 'nanoid';

const NANOID_LENGTH = 8;

const NANOID_ALPHABET =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const generateNanoid =
  customAlphabet(NANOID_ALPHABET, NANOID_LENGTH);

// Storage key id generator. Lives here (rather than the storage barrel) so
// provider modules can reuse it without importing the heavy storage index.
export const generateStorageId = () => generateNanoid(16);
