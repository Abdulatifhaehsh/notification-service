import { NotificationType } from "./notification-type.interface";

export class MonthlyPayslipType implements NotificationType {
    message: string;
    subject: string;

    constructor() {
        this.message = 'Your payslip is available.';
        this.subject = 'Payslip';
    }

}