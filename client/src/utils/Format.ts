import moment from 'moment';

class Format {
	private moment: typeof moment;

	constructor() {
		this.moment = moment;
	}

	public date(dateString: string): string {
		return this.moment(dateString).format('MM-DD-YY');
	}
	public currency(amount: number): string {
		return `$${amount}`;
	}
	public capitalize(str: string): string {
		let strArray: string[] = str.split('');

		strArray.splice(0, 1, strArray[0].toUpperCase());

		for (let i = 1; i < strArray.length; i++) {
			strArray.splice(i, 1, strArray[i].toLowerCase());
		}

		return strArray.join('');
	}
	public trim(str: string, limit: number): string {
		return `${str.split('').slice(0, limit).join('')}...`;
	}
}

export default new Format();
