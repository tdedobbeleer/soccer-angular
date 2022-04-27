import {Injectable, EventEmitter} from "@angular/core";
import {LANG_NL_TRANS, LANG_NL_NAME} from "../lang-nl";
import {LANG_EN_TRANS, LANG_EN_NAME} from "../lang-en";

const dictionary = {
    [LANG_EN_NAME]: LANG_EN_TRANS,
    [LANG_NL_NAME]: LANG_NL_TRANS
};

@Injectable()
export class TranslationService {
  private LOCAL_STORAGE_LANG: string = 'lang';
  public langUpdated: EventEmitter<string> = new EventEmitter();

  public currentLang() {
    if (localStorage.getItem(this.LOCAL_STORAGE_LANG)) {
      return localStorage.getItem(this.LOCAL_STORAGE_LANG);
    }
    else {
      return LANG_NL_NAME;
    }
  }

  // inject our translations
    constructor() {
  }

  public use(lang: string): void {
    // set current language
    localStorage.setItem(this.LOCAL_STORAGE_LANG, lang);
    this.langUpdated.emit(lang);
  }

  private translate(key: string): string {
    // private perform translation
    let translation = key;

    if (dictionary[this.currentLang()] && dictionary[this.currentLang()][key]) {
      return dictionary[this.currentLang()][key];
    }

    return translation;
  }

  public instant(key: string) {
    // public perform translation
    return this.translate(key);
  }
}
