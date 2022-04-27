import {ValidationErrorDetailDTO, ValidationErrorDTO} from "../ws/soccer";

export class ErrorUtil {

    static getValidationError(error: ValidationErrorDetailDTO, lang: String) {
        let r: string = '';
        for (let _i = 0; _i < error.validationErrorDTOList.length; _i++) {
            if (lang == 'en') {
                r += error.validationErrorDTOList[_i].localizedMessageDTO.messageEn;
            } else {
                r += error.validationErrorDTOList[_i].localizedMessageDTO.messageNl;
            }

            if ((_i + 1) !== error.validationErrorDTOList.length) {
                r += '<br/>';
            }
        }
        return r;

    }

    static getError(error: ValidationErrorDTO, lang: String) {
        return lang == 'en' ? error.localizedMessageDTO.messageEn : error.localizedMessageDTO.messageNl;
    }
}
