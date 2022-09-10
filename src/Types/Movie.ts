export enum AgeRestriction {
  eighteen = '18',
  thirteen = '13',
  sixteen = '16',
  sixteen_violence = '16V',
  eighteen_violence = '18V',
  thirteen_violence = '13V',
}

export type Movie = {
  id: number;
  name: string;
  description: string;
  age_restriction: AgeRestriction;
  date_of_showing: Date;
  poster: string;
  price: number;
};
