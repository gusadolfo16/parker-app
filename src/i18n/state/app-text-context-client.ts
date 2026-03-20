'use client';

import { createContext, use } from 'react';
import { generateAppTextState } from '.';
import { I18N } from '..';

export const AppTextContext = createContext(generateAppTextState({} as I18N));

export const useAppText = () => use(AppTextContext);
