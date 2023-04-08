import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SyntheticEvent } from 'react';

export interface PropsNavigationBarInterface {
	valueNavigation: string;
	handleClickNavigation: (
		e: SyntheticEvent,
		newValue: string,
	) => void;
	propsBottomNav: PropsBottomNav[];
}

export interface PropsBottomNav {
	label: string;
	icon: OverridableComponent<SvgIconTypeMap>;
	value: string;
}
