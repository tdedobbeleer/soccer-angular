import * as moment from "moment";

export class Util {

    static parseDate(date: Date): String {
        return moment(date).format('dd/MM/yyyy').toString();
    }

    static parseTime(date: String, time: String): Date {
        return moment(date + " " + time, "dd/MM/yyyy HH:mm").toDate();
    }

    static toDate(date: String): Date {
        return moment(date, "dd/MM/yyyy").toDate();
    }
}
