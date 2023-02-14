export class ProfileDetailModel {
    uuid: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    birthday: string;
    postalcode: string;
    emailOptIn: any;
    loyalty: any;
    constructor(data: any) {
        this.uuid = data?.uuid;
        this.firstname = data?.firstname;
        this.lastname = data?.lastname;
        this.email = data?.email;
        this.phone = data?.phone;
        this.birthday = data?.birthday;
        this.postalcode = data?.postalcode;
        this.emailOptIn = data?.emailOptIn;
        this.loyalty = {
            enabled: true
        }
    }
}