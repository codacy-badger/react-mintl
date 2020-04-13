import React, { useState, useEffect } from 'react';
import EE from 'eventemitter3';

const EventEmitter = new EE();

function I18n() {
  this.languages = [];
  this.currentLang = '';
  this.initialized = false;
}

/**
 * Initialize your i18n instance. Returns true if the initialization was successful.
 * @param {Object} config An object with your settings and language resources.
 * @param {Object} config.resources An object of {objects} with your language resources.
 * @param {string} [config.currentLang] The initial language your app wil be using.
 */
I18n.prototype.init = function(config) {
  if (!config.resources) {
    console.warn('You must specify your language resources/files, otherwise your i18n instance won\'t initialize.');
    return false;
  }

  Object.keys(config).map((key) => {
    this[key] = config[key];
  });

  this.languages = Object.keys(this.resources);

  if (this.currentLang === '') {
    [this.currentLang] = this.languages;
    console.warn(`You didn't specify your initial language. We defined it as ${this.currentLang}`);
  }

  this.initialized = true;
  return true;
};

I18n.prototype.getTranslatedKey = function(key) {
  if (this.resources === undefined) return key;

  const translatedKey = this.resources?.[this.currentLang]?.[key];

  return translatedKey === undefined ? key : translatedKey;
};

/**
 * Returns a text node with the translated key.
 * @param {string} key - The key to be translated.
 */
I18n.prototype.t = function(key) {
  const self = this;

  const TextNode = () => {
    const [translation, setTranslation] = useState(key);

    const updateTranslation = () => {
      setTranslation(self.getTranslatedKey(key));
    };

    useEffect(updateTranslation, []);

    EventEmitter.on('language-change', updateTranslation);

    return (
      <>{ translation }</>
    );
  };

  return <TextNode />;
};

/**
 * Updates the current language.
 * @param {string} lang - The new language to be used.
 *                        It must be formatted as you defined it on your resources object.
 */
I18n.prototype.changeLang = function(lang) {
  if (!this.languages.includes(lang)) {
    console.warn(`${lang} is not available!`);
    return;
  }

  this.currentLang = lang;
  EventEmitter.emit('language-change');
};

export default new I18n();
