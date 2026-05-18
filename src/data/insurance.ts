export type InsurancePolicy = {
  id: string;
  type:
    | 'Term Life'
    | 'Whole Life'
    | 'Health'
    | 'Disability'
    | 'Umbrella Liability'
    | 'Homeowners'
    | 'Auto'
    | 'Yacht'
    | 'Jewellery & Art'
    | 'Travel'
    | 'D&O';
  policyName: string;
  insurer: string;
  policyNumber: string;
  sumAssured: number;
  premiumAnnual: number;
  premiumFrequency: 'Monthly' | 'Quarterly' | 'Annual';
  startDate: string;
  renewalDate: string;
  insuredId: string;
  nominees: string[];
  agent?: string;
};

export const insurancePolicies: InsurancePolicy[] = [
  { id: 'ins-1', type: 'Term Life', policyName: 'Northwestern Mutual 20-Year Term', insurer: 'Northwestern Mutual', policyNumber: 'NWM-TL-9982341', sumAssured: 10_000_000, premiumAnnual: 14_880, premiumFrequency: 'Monthly', startDate: '2018-01-15', renewalDate: '2026-01-15', insuredId: 'm-richard', nominees: ['m-eleanor', 'm-james', 'm-sophia'], agent: 'David Hartwell' },
  { id: 'ins-2', type: 'Term Life', policyName: 'MassMutual 20-Year Term', insurer: 'MassMutual', policyNumber: 'MM-TL-5530071', sumAssured: 5_000_000, premiumAnnual: 6_240, premiumFrequency: 'Monthly', startDate: '2019-05-01', renewalDate: '2026-05-01', insuredId: 'm-eleanor', nominees: ['m-richard', 'm-james', 'm-sophia'], agent: 'Karen Liu' },
  { id: 'ins-3', type: 'Whole Life', policyName: 'Northwestern Mutual Whole Life', insurer: 'Northwestern Mutual', policyNumber: 'NWM-WL-1182040', sumAssured: 2_500_000, premiumAnnual: 38_000, premiumFrequency: 'Annual', startDate: '2012-03-10', renewalDate: '2026-03-10', insuredId: 'm-richard', nominees: ['m-eleanor'], agent: 'David Hartwell' },
  { id: 'ins-4', type: 'Health', policyName: 'Aetna Premier PPO Family Plan', insurer: 'Aetna', policyNumber: 'AET-PPO-77620', sumAssured: 5_000_000, premiumAnnual: 34_080, premiumFrequency: 'Monthly', startDate: '2014-01-01', renewalDate: '2026-12-31', insuredId: 'm-richard', nominees: ['m-eleanor', 'm-james', 'm-sophia'] },
  { id: 'ins-5', type: 'Umbrella Liability', policyName: 'Chubb Personal Umbrella $25M', insurer: 'Chubb', policyNumber: 'CHB-UMB-30019', sumAssured: 25_000_000, premiumAnnual: 8_400, premiumFrequency: 'Annual', startDate: '2015-06-12', renewalDate: '2026-06-12', insuredId: 'm-richard', nominees: [], agent: 'Patricia Olsen' },
  { id: 'ins-6', type: 'Homeowners', policyName: 'Chubb Masterpiece Homeowners — Greenwich', insurer: 'Chubb', policyNumber: 'CHB-HO-44012', sumAssured: 8_500_000, premiumAnnual: 28_400, premiumFrequency: 'Annual', startDate: '2014-06-12', renewalDate: '2026-06-12', insuredId: 'm-richard', nominees: [] },
  { id: 'ins-7', type: 'Homeowners', policyName: 'Chubb Masterpiece — Aspen', insurer: 'Chubb', policyNumber: 'CHB-HO-44310', sumAssured: 10_500_000, premiumAnnual: 21_592, premiumFrequency: 'Annual', startDate: '2019-12-04', renewalDate: '2026-12-04', insuredId: 'm-richard', nominees: [] },
  { id: 'ins-8', type: 'Auto', policyName: 'Chubb Auto Multi-Vehicle', insurer: 'Chubb', policyNumber: 'CHB-AUTO-11209', sumAssured: 2_000_000, premiumAnnual: 21_360, premiumFrequency: 'Quarterly', startDate: '2014-01-01', renewalDate: '2026-09-15', insuredId: 'm-richard', nominees: [] },
  { id: 'ins-9', type: 'Yacht', policyName: 'Pantaenius Yacht Hull & Liability', insurer: 'Pantaenius', policyNumber: 'PNT-Y-50018', sumAssured: 4_000_000, premiumAnnual: 38_400, premiumFrequency: 'Annual', startDate: '2021-11-12', renewalDate: '2026-11-12', insuredId: 'm-richard', nominees: [] },
  { id: 'ins-10', type: 'Jewellery & Art', policyName: 'Chubb Valuable Articles', insurer: 'Chubb', policyNumber: 'CHB-VA-30201', sumAssured: 8_900_000, premiumAnnual: 24_500, premiumFrequency: 'Annual', startDate: '2017-04-12', renewalDate: '2026-04-12', insuredId: 'm-eleanor', nominees: [] },
];

export const totalCoverage = insurancePolicies.reduce((s, p) => s + p.sumAssured, 0);
export const annualPremiumTotal = insurancePolicies.reduce((s, p) => s + p.premiumAnnual, 0);
