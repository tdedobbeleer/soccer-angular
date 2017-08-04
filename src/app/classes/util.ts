import * as moment from "moment";

export class Util {

    static parseDate(date: Date): string {
        return moment(date).format('DD/MM/YYYY').toString();
    }

    static parseTime(date: string, time: string): Date {
        return moment(date + " " + time, "DD/MM/YYYY HH:mm").toDate();
    }

    static toDate(date: string): Date {
        return moment(date, "DD/MM/YYYY").toDate();
    }

    static parseUnixDate(date: number): Date {
        return moment.unix(date).toDate();
    }

    static dateTimeIsBetween(date: Date, startDate: Date, offsetMinutes: number): boolean {
        let odate = moment(date);
        let sdate = moment(startDate);
        let eDate = moment(startDate).add(offsetMinutes, 'minute');

        return odate.isSameOrAfter(sdate) && odate.isSameOrBefore(eDate);
    }

    static addZero(number: number): any {
        if (number < 10) {
            return '0' + number;
        } else {
            return number;
        }
    }
}
