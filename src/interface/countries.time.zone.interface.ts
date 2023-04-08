export interface CountriesTimeZoneInterface {
	idCountry: number;
	utc: string;
	timeZone: string;
	country: string;
	flagCode: string;
}

export interface PropsSelectCountryInterface {
	setCountry: (
		country: CountriesTimeZoneInterface,
	) => void;
}
