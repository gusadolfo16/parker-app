'use client';

import { createContext, use } from 'react';
import { generateAppTextState } from '.';
import { TEXT as EN_US } from '../locales/en-us';
import { I18N } from '..';

export const AppTextContext = createContext(generateAppTextState({} as I18N));

export const useAppText = () => use(AppTextContext);
