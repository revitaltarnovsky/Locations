export class User {
    userIndex: string;
    fullName: string;
    address: string;
    phoneNumber: string;
    img: string;
    birthday: string;

    constructor(userIndex: string, fullName: string, address: string, phoneNumer: string, img: string, birthday: string) {
        this.userIndex = userIndex;
        this.fullName = fullName;
        this.address = address;
        this.phoneNumber = phoneNumer
        this.img = img;
        this.birthday = birthday;
    }
}