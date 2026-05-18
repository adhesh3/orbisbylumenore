export type Property = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  type: 'Residential' | 'Vacation Home' | 'Commercial' | 'Land';
  subtype: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft: number;
  lotAcres?: number;
  yearBuilt: number;
  purchasePrice: number;
  purchaseDate: string;
  currentValue: number;
  status: 'Self-occupied' | 'Rented' | 'Vacant';
  monthlyRent?: number;
  annualPropertyTax: number;
  annualHOA?: number;
  linkedLoanId?: string;
  ownerId: string;
};

export const properties: Property[] = [
  {
    id: 'p-1',
    name: 'Primary Residence',
    address: '142 Round Hill Road',
    city: 'Greenwich',
    state: 'CT',
    type: 'Residential',
    subtype: 'Single-Family Home',
    bedrooms: 6,
    bathrooms: 5.5,
    sqft: 8_400,
    lotAcres: 2.4,
    yearBuilt: 2008,
    purchasePrice: 4_250_000,
    purchaseDate: '2014-06-12',
    currentValue: 6_850_000,
    status: 'Self-occupied',
    annualPropertyTax: 58_400,
    linkedLoanId: 'ln-1',
    ownerId: 'm-richard',
  },
  {
    id: 'p-2',
    name: 'Manhattan Pied-à-terre',
    address: '432 Park Avenue, Unit 58A',
    city: 'New York',
    state: 'NY',
    type: 'Residential',
    subtype: 'Condominium',
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 4_019,
    yearBuilt: 2015,
    purchasePrice: 11_200_000,
    purchaseDate: '2018-03-22',
    currentValue: 12_400_000,
    status: 'Self-occupied',
    annualPropertyTax: 142_500,
    annualHOA: 96_000,
    ownerId: 'm-eleanor',
  },
  {
    id: 'p-3',
    name: 'Aspen Vacation Home',
    address: '85 Snowmass Lane',
    city: 'Aspen',
    state: 'CO',
    type: 'Vacation Home',
    subtype: 'Mountain Chalet',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 5_200,
    lotAcres: 1.1,
    yearBuilt: 2011,
    purchasePrice: 6_800_000,
    purchaseDate: '2019-12-04',
    currentValue: 8_900_000,
    status: 'Self-occupied',
    annualPropertyTax: 38_200,
    linkedLoanId: 'ln-2',
    ownerId: 'm-richard',
  },
  {
    id: 'p-4',
    name: 'Hamptons Summer House',
    address: '17 Further Lane',
    city: 'East Hampton',
    state: 'NY',
    type: 'Vacation Home',
    subtype: 'Single-Family Home',
    bedrooms: 7,
    bathrooms: 6,
    sqft: 7_100,
    lotAcres: 1.8,
    yearBuilt: 2002,
    purchasePrice: 9_400_000,
    purchaseDate: '2021-05-18',
    currentValue: 11_500_000,
    status: 'Rented',
    monthlyRent: 85_000,
    annualPropertyTax: 64_800,
    ownerId: 'm-eleanor',
  },
  {
    id: 'p-5',
    name: 'Stamford Commercial Building',
    address: '300 Atlantic Street, Suite 200',
    city: 'Stamford',
    state: 'CT',
    type: 'Commercial',
    subtype: 'Office Building',
    sqft: 24_500,
    yearBuilt: 2005,
    purchasePrice: 8_200_000,
    purchaseDate: '2016-09-30',
    currentValue: 10_750_000,
    status: 'Rented',
    monthlyRent: 78_500,
    annualPropertyTax: 124_200,
    ownerId: 'm-richard',
  },
  {
    id: 'p-6',
    name: 'Napa Valley Vineyard Land',
    address: 'Silverado Trail',
    city: 'St. Helena',
    state: 'CA',
    type: 'Land',
    subtype: 'Agricultural',
    sqft: 0,
    lotAcres: 18.5,
    yearBuilt: 0,
    purchasePrice: 2_400_000,
    purchaseDate: '2020-07-14',
    currentValue: 3_650_000,
    status: 'Vacant',
    annualPropertyTax: 18_400,
    ownerId: 'm-richard',
  },
];

export type Vehicle = {
  id: string;
  type: 'Car' | 'SUV' | 'Yacht' | 'Private Jet' | 'Motorcycle';
  brand: string;
  model: string;
  year: number;
  color: string;
  purchaseCost: number;
  currentValue: number;
  purchaseDate: string;
  fuel: 'Gas' | 'Diesel' | 'Electric' | 'Hybrid' | 'Jet A-1';
  vin: string;
  insurer: string;
  insuranceExpiry: string;
  registrationExpiry: string;
  linkedLoanId?: string;
  ownerId: string;
};

