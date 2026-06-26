/**
 * @file Icon.tsx
 * @description Componente wrapper para ícones SVG do Material Symbols.
 */

import React from 'react';
import { SvgProps } from 'react-native-svg';

// Importações dos SVGs
import AccountCircleIcon from '../../assets/icons/account_circle.svg';
import AddIcon from '../../assets/icons/add.svg';
import ArrowLeftAltIcon from '../../assets/icons/arrow_left_alt.svg';
import CardsIcon from '../../assets/icons/cards.svg';
import ChevronRightIcon from '../../assets/icons/chevron_right.svg';
import CloseSmallIcon from '../../assets/icons/close_small.svg';
import MobileAlertIcon from '../../assets/icons/mobile_alert.svg';
import PaidIcon from '../../assets/icons/paid.svg';
import RoomServiceIcon from '../../assets/icons/room_service.svg';
import ScheduleIcon from '../../assets/icons/schedule.svg';
import SearchIcon from '../../assets/icons/search.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import ShoppingBagSpeedIcon from '../../assets/icons/shopping_bag_speed.svg';
import TableRestaurantIcon from '../../assets/icons/table_restaurant.svg';

const iconMap = {
  account_circle: AccountCircleIcon,
  add: AddIcon,
  arrow_left_alt: ArrowLeftAltIcon,
  cards: CardsIcon,
  chevron_right: ChevronRightIcon,
  close_small: CloseSmallIcon,
  mobile_alert: MobileAlertIcon,
  paid: PaidIcon,
  room_service: RoomServiceIcon,
  schedule: ScheduleIcon,
  search: SearchIcon,
  settings: SettingsIcon,
  shopping_bag_speed: ShoppingBagSpeedIcon,
  table_restaurant: TableRestaurantIcon,
} as const;

export type IconName = keyof typeof iconMap;

export interface IconProps extends Omit<SvgProps, 'width' | 'height'> {
  name: IconName;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#000',
  ...rest
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" não encontrado.`);
    return null;
  }

  return (
    <IconComponent width={size} height={size} fill={color} {...rest} />
  );
};
