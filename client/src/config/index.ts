import { production } from './production';
import { development } from './development';
import { extend } from 'lodash';

export interface IConfig{
  apiUrl: string;
}

let defaultConfig = {};
let envConfig;

if(process.env.NODE_ENV === 'production') {
  envConfig =  production;
} else {
  envConfig = development;
}

export const config: IConfig = extend({}, envConfig, defaultConfig) ;