export const vehicles: Vehicle[] = [
  { id: 'v-1', type: 'SUV', brand: 'Range Rover', model: 'Autobiography LWB', year: 2024, color: 'Santorini Black', purchaseCost: 189_500, currentValue: 162_000, purchaseDate: '2024-03-10', fuel: 'Gas', vin: 'SALGS5RU8RA••••12', insurer: 'Chubb', insuranceExpiry: '2026-09-15', registrationExpiry: '2027-03-10', ownerId: 'm-richard' },
  { id: 'v-2', type: 'Car', brand: 'Mercedes-Benz', model: 'S-Class S580', year: 2023, color: 'Obsidian Black', purchaseCost: 142_300, currentValue: 108_000, purchaseDate: '2023-04-22', fuel: 'Hybrid', vin: 'W1K6G7GB8PA••••42', insurer: 'Chubb', insuranceExpiry: '2026-07-22', registrationExpiry: '2027-04-22', ownerId: 'm-eleanor' },
  { id: 'v-3', type: 'Car', brand: 'Porsche', model: '911 Turbo S', year: 2022, color: 'GT Silver', purchaseCost: 248_700, currentValue: 232_000, purchaseDate: '2022-08-05', fuel: 'Gas', vin: 'WP0AD2A98NS••••71', insurer: 'PURE', insuranceExpiry: '2026-08-05', registrationExpiry: '2026-08-05', ownerId: 'm-richard' },
  { id: 'v-4', type: 'Car', brand: 'Tesla', model: 'Model S Plaid', year: 2024, color: 'Pearl White', purchaseCost: 109_990, currentValue: 92_500, purchaseDate: '2024-06-18', fuel: 'Electric', vin: '5YJSA1E60RF••••03', insurer: 'GEICO', insuranceExpiry: '2026-06-18', registrationExpiry: '2027-06-18', ownerId: 'm-eleanor' },
  { id: 'v-5', type: 'Yacht', brand: 'Sunseeker', model: 'Predator 74', year: 2021, color: 'Pearl White', purchaseCost: 4_200_000, currentValue: 3_650_000, purchaseDate: '2021-11-12', fuel: 'Diesel', vin: 'YAC-SS-P74-001', insurer: 'Pantaenius', insuranceExpiry: '2026-11-12', registrationExpiry: '2027-11-12', ownerId: 'm-richard' },
];

export type Jewellery = {
  id: string;
  item: string;
  form: 'Coins' | 'Bars' | 'Made jewellery';
  weightGrams: number;
  purity: '14K' | '18K' | '22K' | '24K' | 'N/A';
  purchasePrice: number;
  currentValue: number;
  hallmarked: boolean;
  location: 'Home Safe' | 'Bank Vault' | 'Safe Deposit Box';
  ownerId: string;
};

export const jewellery: Jewellery[] = [
  { id: 'j-1', item: '18K Diamond Necklace (Tiffany & Co.)', form: 'Made jewellery', weightGrams: 84, purity: '18K', purchasePrice: 145_000, currentValue: 215_000, hallmarked: true, location: 'Bank Vault', ownerId: 'm-eleanor' },
  { id: 'j-2', item: 'Cartier Love Bracelets (set of 4)', form: 'Made jewellery', weightGrams: 122, purity: '18K', purchasePrice: 38_400, currentValue: 64_000, hallmarked: true, location: 'Home Safe', ownerId: 'm-eleanor' },
  { id: 'j-3', item: 'Patek Philippe Nautilus 5711', form: 'Made jewellery', weightGrams: 152, purity: 'N/A', purchasePrice: 145_000, currentValue: 285_000, hallmarked: true, location: 'Bank Vault', ownerId: 'm-richard' },
  { id: 'j-4', item: 'American Gold Eagles (1 oz coins)', form: 'Coins', weightGrams: 1_555, purity: '22K', purchasePrice: 78_000, currentValue: 132_000, hallmarked: true, location: 'Safe Deposit Box', ownerId: 'm-richard' },
  { id: 'j-5', item: 'GIA Certified 5.2ct Diamond Ring', form: 'Made jewellery', weightGrams: 12, purity: '18K', purchasePrice: 320_000, currentValue: 410_000, hallmarked: true, location: 'Bank Vault', ownerId: 'm-eleanor' },
];

export type ArtPiece = {
  id: string;
  name: string;
  artist: string;
  medium: string;
  acquisitionDate: string;
  acquisitionPrice: number;
  currentAppraisedValue: number;
  lastAppraisalDate: string;
  certificateOfAuthenticity: boolean;
  location: string;
};

export const artCollection: ArtPiece[] = [
  { id: 'a-1', name: 'Untitled (Yellow Field)', artist: 'Mark Rothko (estate work)', medium: 'Oil on canvas', acquisitionDate: '2017-04-12', acquisitionPrice: 2_400_000, currentAppraisedValue: 3_650_000, lastAppraisalDate: '2025-09-01', certificateOfAuthenticity: true, location: 'Greenwich Residence' },
  { id: 'a-2', name: 'Balloon Dog (Magenta)', artist: 'Jeff Koons (edition)', medium: 'Mirror-polished stainless steel', acquisitionDate: '2019-11-08', acquisitionPrice: 1_650_000, currentAppraisedValue: 1_980_000, lastAppraisalDate: '2025-06-15', certificateOfAuthenticity: true, location: 'NYC Apartment' },
  { id: 'a-3', name: 'Selected Edition Print', artist: 'Banksy', medium: 'Screenprint, AP', acquisitionDate: '2021-02-19', acquisitionPrice: 285_000, currentAppraisedValue: 420_000, lastAppraisalDate: '2025-10-12', certificateOfAuthenticity: true, location: 'Greenwich Residence' },
  { id: 'a-4', name: 'Photography Collection (12 prints)', artist: 'Annie Leibovitz', medium: 'Archival pigment prints', acquisitionDate: '2020-08-30', acquisitionPrice: 320_000, currentAppraisedValue: 410_000, lastAppraisalDate: '2025-08-22', certificateOfAuthenticity: true, location: 'Hamptons House' },
];
