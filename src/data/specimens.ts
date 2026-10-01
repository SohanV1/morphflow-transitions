export interface SpecimenAnnotation {
  id: string;
  code: string;
  category: string;
  value: string;
  description: string;
}

export interface SpecimenHudNode {
  id: string;
  label: string;
  metric: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface SpecimenData {
  index: number;
  numberLabel: string;
  shortName: string;
  title: string;
  titleStyle: 'serif' | 'italic-serif' | 'sans-bold';
  scientificName: string;
  classification: string;
  editorialTagline: string;
  harvestWindow: string;
  imageUrl: string;
  imageAlt: string;
  canvasBg: string;
  auraPrimary: string;
  auraSecondary: string;
  accentColor: string;
  shadowTint: string;
  leftSpecs: [SpecimenAnnotation, SpecimenAnnotation, SpecimenAnnotation];
  rightSpecs: [SpecimenAnnotation, SpecimenAnnotation, SpecimenAnnotation];
  hudNodes: [SpecimenHudNode, SpecimenHudNode];
  coordinates: string;
  facilityLabel: string;
  catalogCode: string;
  brixOrPrimaryMetric: string;
  storageTemp: string;
  packagingSummary: string;
}

export const SPECIMENS: SpecimenData[] = [
  {
    index: 0,
    numberLabel: '01',
    shortName: 'Capsicum',
    title: 'Colour Capsicum',
    titleStyle: 'serif',
    scientificName: 'Capsicum annuum var. grossum',
    classification: 'Export Grade A',
    editorialTagline: 'Cultivated with precision. Selected for the journey beyond the farm.',
    harvestWindow: 'Peak Cycles October through May',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1UBu0IMnvyhzOZAhrV4QC9q-f29yR5ewU_I5xFPs7N3nDXupMcsqqNCWHDqFpSU0NaabtMjNd6iBpSMQjHO4UvoJ8BXWx4iPVttjJ2H33eW6xSGemt6-KS8NqhINnwLusfwaWxuAPYhEWU0LZWDohDg9Ja8Tbfy67fIP_0jtoHn8IM0X_Rvz9O5dwYfiEBC9th9HOo2_ARlUel2cjOp2nchB2oIRLpgvtFXQV8VDmpnopb5HW1K6QF5gb7F',
    imageAlt:
      'Colour Capsicum botanical specimen with morning moisture droplets on warm archival backdrop',
    canvasBg: '#F9FAF7',
    auraPrimary: 'rgba(214, 90, 49, 0.12)',
    auraSecondary: 'rgba(62, 81, 56, 0.10)',
    accentColor: '#3E5138',
    shadowTint: 'rgba(26, 32, 24, 0.24)',
    leftSpecs: [
      {
        id: '01-a',
        code: 'Spec 01-A',
        category: 'Refractive Index',
        value: '5.2° Brix',
        description: 'Balanced natural glucose ratio with crisp organic acidity.',
      },
      {
        id: '01-b',
        code: 'Spec 01-B',
        category: 'Cell Wall Caliber',
        value: 'Thick Pericarp',
        description: '7.5 – 9.0 mm structural density engineered for transit integrity.',
      },
      {
        id: '01-c',
        code: 'Spec 01-C',
        category: 'Chromatic Peak',
        value: 'Red · Yellow · Green',
        description: 'Harvested at peak physiological carotenoid pigment stability.',
      },
    ],
    rightSpecs: [
      {
        id: '01-d',
        code: 'Spec 01-D',
        category: 'Storage Envelope',
        value: '8°C – 10°C',
        description: '90–95% RH cold chain integrity preventing epidermal shrivel.',
      },
      {
        id: '01-e',
        code: 'Spec 01-E',
        category: 'Export Packaging',
        value: '5 kg CFB Box',
        description: 'Multi-vent moisture regulated corrugated export carton.',
      },
      {
        id: '01-f',
        code: 'Spec 01-F',
        category: 'Harvest Window',
        value: 'Year-Round',
        description: 'Continuous protected glasshouse cycles with Oct–May peak.',
      },
    ],
    hudNodes: [
      {
        id: 'node-01-1',
        label: 'Calyx Turgidity',
        metric: '99.1% Optimal',
        x: 49,
        y: 26,
      },
      {
        id: 'node-01-2',
        label: 'Pericarp Density',
        metric: '8.4 mm Wall',
        x: 64,
        y: 58,
      },
    ],
    coordinates: 'LAT 52°04′12″N · LON 04°29′30″E',
    facilityLabel: 'Controlled Climate Glasshouse · Precision Grade A1',
    catalogCode: 'CAT-2025-CAP · 01-SOLANACEAE',
    brixOrPrimaryMetric: '5.2° Brix',
    storageTemp: '8°C – 10°C',
    packagingSummary: '5 kg CFB Box',
  },
  {
    index: 1,
    numberLabel: '02',
    shortName: 'Mini Cucumber',
    title: 'Mini Cucumber',
    titleStyle: 'serif',
    scientificName: 'Cucumis sativus',
    classification: 'Parthenocarpic Seedless',
    editorialTagline: 'High cellular turgor pressure delivering authentic crisp snap.',
    harvestWindow: 'Continuous High-Wire Hydroponic',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1XlJMTnpx8YCxIwcjKHn1qGVIdkouOrt9POW_Wo1mXH6RLXAsDdK7OuLGPgAi_OQG_wVJFq0a3hzBcXJ3ZN1el-l5JlkTxrStZ626KcB1Ldpz5W7-0Un7DwXc0QvhirQ1yfO3U2XqOiEy5X9m9fYzaScAcreW3lHTIIDimRl_OHLYdgmmIwz04lCTbBFYmR3Pr7Y6UVcjm2t6fZ5jplVFsRCk8wGjxwUm4m2WD7xspwZ15YVcsWwRB6lWM',
    imageAlt:
      'Studio specimen shot of 3G Floritech crisp greenhouse mini cucumber with fresh dew drops',
    canvasBg: '#F6F9F6',
    auraPrimary: 'rgba(30, 102, 52, 0.14)',
    auraSecondary: 'rgba(156, 211, 175, 0.18)',
    accentColor: '#1E4620',
    shadowTint: 'rgba(18, 48, 22, 0.22)',
    leftSpecs: [
      {
        id: '02-a',
        code: 'Spec 02-A',
        category: 'Osmotic Crisp Density',
        value: '4.8° Brix',
        description: 'High cellular turgor pressure delivering authentic crisp snap.',
      },
      {
        id: '02-b',
        code: 'Spec 02-B',
        category: 'Epicuticular Matrix',
        value: 'Ultra-Thin Skin',
        description: 'Micro-smooth natural sheen with zero bitter cucurbitacin peeling needed.',
      },
      {
        id: '02-c',
        code: 'Spec 02-C',
        category: 'All-Female Node Bloom',
        value: '100% Gynoecious',
        description: 'Continuous productive internodes yielding perfectly symmetrical fruit.',
      },
    ],
    rightSpecs: [
      {
        id: '02-d',
        code: 'Spec 02-D',
        category: 'Cold-Chain Envelope',
        value: '10°C – 12°C',
        description: 'Calculated post-harvest respiration damping and chill-injury prevention.',
      },
      {
        id: '02-e',
        code: 'Spec 02-E',
        category: 'Ventilated Distribution',
        value: '10 kg Crate',
        description: 'Multi-tier cushioned export corrugated packs with moisture barriers.',
      },
      {
        id: '02-f',
        code: 'Spec 02-F',
        category: 'High-Wire Hydroponic',
        value: 'Year-Round',
        description: 'Continuous production cycles with peak uniformity from October to May.',
      },
    ],
    hudNodes: [
      {
        id: 'node-02-1',
        label: 'Epicuticular Sheen',
        metric: 'Zero Cucurbitacin',
        x: 34,
        y: 52,
      },
      {
        id: 'node-02-2',
        label: 'Internal Cavity',
        metric: '100% Seedless Gel',
        x: 68,
        y: 53,
      },
    ],
    coordinates: 'LAT 23°04′N · LON 72°35′E',
    facilityLabel: '3G Biosphere Facility · ISO 22000 & GAP Certified',
    catalogCode: 'CAT-2025-CUC · 02-CUCURBITACEAE',
    brixOrPrimaryMetric: '4.8° Brix',
    storageTemp: '10°C – 12°C',
    packagingSummary: '10 kg Crate',
  },
  {
    index: 2,
    numberLabel: '03',
    shortName: 'Lettuce & Greens',
    title: 'Lettuce & Greens',
    titleStyle: 'sans-bold',
    scientificName: 'Lactuca sativa · Hydroponic Clean',
    classification: 'Romaine · Butterhead · Lollo Rosso',
    editorialTagline: 'Substrate-free pure nutrient flow with 95% water recirculation efficiency.',
    harvestWindow: '365-Day Predictable Hydroponic Harvest',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6s8V5RNb5L_k5V48niMH6pRDy3RBsFhE2VccONEln6fp5iQLtQfELTC8WrwiPxOLh1Cd25duynMXBQmKNPz4THg_sHQhf-BZUKZEpUHN_3n-Oaqom-nGnrGWf6RcRKWZIQKjqCEEe4Yoq0YcuDnlDXl5HfZ6sq2jZrF5To69eS6c27tCtPSCwLQgMnScPQA4lpyoxU9-Jt1HsF1qCH0xdwtVCVSrb3LZQ_o87fp5hMih48Nl7Ng1lIQ',
    imageAlt:
      'Studio product shot of pristine fresh organic Lettuce and Crisp Greens in a minimalist ceramic vessel',
    canvasBg: '#FBF9F5',
    auraPrimary: 'rgba(59, 110, 71, 0.15)',
    auraSecondary: 'rgba(180, 225, 165, 0.16)',
    accentColor: '#3B6E47',
    shadowTint: 'rgba(22, 25, 21, 0.20)',
    leftSpecs: [
      {
        id: '03-a',
        code: 'Spec 03-A',
        category: 'Parietal Metric',
        value: 'Tender Crisp Texture',
        description: 'High cell turgor and foliar hydration across inner rosette leaves.',
      },
      {
        id: '03-b',
        code: 'Spec 03-B',
        category: 'Sterile Rooting',
        value: 'Zero Soil Contact',
        description: 'Substrate-free pure nutrient film flow eliminating soil-borne pathogens.',
      },
      {
        id: '03-c',
        code: 'Spec 03-C',
        category: 'Ecosystem Vitality',
        value: 'Closed-Loop Hydroponics',
        description: '95% water recirculation efficiency with automated mineral dosing.',
      },
    ],
    rightSpecs: [
      {
        id: '03-d',
        code: 'Spec 03-D',
        category: 'Thermal Retention',
        value: '2°C – 4°C Cold Chain',
        description: 'Immediate rapid hydro-cooling locking in cellular crispness.',
      },
      {
        id: '03-e',
        code: 'Spec 03-E',
        category: 'Standardized Form',
        value: '2 kg Pre-Cooled Punnets',
        description: 'Bespoke protected breathable punnets preventing leaf compression.',
      },
      {
        id: '03-f',
        code: 'Spec 03-F',
        category: 'Yield Uniformity',
        value: 'Year-Round Harvest',
        description: '365-day predictable production independent of external weather.',
      },
    ],
    hudNodes: [
      {
        id: 'node-03-1',
        label: 'Foliar Hydration',
        metric: '98.8% Turgor',
        x: 42,
        y: 38,
      },
      {
        id: 'node-03-2',
        label: 'Nutrient Film EC',
        metric: '1.6 mS/cm Clean',
        x: 58,
        y: 54,
      },
    ],
    coordinates: 'LAT 12.9716°N · LON 77.5946°E · ALT 920M MSL',
    facilityLabel: 'Precision Cultivation Lab · Index 2025',
    catalogCode: 'CAT-2025-LET · 03-ASTERACEAE',
    brixOrPrimaryMetric: '95% H₂O Loop',
    storageTemp: '2°C – 4°C',
    packagingSummary: '2 kg Punnets',
  },
  {
    index: 3,
    numberLabel: '04',
    shortName: 'Selected Brinjal',
    title: 'Selected Brinjal',
    titleStyle: 'serif',
    scientificName: 'Solanum melongena',
    classification: 'Export Spec (Glossy Purple)',
    editorialTagline: 'Anthocyanin chromatic value curated for premium visual shelf-appeal.',
    harvestWindow: 'Harvest Window · November to June',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAbkK8NLJ6Y27F3ZgkTEtoAdYuRZCfTMO7Tv6ro-RDx3-xBLExjMIP8ukby0ri3RHjK6Rsi-t8YSSKxs2yqll3azdnj4hIbngUr28X_-lCG-KvndTLi86EJ-xME_19Qtu5ve9277B9XTg26etPaSOJGbBUOYRf7nI6OGrf2hrwpCbYco1YsmSTUUuzy835LbRnQak5VRd5NCnTIPfSMctbut-WGRCUTwnvG_AbdM6smPqneTG0Dtz2NjA',
    imageAlt:
      'Studio product shot of a glossy deep royal purple brinjal specimen with fresh green calyx',
    canvasBg: '#F7F9F7',
    auraPrimary: 'rgba(88, 38, 84, 0.14)',
    auraSecondary: 'rgba(45, 71, 57, 0.10)',
    accentColor: '#4A2E46',
    shadowTint: 'rgba(32, 20, 30, 0.28)',
    leftSpecs: [
      {
        id: '04-a',
        code: 'Spec 04-A',
        category: 'Morphology',
        value: 'Seedless Firm Flesh',
        description:
          'Ultra-dense internal pulp with suppressed calyx bitterness and rapid culinary stability.',
      },
      {
        id: '04-b',
        code: 'Spec 04-B',
        category: 'Ecology',
        value: 'Biological IPM Grown',
        description:
          'Beneficial insect crop protection ensuring MRL-free export grade skin purity.',
      },
      {
        id: '04-c',
        code: 'Spec 04-C',
        category: 'Pigment',
        value: 'Glossy Purple Luster',
        description:
          'Anthocyanin chromatic value curated for premium visual shelf-appeal and cell elasticity.',
      },
    ],
    rightSpecs: [
      {
        id: '04-d',
        code: 'Spec 04-D',
        category: 'Cold Chain',
        value: '10°C – 12°C Storage',
        description:
          'Controlled respiration & turgor retention preserving calyx hydration without chilling injury.',
      },
      {
        id: '04-e',
        code: 'Spec 04-E',
        category: 'Packaging',
        value: '7 kg Ventilated Box',
        description:
          'Bespoke export corrugated crate engineered with single-layer moisture cushion dividers.',
      },
      {
        id: '04-f',
        code: 'Spec 04-F',
        category: 'Availability',
        value: 'Nov – Jun Season',
        description:
          'Peak production window aligned with Mediterranean and Gulf regional import schedules.',
      },
    ],
    hudNodes: [
      {
        id: 'node-04-1',
        label: 'Calyx Chlorophyll',
        metric: 'Freshness Locked',
        x: 59,
        y: 34,
      },
      {
        id: 'node-04-2',
        label: 'Anthocyanin Luster',
        metric: 'MRL-Free Epidermis',
        x: 44,
        y: 56,
      },
    ],
    coordinates: 'LAT 18°31′N · LON 73°51′E',
    facilityLabel: 'Elevation 560M · Greenhouse Lot D',
    catalogCode: 'CAT-2025-BRN · 04-SOLANACEAE',
    brixOrPrimaryMetric: 'Seedless Pulp',
    storageTemp: '10°C – 12°C',
    packagingSummary: '7 kg Ventilated Box',
  },
  {
    index: 4,
    numberLabel: '05',
    shortName: 'Grounded Tomato',
    title: 'Grounded Tomato',
    titleStyle: 'italic-serif',
    scientificName: 'Solanum lycopersicum',
    classification: 'High Lycopene Table Tomato',
    editorialTagline: 'Rich natural sugars and balanced organic acidity curated for savory umami depth.',
    harvestWindow: 'Cultivation Specs · Harvest Window · Year-Round',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBABrqgYebI3NghtfPzUGvEc058tzL4lo1lCxoxG8sJgOY36cTwSU4XF3sSV92kfcaafrzz2nOMeVToOoosI3Gg7r6QI4RB24rYdsF_JSdYbcbcI3ZGaUeYTQUNoJEImnsg68NHbheFS7fR5A9p7361g2vNl-okrc1AFg-c_jokgkKtkqNZPOtdjoNFnY8Q-GDdQGDBI95wqOPiRq6wpfCAgb3WfXbHMbYneMQwMdWPFAACRFmUljC-yw',
    imageAlt: 'Grounded Tomato Specimen with fresh green vine calyx and water droplets',
    canvasBg: '#F5FBF5',
    auraPrimary: 'rgba(198, 45, 36, 0.13)',
    auraSecondary: 'rgba(53, 104, 75, 0.10)',
    accentColor: '#35684B',
    shadowTint: 'rgba(21, 36, 28, 0.24)',
    leftSpecs: [
      {
        id: '05-a',
        code: 'Spec 05-A',
        category: 'Brix Density',
        value: '5.8° Brix Profile',
        description:
          'Rich natural sugars and balanced organic acidity curated for savory umami depth.',
      },
      {
        id: '05-b',
        code: 'Spec 05-B',
        category: 'Pericarp Integrity',
        value: 'Thick-Walled Pericarp',
        description:
          'Firm locular gel retention engineered specifically for long-distance transit durability.',
      },
      {
        id: '05-c',
        code: 'Spec 05-C',
        category: 'Lycopene Index',
        value: 'Deep Crimson Maturity',
        description:
          'Elevated antioxidant carotenoid density yielding radiant luster and skin elasticity.',
      },
    ],
    rightSpecs: [
      {
        id: '05-d',
        code: 'Spec 05-D',
        category: 'Cold Chain',
        value: '10°C – 13°C Storage',
        description:
          'Calculated chill-injury prevention envelope preserving calyx aroma and stem turgidity.',
      },
      {
        id: '05-e',
        code: 'Spec 05-E',
        category: 'Packaging',
        value: '10 kg Ventilated Carton',
        description:
          'Multi-cushioned export grade carton with individual cellular partition protection.',
      },
      {
        id: '05-f',
        code: 'Spec 05-F',
        category: 'Harvest Cycle',
        value: 'Year-Round Harvest',
        description:
          'Continuous high-wire production yielding uniform caliber table tomatoes across all seasons.',
      },
    ],
    hudNodes: [
      {
        id: 'node-05-1',
        label: 'Calyx Viability',
        metric: '99.4% Turgid',
        x: 49,
        y: 32,
      },
      {
        id: 'node-05-2',
        label: 'Turgor Pressure',
        metric: '1.48 MPa · 65–75mm Ø',
        x: 45,
        y: 57,
      },
    ],
    coordinates: 'LAT 18°31′N · LON 73°51′E',
    facilityLabel: 'Glasshouse Lot GH-IV-Pune-North · HEPA ISO Class 6',
    catalogCode: 'CAT-2025-TOM · 05-SOLANACEAE',
    brixOrPrimaryMetric: '5.8° Brix',
    storageTemp: '10°C – 13°C',
    packagingSummary: '10 kg Carton',
  },
  {
    index: 5,
    numberLabel: '06',
    shortName: 'Considered Broccoli',
    title: 'Considered Broccoli',
    titleStyle: 'italic-serif',
    scientificName: 'Brassica oleracea var. italica',
    classification: 'Highland Crown',
    editorialTagline: 'Dense architectural crown with tight dark-green florets and zero yellowing.',
    harvestWindow: 'Cultivation Specs · Harvest Window · November to March',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1VywSEcsLaT9GaqoAazCWUz-wzG89aFaHJxtQhI142nzYDBvqIBV9dF617rsdSyrYaLUKnML8j6qwnEDHRPCRnKl8ZBKWs2mjaSbTkHH9isYtjNjNGoKxn_WTWB60YYfUbP2tr0wXQ157-862rzm7dUpEzD4Ywac46ei3xIMYBhVHBYat80JZA2qsIGhK0Fz57QQk54-hZocDb4aH1bV2Zg_R5dwFBJEzlXhT2kcDPPaQWN7X6UD8P6-xBv',
    imageAlt: 'Considered Broccoli Specimen 06 Studio Botanical Plate',
    canvasBg: '#F6FAF6',
    auraPrimary: 'rgba(27, 77, 52, 0.15)',
    auraSecondary: 'rgba(156, 211, 175, 0.14)',
    accentColor: '#2F6346',
    shadowTint: 'rgba(23, 29, 26, 0.25)',
    leftSpecs: [
      {
        id: '06-a',
        code: 'Spec 06-A',
        category: 'Morphology',
        value: 'Compact Dark-Green Bead',
        description: 'Dense architectural crown with tight florets and zero yellowing.',
      },
      {
        id: '06-b',
        code: 'Spec 06-B',
        category: 'Pre-Cooling',
        value: 'Immediate Hydro-Cooled',
        description: 'Post-harvest core temperature reduction damping ethylene release.',
      },
      {
        id: '06-c',
        code: 'Spec 06-C',
        category: 'Moisture Retention',
        value: '95% Relative Humidity',
        description: 'Preserving crisp stalk cell turgor and tender edible stalk integrity.',
      },
    ],
    rightSpecs: [
      {
        id: '06-d',
        code: 'Spec 06-D',
        category: 'Cold Chain',
        value: '0°C – 2°C Storage',
        description: 'Strict chilled distribution envelope preventing floret respiration.',
      },
      {
        id: '06-e',
        code: 'Spec 06-E',
        category: 'Export Packaging',
        value: '8 kg Iced CFB Box',
        description: 'Specially lined corrugated crate with food-grade ice preservation.',
      },
      {
        id: '06-f',
        code: 'Spec 06-F',
        category: 'Availability',
        value: 'Nov – Mar Season',
        description:
          'Peak winter cultivation window aligned with premium global retail export.',
      },
    ],
    hudNodes: [
      {
        id: 'node-06-1',
        label: 'Node 06.C Crown',
        metric: '140–160mm Target Head',
        x: 56,
        y: 35,
      },
      {
        id: 'node-06-2',
        label: 'Stalk Turgor',
        metric: '95% RH Hydrolink',
        x: 54,
        y: 62,
      },
    ],
    coordinates: 'LAT 18°31′N · LON 73°51′E',
    facilityLabel: 'Highland Crown · Target Phenotype 140–160mm Head',
    catalogCode: 'CAT-2025-BRC · 06-BRASSICACEAE',
    brixOrPrimaryMetric: '140–160mm Crown',
    storageTemp: '0°C – 2°C',
    packagingSummary: '8 kg Iced CFB Box',
  },
  {
    index: 6,
    numberLabel: '07',
    shortName: 'Reliable Cabbage',
    title: 'Reliable Cabbage',
    titleStyle: 'serif',
    scientificName: 'Brassica oleracea var. capitata',
    classification: 'Compact Field Head',
    editorialTagline: 'Tightly packed waxy wrapper leaves with micro-veining and uniform core density.',
    harvestWindow: 'Cultivation Specs · Harvest Window · Year-Round',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGy6hQ6PYbbIGATfHd0MBuaotdt1_41vCtnhl9FY5YymSP6rxBhrUUdue3JrGHYOZI0lFz7ZyArQY4cMsNaNUv2t9h_T3q8YHkUTnDcNnpXGp9Wt-iLtRbTN6sfJlkSqvyGvXCW9WXboAZesMXd1u7HzKfcK_qmoqoFOPuhYPk3PghuT_vlORn5JE8o24BFZsIT--7YfZgKPBJQf_MnmRpWR_TTlxkrcfHVpNtpS0IDnoz59EVVaQtCA',
    imageAlt: 'Brassica oleracea var. capitata Reliable Cabbage specimen with water droplets',
    canvasBg: '#F5FBF5',
    auraPrimary: 'rgba(69, 118, 90, 0.14)',
    auraSecondary: 'rgba(183, 239, 202, 0.16)',
    accentColor: '#35684B',
    shadowTint: 'rgba(23, 29, 26, 0.22)',
    leftSpecs: [
      {
        id: '07-a',
        code: 'Spec 07-A',
        category: 'Morphology',
        value: 'Dense Spherical Head',
        description:
          'Tightly packed waxy wrapper leaves with micro-veining and uniform core density.',
      },
      {
        id: '07-b',
        code: 'Spec 07-B',
        category: 'Durability',
        value: 'High Transport Resilience',
        description:
          'High structural cell wall turgor preventing transit bruising during global export.',
      },
      {
        id: '07-c',
        code: 'Spec 07-C',
        category: 'Foliar Coating',
        value: 'Natural Epicuticular Wax',
        description:
          'Protective natural bloom preserving internal leaf moisture and crisp freshness.',
      },
    ],
    rightSpecs: [
      {
        id: '07-d',
        code: 'Spec 07-D',
        category: 'Cold Chain',
        value: '2°C – 4°C Storage',
        description:
          'Rigorous low-temperature post-harvest chain damping leaf respiration and yellowing.',
      },
      {
        id: '07-e',
        code: 'Spec 07-E',
        category: 'Packaging',
        value: '15 kg Ventilated Mesh Bag',
        description:
          'Heavy-duty aeration-grade breathable export sacks with anti-condensation barrier.',
      },
      {
        id: '07-f',
        code: 'Spec 07-F',
        category: 'Harvest Availability',
        value: 'Year-Round Consistency',
        description:
          'Staggered planting regimes providing predictable commercial supplies year-round.',
      },
    ],
    hudNodes: [
      {
        id: 'node-07-1',
        label: 'Epicuticular Bloom',
        metric: '98.4% Uniformity',
        x: 43,
        y: 39,
      },
      {
        id: 'node-07-2',
        label: 'Target Phenotype',
        metric: '1.2 – 1.8 kg Head',
        x: 58,
        y: 57,
      },
    ],
    coordinates: 'LAT 18°31′N · LON 73°51′E',
    facilityLabel: 'Glasshouse Lot GH-IV-Pune-North · 98.4% Uniformity',
    catalogCode: 'CAT-2025-CAB · 07-BRASSICACEAE',
    brixOrPrimaryMetric: '1.2–1.8 kg Head',
    storageTemp: '2°C – 4°C',
    packagingSummary: '15 kg Mesh Bag',
  },
  {
    index: 7,
    numberLabel: '08',
    shortName: 'Red Chilly',
    title: 'Red Chilly',
    titleStyle: 'italic-serif',
    scientificName: 'Capsicum annuum var. acuminatum',
    classification: 'High Pungency · Active Capsaicinoid Index',
    editorialTagline:
      'Concentrated capsaicinoid matrix delivering sharp, authentic sensory pungency.',
    harvestWindow: 'Active Capsaicinoid Index · Harvest Window · December to May',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBzothPMNT9BHmGS1S65VPEkC33Nj0RVpYWg7UA-V4zUwe8A7lL4ZIa0BoNsGVum2XD4J_W6-ZBo2alkkNQbhWgrwi_6D6_liPLQl6f5RlEHX3uu3ZUNRCZMhmH-A4C_4IC5X0jEEB3hScELyFBuz7u0TcUjuhCGSGCNycqqugdmBkpbYdTbZzm5s202xFrnrJlUPklyXahutKXCkyZFhYwpmjZB1pep__CsXyst4RyrcA9YDUVLNgdFw',
    imageAlt:
      'Studio still life photograph of three vibrant glossy red chilly peppers with fresh green calyxes',
    canvasBg: '#F7F9F7',
    auraPrimary: 'rgba(195, 38, 30, 0.14)',
    auraSecondary: 'rgba(53, 104, 75, 0.10)',
    accentColor: '#8B261D',
    shadowTint: 'rgba(32, 20, 20, 0.24)',
    leftSpecs: [
      {
        id: '08-a',
        code: 'Spec 08-A',
        category: 'Thermal Index',
        value: 'High SHU Heat Profile',
        description:
          'Concentrated capsaicinoid matrix delivering sharp, authentic sensory pungency and thermal stability.',
      },
      {
        id: '08-b',
        code: 'Spec 08-B',
        category: 'Chromatic Value',
        value: 'Deep Scarlet Luster',
        description:
          'Natural capsanthin pigment index curated for vibrant epidermal shelf longevity and photochemical defense.',
      },
      {
        id: '08-c',
        code: 'Spec 08-C',
        category: 'Seed Cavity',
        value: 'Tight Calyx Closure',
        description:
          'Intact stem retention minimizing moisture evacuation, calyx browning, and post-harvest physiological shrivel.',
      },
    ],
    rightSpecs: [
      {
        id: '08-d',
        code: 'Spec 08-D',
        category: 'Cold Chain',
        value: '8°C – 10°C Storage',
        description:
          'Controlled ambient humidity preventing chill-injury condensation while safeguarding calyx turgidity.',
      },
      {
        id: '08-e',
        code: 'Spec 08-E',
        category: 'Packaging',
        value: '5 kg Ventilated Box',
        description:
          'Export-spec corrugated fiberboard casing with dual-layer aeration perforation for consistent vapor expulsion.',
      },
      {
        id: '08-f',
        code: 'Spec 08-F',
        category: 'Availability',
        value: 'Dec – May Peak',
        description:
          'Dry-season precision harvest cycle providing uniform grade allocations for direct wholesale and export hubs.',
      },
    ],
    hudNodes: [
      {
        id: 'node-08-1',
        label: 'Capsaicinoid Matrix',
        metric: 'High SHU Pungency',
        x: 48,
        y: 44,
      },
      {
        id: 'node-08-2',
        label: 'Calyx Closure',
        metric: '99.6% Stem Seal',
        x: 62,
        y: 41,
      },
    ],
    coordinates: 'LAT 18°31′N · LON 73°51′E',
    facilityLabel: 'Elevation 560M · Greenhouse Lot E · 08-Solanaceae',
    catalogCode: 'CAT-2025-CHL · 08-SOLANACEAE',
    brixOrPrimaryMetric: 'High SHU Index',
    storageTemp: '8°C – 10°C',
    packagingSummary: '5 kg Ventilated Box',
  },
];
