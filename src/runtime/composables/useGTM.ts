import { GTM, GTMInterface } from '../GTM';

const gtm = new GTM();

export const useGTM = (): GTMInterface => gtm;
