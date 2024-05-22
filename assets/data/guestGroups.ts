export type Guest = {
      name: string;
      text: string;
      count: number;
};

export const guestsGroups: Guest[] = [
      {
            name: 'Adults',
            text: 'Ages 13 or above',
            count: 0,
      },
      {
            name: 'Children',
            text: 'Ages 2-12',
            count: 0,
      },
      {
            name: 'Infants',
            text: 'Under 2',
            count: 0,
      },
      {
            name: 'Pets',
            text: 'Pets allowed',
            count: 0,
      },
];
