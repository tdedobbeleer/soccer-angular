import {ValidationErrorDetailDTO} from "../ws/soccer/model/ValidationErrorDetailDTO";
import {ValidationErrorDTO} from "../ws/soccer/model/ValidationErrorDTO";
export class ErrorUtil {

    static getValidationError(error: ValidationErrorDetailDTO, lang: String) {
        let r: string = '';
        error.validationErrorDTOList.forEach(e => {
            if (lang == 'en') {
                r += e.localizedMessageDTO.messageEn;
            } else {
                r += e.localizedMessageDTO.messageNl;
            }
        });
        return r;

    }

    static getError(error: ValidationErrorDTO, lang: String) {
        return lang == 'en' ? error.localizedMessageDTO.messageEn : error.localizedMessageDTO.messageNl;
    }
}
