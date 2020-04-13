import Mintl from './Mintl.jsx';

/**
 * Returns a function to get a translated key and another one to change
 * the app language.
 */
const useMintl = () => [
  (key) => Mintl.t(key),
  (lang) => Mintl.changeLang(lang)
];

export default useMintl;
