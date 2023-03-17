export type User = {
  id: number;
  name: string;
  surname: string;
  userType: string;
  createdDate: string;
  city: string;
  adress: string;
};

export type Filter = {
  userType?: string;
  name?: string;
};
