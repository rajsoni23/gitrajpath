export const testCatalogue = {
  'ESR': {
    name: 'Erythrocyte Sedimentation Rate (ESR)',
    price: 100,
    params: [
      { name: 'ESR', unit: 'mm/hr', range: '[M: 0-15] [F: 0-20]', defaultValue: '10' }
    ]
  },
  'MANTOUX': {
    name: 'Mantoux Test',
    price: 100,
    params: [
      { name: 'Induration', unit: 'mm', range: '[0.4x0.2]', defaultValue: '0.4x0.2' },
      { name: 'Erythema', unit: 'mm', range: '[0.4x0.4]', defaultValue: '0.4x0.4' },
      { name: 'Ulceration', unit: '', range: '[]', defaultValue: 'Absent' },
      { name: 'Vesiculation', unit: '', range: '[]', defaultValue: 'Absent' },
      { name: 'Result', unit: '', range: '[48 HOURS]', defaultValue: 'Negative' }
    ]
  },
  'CBC': {
    name: 'COMPLETE BLOOD COUNT (CBC)',
    price: 350,
    params: [
      { name: 'Hemoglobin', unit: 'g/dL', range: '[M: 13.5-17.5] [F: 12.0-15.5]', defaultValue: '14.5' },
      { name: 'Total WBC Count', unit: '/µL', range: '[4000-11000]', defaultValue: '7500' },
      { name: 'Total Polymorphous', unit: '%', range: '[55-70%]', defaultValue: '65' },
      { name: 'Lymphocytes', unit: '%', range: '[20-40%]', defaultValue: '30' },
      { name: 'Eosinophils', unit: '%', range: '[1-6%]', defaultValue: '3' },
      { name: 'Monocytes', unit: '%', range: '[2-8%]', defaultValue: '5' },
      { name: 'Basophils', unit: '%', range: '[0-2%]', defaultValue: '0' },
      { name: 'RBC Count', unit: 'million/µL', range: '[M: 4.5-5.9] [F: 4.1-5.1]', defaultValue: '4.8' },
      { name: 'Platelet Count', unit: '/µL', range: '[150000-450000]', defaultValue: '250000' },
      { name: 'HCT(PCV)', unit: '%', range: '[M: 40-45] [F: 37-47]', defaultValue: '42' },
      { name: 'MCV', unit: 'fL', range: '[80-100]', defaultValue: '90' },
      { name: 'MCH', unit: 'pg', range: '[25-32]', defaultValue: '28.5' },
      { name: 'MCHC', unit: 'g/dL', range: '[20-40]', defaultValue: '32' }
    ]
  },
  'SUGAR': {
    name: 'Blood Sugar Profile',
    price: 50,
    params: [
      { name: 'Fasting Blood Sugar (FBS)', unit: 'mg/dL', range: '[70-110]', defaultValue: '90' },
      { name: 'Random Blood Sugar (RBS)', unit: 'mg/dL', range: '[70-140]', defaultValue: '100' }
    ]
  },
  'KFT': {
    name: 'KIDNEY FUNCTION TEST (KFT)',
    price: 600,
    params: [
      { name: 'Blood Urea', unit: 'mg/dL', range: '[12.6-42.6]', defaultValue: '25.0' },
      { name: 'Serum Creatinine', unit: 'mg/dL', range: '[M: 0.7-1.3] [F: 0.6-1.1]', defaultValue: '0.9' },
      { name: 'Serum Uric Acid', unit: 'mg/dL', range: '[M: 2.4-7.0] [F: 2.4-6.0]', defaultValue: '4.5' },
      { name: 'Calcium', unit: 'mg/dL', range: '[8.7-11.0]', defaultValue: '9.5' },
      { name: 'CRP', unit: 'mg/dL', range: '[0.5-6.0]', defaultValue: '1.2' },
      { name: 'S. Bilirubin (Total)', unit: 'mg/dL', range: '[0.3-1.0]', defaultValue: '0.6' },
      { name: 'Blood Sugar Fasting', unit: 'mg/dL', range: '[70-110]', defaultValue: '90' },
      { name: 'Blood Sugar Random', unit: 'mg/dL', range: '[70-140]', defaultValue: '100' },
      { name: 'ABO', unit: '', range: '[]', defaultValue: 'O Positive' },
      { name: 'BT', unit: 'Minutes', range: '[2-8]', defaultValue: '3' },
      { name: 'CT', unit: 'Minutes', range: '[5-9]', defaultValue: '6' },
      { name: 'VDRL', unit: '', range: '[Negative]', defaultValue: 'Negative' },
      { name: 'HIV', unit: '', range: '[Negative]', defaultValue: 'Negative' },
      { name: 'HBsAg', unit: '', range: '[Negative]', defaultValue: 'Negative' },
      { name: 'HCV', unit: '', range: '[Negative]', defaultValue: 'Negative' }
    ]
  },
  'LFT': {
    name: 'LIVER FUNCTION TEST (LFT)',
    price: 600,
    params: [
      { name: 'Total Bilirubin', unit: 'mg/dL', range: '[0.3-1.2]', defaultValue: '0.8' },
      { name: 'Direct Bilirubin', unit: 'mg/dL', range: '[0.0-0.3]', defaultValue: '0.2' },
      { name: 'Indirect Bilirubin', unit: 'mg/dL', range: '[0.2-0.9]', defaultValue: '0.6' },
      { name: 'SGOT (AST)', unit: 'U/L', range: '[10-40]', defaultValue: '25' },
      { name: 'SGPT (ALT)', unit: 'U/L', range: '[7-56]', defaultValue: '30' },
      { name: 'S.Alkaline Phosphatase', unit: 'U/L', range: '[44-147]', defaultValue: '95' },
      { name: 'Total Protein', unit: 'g/dL', range: '[6.0-8.3]', defaultValue: '7.2' },
      { name: 'Albumin', unit: 'g/dL', range: '[3.5-5.0]', defaultValue: '4.2' },
      { name: 'Globulin', unit: 'g/dL', range: '[2.0-3.5]', defaultValue: '2.8' }
    ]
  },
  'LIPID': {
    name: 'Lipid Profile',
    price: 500,
    params: [
      { name: 'Serum Cholesterol', unit: 'mg/dL', range: '[70-200]', defaultValue: '150' },
      { name: 'HDL Cholesterol', unit: 'mg/dL', range: '[M: 35-80] [F: 42-88]', defaultValue: '50' },
      { name: 'Triglycerides', unit: 'mg/dL', range: '[25-160]', defaultValue: '100' },
      { name: 'VLDL Cholesterol', unit: 'mg/dL', range: '[35-70]', defaultValue: '45' },
      { name: 'LDL Cholesterol', unit: 'mg/dL', range: '[75-150]', defaultValue: '100' },
      { name: 'Total Lipid / HDL Ratio', unit: 'mg/dL', range: '[400-800]', defaultValue: '500' }
    ]
  },
  'THYROID': {
    name: 'Thyroid Profile',
    price: 450,
    params: [
      { name: 'TSH (Thyroid Stimulating Hormone)', unit: 'µIU/mL', range: '[0.4-4.0]', defaultValue: '2.1' },
      { name: 'Total T3', unit: 'ng/dL', range: '[80-200]', defaultValue: '130' },
      { name: 'Total T4', unit: 'µg/dL', range: '[5.0-12.0]', defaultValue: '8.5' },
      { name: 'Free T3', unit: 'pg/mL', range: '[2.3-4.2]', defaultValue: '3.1' },
      { name: 'Free T4', unit: 'ng/dL', range: '[0.8-1.8]', defaultValue: '1.2' },
      { name: 'Anti Thyroid Peroxidase Antibody (Anti-TPO)', unit: 'IU/mL', range: '[0-35]', defaultValue: '10' },
      { name: 'Anti Thyroglobulin Antibody', unit: 'IU/mL', range: '[0-40]', defaultValue: '12' },
      { name: 'Thyroglobulin', unit: 'ng/mL', range: '[3-40]', defaultValue: '15' },
      { name: 'Calcitonin', unit: 'pg/mL', range: '[M: 0-10] [F: 0-5]', defaultValue: '3' }
    ]
  },
  'ELECTROLYTES': {
    name: 'Electrolytes Profile',
    price: 700,
    params: [
      { name: 'Blood Urea', unit: 'mg/dL', range: '[12.6-42.6]', defaultValue: '25.0' },
      { name: 'Serum Creatinine', unit: 'mg/dL', range: '[M: 0.7-1.3] [F: 0.6-1.1]', defaultValue: '0.9' },
      { name: 'Blood Sugar Random', unit: 'mg/dL', range: '[70-140]', defaultValue: '100' },
      { name: 'Sodium', unit: 'mmol/L', range: '[136-145]', defaultValue: '140' },
      { name: 'Potassium', unit: 'mmol/L', range: '[3.5-5.2]', defaultValue: '4.2' },
      { name: 'Chloride', unit: 'mmol/L', range: '[96-108]', defaultValue: '102' }
    ]
  },
  'URINE': {
    name: 'Urine Analysis',
    price: 100,
    params: [
      { name: 'Quantity', unit: 'mL', range: '[]', defaultValue: '30' },
      { name: 'Colour', unit: '', range: '[]', defaultValue: 'Pale Yellow' },
      { name: 'Deposit', unit: '', range: '[]', defaultValue: 'Nil' },
      { name: 'Specific Gravity', unit: '', range: '[]', defaultValue: '1.020' },
      { name: 'pH', unit: '', range: '[4.5-8.0]', defaultValue: '6.0' },
      { name: 'Blood', unit: '', range: '[]', defaultValue: 'Nil' },
      { name: 'Nitrites', unit: '', range: '[]', defaultValue: 'Negative' },
      { name: 'Leucocytes', unit: '', range: '[]', defaultValue: 'Nil' },
      { name: 'Bilirubin (Bile)', unit: '', range: '[]', defaultValue: 'Absent' },
      { name: 'Ketone Bodies', unit: '', range: '[]', defaultValue: 'Absent' },
      { name: 'Reaction', unit: '', range: '[]', defaultValue: 'Acidic' },
      { name: 'Protein', unit: '', range: '[]', defaultValue: 'Nil' },
      { name: 'Sugar', unit: '', range: '[]', defaultValue: 'Nil' },
      { name: 'RBC', unit: '', range: '[]', defaultValue: 'Nil' },
      { name: 'Pus Cells', unit: '/HPF', range: '[]', defaultValue: '1-2' },
      { name: 'Epithelial Cells', unit: '/HPF', range: '[]', defaultValue: '2-3' },
      { name: 'Casts', unit: '', range: '[]', defaultValue: 'Nil' },
      { name: 'Crystals', unit: '', range: '[]', defaultValue: 'Nil' },
      { name: 'Bacteria', unit: '', range: '[]', defaultValue: 'Absent' }
    ]
  },
  'STOOL': {
    name: 'Stool Routine Examination',
    price: 200,
    params: [
      { name: 'Color', unit: '', range: 'Brown', defaultValue: 'Brown' },
      { name: 'Consistency', unit: '', range: 'Soft', defaultValue: 'Soft' },
      { name: 'Mucus', unit: '', range: 'Absent', defaultValue: 'Absent' },
      { name: 'Blood', unit: '', range: 'Absent', defaultValue: 'Absent' },
      { name: 'Occult Blood', unit: '', range: 'Negative', defaultValue: 'Negative' },
      { name: 'Reducing Sugar', unit: '', range: 'Negative', defaultValue: 'Negative' },
      { name: 'Fat Globules', unit: '', range: 'Absent', defaultValue: 'Absent' },
      { name: 'RBC', unit: '/HPF', range: 'Absent', defaultValue: 'Absent' },
      { name: 'Pus Cells', unit: '/HPF', range: '[0-2]', defaultValue: '0-1' },
      { name: 'Ova', unit: '', range: 'Not Seen', defaultValue: 'Not Seen' },
      { name: 'Cysts', unit: '', range: 'Not Seen', defaultValue: 'Not Seen' },
      { name: 'Parasites', unit: '', range: 'Not Seen', defaultValue: 'Not Seen' },
      { name: 'Yeast', unit: '', range: 'Absent', defaultValue: 'Absent' }
    ]
  },
  'SEMEN': {
    name: 'Semen Analysis',
    price: 1000,
    params: [
      { name: 'Quantity', unit: 'mL', range: '[]', defaultValue: '3.0' },
      { name: 'Colour', unit: '', range: '[]', defaultValue: 'Greyish White' },
      { name: 'Appearance', unit: '', range: '[]', defaultValue: 'Viscous' },
      { name: 'Liquefaction Time', unit: 'Minutes', range: '[]', defaultValue: '30' },
      { name: 'Motility', unit: '%', range: '[60-95%]', defaultValue: '75' },
      { name: 'Total Sperm Count', unit: 'Mill/mL', range: '[60-150Mill]', defaultValue: '80' },
      { name: 'pH', unit: '', range: '[7-8]', defaultValue: '7.5' },
      { name: 'Reaction', unit: '', range: '[]', defaultValue: 'Alkaline' },
      { name: 'Normal Sperms', unit: '%', range: '[]', defaultValue: '80' },
      { name: 'Abnormal Sperms', unit: '%', range: '[]', defaultValue: '20' }
    ]
  },
  'BLOODGROUP': {
    name: 'Blood Group & Rh Typing',
    price: 100,
    params: [
      { name: 'ABO Group', unit: '', range: 'A / B / AB / O', defaultValue: 'O' },
      { name: 'Rh Type', unit: '', range: 'Positive / Negative', defaultValue: 'Positive' },
      { name: 'Indirect Coombs Test', unit: '', range: 'Negative', defaultValue: 'Negative' },
      { name: 'Direct Coombs Test', unit: '', range: 'Negative', defaultValue: 'Negative' }
    ]
  },
  'PREGNANCY': {
    name: 'Pregnancy Profile',
    price: 300,
    params: [
      { name: 'Urine Pregnancy Test', unit: '', range: 'Negative', defaultValue: 'Negative' },
      { name: 'Serum β-hCG', unit: 'mIU/mL', range: '[0-5]', defaultValue: '1.2' }
    ]
  },
  'WIDAL': {
    name: 'WIDAL TEST SLIDE AGGLUTINATION',
    price: 300,
    params: [
      { name: 'Widal Result', unit: '', range: 'Negative', defaultValue: 'Negative' },
      {
        name: 'WIDAL TEST',
        type: 'table',
        status: 'BORDER LINE',
        headers: ['ANTIGENS', '1/20', '1/40', '1/80', '1/160', '1/320'],
        rows: [
          { antigen: "S.TYPHI 'O'", values: ['-', '-', '-', '-', '-'] },
          { antigen: "S.TYPHI 'H'", values: ['-', '-', '-', '-', '-'] },
          { antigen: "S.PARATYPHI 'AH'", values: ['-', '-', '-', '-', '-'] },
          { antigen: "S.PARATYPHI 'BH'", values: ['-', '-', '-', '-', '-'] }
        ]
      }
    ]
  },
  'RFT': {
    name: 'Renal Function Test(RFT)',
    price: 800,
    params: [
      { name: 'Blood Urea', unit: 'mg/dL', range: '[12.6-42.6]', defaultValue: '25.0' },
      { name: 'Serum Creatinine', unit: 'mg/dL', range: '[M: 0.7-1.3] [F: 0.6-1.1]', defaultValue: '0.9' },
      { name: 'Blood Sugar Random', unit: 'mg/dL', range: '[70-140]', defaultValue: '100' },
      { name: 'Sodium', unit: 'mmol/L', range: '[136-145]', defaultValue: '140' },
      { name: 'Potassium', unit: 'mmol/L', range: '[3.5-5.2]', defaultValue: '4.2' },
      { name: 'Chloride', unit: 'mmol/L', range: '[96-108]', defaultValue: '102' }
    ]
  },
  'SEROLOGY_PANEL': {
    name: 'Serology & Rapid Tests',
    price: 1200,
    params: [
      { name: 'MP', unit: '', range: 'NOT SEEN', defaultValue: 'NOT SEEN' },
      { name: 'Widal Result', unit: '', range: 'Negative', defaultValue: 'Negative' },
      {
        name: 'WIDAL TEST',
        type: 'table',
        status: 'BORDER LINE',
        headers: ['ANTIGENS', '1/20', '1/40', '1/80', '1/160', '1/320'],
        rows: [
          { antigen: "S.TYPHI 'O'", values: ['-', '-', '-', '-', '-'] },
          { antigen: "S.TYPHI 'H'", values: ['-', '-', '-', '-', '-'] },
          { antigen: "S.PARATYPHI 'AH'", values: ['-', '-', '-', '-', '-'] },
          { antigen: "S.PARATYPHI 'BH'", values: ['-', '-', '-', '-', '-'] }
        ]
      },
      { name: 'DENGUE IgG', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'DENGUE IgM', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'DENGUE NS1', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'DENGUE TEST', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'CHIKUNGUNYA IgM', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'TYPHIDOT IgG', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'TYPHIDOT IgM', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'HIV', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'HBS/AG', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'HCV', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'VDRL', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' }
    ]
  },
  'GENETIC_PANEL': {
    name: 'Genetic & Molecular Tests',
    price: 900,
    params: [
      { name: 'Filaria Antibody', unit: '+/-', range: 'Negative', defaultValue: 'Negative' },
      { name: 'ABO Group', unit: '', range: 'A / B / AB / O', defaultValue: 'O' },
      { name: 'BT', unit: 'MIN', range: '2-8', defaultValue: '3' },
      { name: 'CT', unit: 'MIN', range: '5-9', defaultValue: '6' }
    ]
  }
};
