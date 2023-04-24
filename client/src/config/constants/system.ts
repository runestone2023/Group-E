import { SelectItem } from '@mantine/core';

export enum Colors {
  RED = 'RED',
  BLACK = 'BLACK',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  WHITE = 'WHITE',
}

export const ColorSelectOptions: SelectItem[] = [
  {
    value: Colors.BLACK,
    label: 'Đen',
  },
  {
    value: Colors.RED,
    label: 'Đỏ',
  },
  {
    value: Colors.BLUE,
    label: 'Xanh dương',
  },
  {
    value: Colors.GREEN,
    label: 'Xanh lá cây',
  },
  {
    value: Colors.YELLOW,
    label: 'Vàng',
  },
  {
    value: Colors.WHITE,
    label: 'Trắng',
  },
];

export enum Sizes {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

export const SizeSelectOptions: (disabledSizes?: Sizes[]) => SelectItem[] = (disabledSizes = []) => {
  const isDisabled = (size: Sizes) => !!disabledSizes.find((disabledSize) => disabledSize === size);

  return [
    {
      value: Sizes.XS,
      label: Sizes.XS,
      disabled: isDisabled(Sizes.XS),
    },
    {
      value: Sizes.S,
      label: Sizes.S,
      disabled: isDisabled(Sizes.S),
    },
    {
      value: Sizes.M,
      label: Sizes.M,
      disabled: isDisabled(Sizes.M),
    },
    {
      value: Sizes.L,
      label: Sizes.L,
      disabled: isDisabled(Sizes.L),
    },
    {
      value: Sizes.XL,
      label: Sizes.XL,
      disabled: isDisabled(Sizes.XL),
    },
    {
      value: Sizes.XXL,
      label: Sizes.XXL,
      disabled: isDisabled(Sizes.XXL),
    },
  ];
};
