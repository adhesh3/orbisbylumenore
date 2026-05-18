// Mock data representing a real US-based UHNI family (the "Whitman Family")
// All amounts in USD. Numbers reconciled across modules.

export type Member = {
  id: string;
  shortId: string;
  name: string;
  relation: 'Father' | 'Mother' | 'Self' | 'Spouse' | 'Child';
  role: 'Earning' | 'Dependent' | 'Minor';
  dob: string;
  initials: string;
  color: string;
  taxStatus: string;
  ssnMasked: string;
};

export const FAMILY_NAME = 'Whitman Family';
export const PRIMARY_RESIDENCE_CITY = 'Greenwich, CT';

export const members: Member[] = [
  {
    id: 'm-richard',
    shortId: 'F2',
    name: 'Richard Whitman',
    relation: 'Father',
    role: 'Earning',
    dob: '1968-03-14',
    initials: 'RW',
    color: '#1B2A4A',
    taxStatus: 'Married Filing Jointly',
    ssnMasked: '•••-••-4821',
  },
  {
    id: 'm-eleanor',
    shortId: 'F1',
    name: 'Eleanor Whitman',
    relation: 'Mother',
    role: 'Earning',
    dob: '1970-09-22',
    initials: 'EW',
    color: '#C9A84C',
    taxStatus: 'Married Filing Jointly',
    ssnMasked: '•••-••-2937',
  },
  {
    id: 'm-james',
    shortId: 'F5',
    name: 'James Whitman',
    relation: 'Child',
    role: 'Dependent',
    dob: '2002-07-08',
    initials: 'JW',
    color: '#2E7D52',
    taxStatus: 'Dependent',
    ssnMasked: '•••-••-5610',
  },
  {
    id: 'm-sophia',
    shortId: 'F6',
    name: 'Sophia Whitman',
    relation: 'Child',
    role: 'Minor',
    dob: '2008-11-19',
    initials: 'SW',
    color: '#7E6627',
    taxStatus: 'Dependent',
    ssnMasked: '•••-••-7245',
  },
];

export function memberById(id: string) {
  return members.find((m) => m.id === id);
}
export function memberName(id: string) {
  return memberById(id)?.name ?? 'Family';
}
