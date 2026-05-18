export type EducationProfile = {
  id: string;
  memberId: string;
  level: 'School' | 'College' | 'Post-grad' | 'PhD';
  institution: string;
  city: string;
  state: string;
  major?: string;
  annualTuition: number;
  annualRoomBoard: number;
  annualOther: number;
  spentToDate: number;
  goalTotal: number;
  fundEarmarked: number;
  expectedGradYear: number;
};

export const educationProfiles: EducationProfile[] = [
  {
    id: 'edu-1',
    memberId: 'm-james',
    level: 'College',
    institution: 'Stanford University',
    city: 'Stanford',
    state: 'CA',
    major: 'Computer Science (BS)',
    annualTuition: 64_000,
    annualRoomBoard: 22_000,
    annualOther: 7_000,
    spentToDate: 186_000,
    goalTotal: 372_000,
    fundEarmarked: 220_000,
    expectedGradYear: 2027,
  },
  {
    id: 'edu-2',
    memberId: 'm-sophia',
    level: 'School',
    institution: 'Greenwich Country Day School',
    city: 'Greenwich',
    state: 'CT',
    annualTuition: 58_000,
    annualRoomBoard: 0,
    annualOther: 6_800,
    spentToDate: 285_400,
    goalTotal: 950_000,
    fundEarmarked: 540_000,
    expectedGradYear: 2032,
  },
];
