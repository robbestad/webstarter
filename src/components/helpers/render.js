import InfernoServer from 'inferno-server';
import Inferno from 'inferno';
export const toString = input => InfernoServer.renderToString(JSON.parse(input));
export const asString = html => <div dangerouslySetInnerHTML={{__html: html}}/>;
export const asKey = input => input.toLocaleString().toLowerCase().replace(/[\W_]+/g, '').replace(/\./g, '').replace(/[æøåÆØÅ]/g, '').replace(/![a-z]/g, '');
