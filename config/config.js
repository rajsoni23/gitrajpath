export const testCatalogue = {
  'ESR': {
    name: 'Erythrocyte Sedimentation Rate (ESR)',
    price: 100,
    params: [
      { name: 'ESR', unit: 'mm/hr', range: '[M: 0-15] [F: 0-20]' }
    ]
  },
  'MANTOUX': {
    name: 'Mantoux Test',
    price: 100,
    params: [
      { name: 'Induration', unit: 'mm', range: '[0.4x0.2]' },
      { name: 'Erythema', unit: 'mm', range: '[0.4x0.4]' },
      { name: 'Ulceration', unit: '', range: '[]' },
      { name: 'Vesiculation', unit: '', range: '[]' },
      { name: 'Result', unit: '', range: '[48 HOURS]' }
    ]
  },
  'CBC': {
    name: 'COMPLETE BLOOD COUNT (CBC)',
    price: 350,
    params: [
      { name: 'Hemoglobin', unit: 'g/dL', range: '[M: 13.5-17.5] [F: 12.0-15.5]' },
      { name: 'Total WBC Count', unit: '/µL', range: '[4000-11000]' },
      { name: 'Total Polymorphous', unit: '%', range: '[55-70%]' },
      { name: 'Lymphocytes', unit: '%', range: '[20-40%]' },
      { name: 'Eosinophils', unit: '%', range: '[1-6%]' },
      { name: 'Monocytes', unit: '%', range: '[2-8%]' },
      { name: 'Basophils', unit: '%', range: '[0-2%]' },
      { name: 'RBC Count', unit: 'million/µL', range: '[M: 4.5-5.9] [F: 4.1-5.1]' },
      { name: 'Platelet Count', unit: '/µL', range: '[150000-450000]' },
      { name: 'Hematocrit (PCV)', unit: '%', range: '[M: 40-45] [F: 37-47]' },
      { name: 'MCV', unit: 'fL', range: '[80-100]' },
      { name: 'MCH', unit: 'pg', range: '[25-32]' },
      { name: 'MCHC', unit: 'g/dL', range: '[20-40]' }
    ]
  },
  'SUGAR': {
    name: 'Blood Sugar Profile',
    price: 50,
    params: [
      { name: 'Fasting Blood Sugar (FBS)', unit: 'mg/dL', range: '[70-110]' },
      { name: 'Random Blood Sugar (RBS)', unit: 'mg/dL', range: '[70-140]' }
    ]
  },
  'KFT': {
    name: 'KIDNEY FUNCTION TEST (KFT)',
    price: 600,
    params: [
      { name: 'Blood Urea', unit: 'mg/dL', range: '[12.6-42.6]' },
      { name: 'Serum Creatinine', unit: 'mg/dL', range: '[M: 0.7-1.3] [F: 0.6-1.1]' },
      { name: 'Serum Uric Acid', unit: 'mg/dL', range: '[M: 2.4-7.0] [F: 2.4-6.0]' },
      { name: 'Calcium', unit: 'mg/dL', range: '[8.7-11.0]' },
      { name: 'CRP', unit: 'mg/dL', range: '[0.5-6.0]' },
      { name: 'S. Bilirubin (Total)', unit: 'mg/dL', range: '[0.3-1.0]' },
      { name: 'Blood Sugar Fasting', unit: 'mg/dL', range: '[70-110]' },
      { name: 'Blood Sugar Random', unit: 'mg/dL', range: '[70-140]' },
      { name: 'ABO', unit: '', range: '[]' },
      { name: 'BT', unit: 'Minutes', range: '[2-8]' },
      { name: 'CT', unit: 'Minutes', range: '[5-9]' },
      { name: 'VDRL', unit: '', range: '[Negative]' },
      { name: 'HIV', unit: '', range: '[Negative]' },
      { name: 'HBsAg', unit: '', range: '[Negative]' },
      { name: 'HCV', unit: '', range: '[Negative]' }
    ]
  },
  'LFT': {
    name: 'LIVER FUNCTION TEST (LFT)',
    price: 600,
    params: [
      { name: 'Total Bilirubin', unit: 'mg/dL', range: '[0.3-1.2]' },
      { name: 'Direct Bilirubin', unit: 'mg/dL', range: '[0.0-0.3]' },
      { name: 'Indirect Bilirubin', unit: 'mg/dL', range: '[0.2-0.9]' },
      { name: 'SGOT (AST)', unit: 'U/L', range: '[10-40]' },
      { name: 'SGPT (ALT)', unit: 'U/L', range: '[7-56]' },
      { name: 'S.Alkaline Phosphatase', unit: 'U/L', range: '[44-147]' },
      { name: 'Total Protein', unit: 'g/dL', range: '[6.0-8.3]' },
      { name: 'Albumin', unit: 'g/dL', range: '[3.5-5.0]' },
      { name: 'Globulin', unit: 'g/dL', range: '[2.0-3.5]' }
    ]
  },
  'LIPID': {
    name: 'Lipid Profile',
    price: 500,
    params: [
      { name: 'Serum Cholesterol', unit: 'mg/dL', range: '[70-200]' },
      { name: 'HDL Cholesterol', unit: 'mg/dL', range: '[M: 35-80] [F: 42-88]' },
      { name: 'Triglycerides', unit: 'mg/dL', range: '[25-160]' },
      { name: 'VLDL Cholesterol', unit: 'mg/dL', range: '[35-70]' },
      { name: 'LDL Cholesterol', unit: 'mg/dL', range: '[75-150]' },
      { name: 'Total Lipid / HDL Ratio', unit: 'mg/dL', range: '[400-800]' }
    ]
  },
  'THYROID': {
    name: 'Thyroid Profile',
    price: 450,
    params: [
      { name: 'TSH (Thyroid Stimulating Hormone)', unit: 'µIU/mL', range: '[0.4-4.0]' },
      { name: 'Total T3', unit: 'ng/dL', range: '[80-200]' },
      { name: 'Total T4', unit: 'µg/dL', range: '[5.0-12.0]' },
      { name: 'Free T3', unit: 'pg/mL', range: '[2.3-4.2]' },
      { name: 'Free T4', unit: 'ng/dL', range: '[0.8-1.8]' },
      { name: 'Anti Thyroid Peroxidase Antibody (Anti-TPO)', unit: 'IU/mL', range: '[0-35]' },
      { name: 'Anti Thyroglobulin Antibody', unit: 'IU/mL', range: '[0-40]' },
      { name: 'Thyroglobulin', unit: 'ng/mL', range: '[3-40]' },
      { name: 'Calcitonin', unit: 'pg/mL', range: '[M: 0-10] [F: 0-5]' }
    ]
  },
  'ELECTROLYTES': {
    name: 'Electrolytes Profile',
    price: 700,
    params: [
      { name: 'Blood Urea', unit: 'mg/dL', range: '[12.6-42.6]' },
      { name: 'Serum Creatinine', unit: 'mg/dL', range: '[M: 0.7-1.3] [F: 0.6-1.1]' },
      { name: 'Blood Sugar Random', unit: 'mg/dL', range: '[70-140]' },
      { name: 'Sodium', unit: 'mmol/L', range: '[136-145]' },
      { name: 'Potassium', unit: 'mmol/L', range: '[3.5-5.2]' },
      { name: 'Chloride', unit: 'mmol/L', range: '[96-108]' }
    ]
  },
  'URINE': {
    name: 'Urine Analysis',
    price: 100,
    params: [
      { name: 'Quantity', unit: 'mL', range: '[]' },
      { name: 'Colour', unit: '', range: '[]' },
      { name: 'Deposit', unit: '', range: '[]' },
      { name: 'Specific Gravity', unit: '', range: '[]' },
      { name: 'pH', unit: '', range: '[4.5-8.0]' },
      { name: 'Blood', unit: '', range: '[]' },
      { name: 'Nitrites', unit: '', range: '[]' },
      { name: 'Leucocytes', unit: '', range: '[]' },
      { name: 'Bilirubin (Bile)', unit: '', range: '[]' },
      { name: 'Ketone Bodies', unit: '', range: '[]' },
      { name: 'Reaction', unit: '', range: '[]' },
      { name: 'Protein', unit: '', range: '[]' },
      { name: 'Sugar', unit: '', range: '[]' },
      { name: 'RBC', unit: '', range: '[]' },
      { name: 'Pus Cells', unit: '/HPF', range: '[]' },
      { name: 'Epithelial Cells', unit: '/HPF', range: '[]' },
      { name: 'Casts', unit: '', range: '[]' },
      { name: 'Crystals', unit: '', range: '[]' },
      { name: 'Bacteria', unit: '', range: '[]' }
    ]
  },
  'STOOL': {
    name: 'Stool Routine Examination',
    price: 200,
    params: [
      { name: 'Color', unit: '', range: 'Brown' },
      { name: 'Consistency', unit: '', range: 'Soft' },
      { name: 'Mucus', unit: '', range: 'Absent' },
      { name: 'Blood', unit: '', range: 'Absent' },
      { name: 'Occult Blood', unit: '', range: 'Negative' },
      { name: 'Reducing Sugar', unit: '', range: 'Negative' },
      { name: 'Fat Globules', unit: '', range: 'Absent' },
      { name: 'RBC', unit: '/HPF', range: 'Absent' },
      { name: 'Pus Cells', unit: '/HPF', range: '[0-2]' },
      { name: 'Ova', unit: '', range: 'Not Seen' },
      { name: 'Cysts', unit: '', range: 'Not Seen' },
      { name: 'Parasites', unit: '', range: 'Not Seen' },
      { name: 'Yeast', unit: '', range: 'Absent' }
    ]
  },
  'SEMEN': {
    name: 'Semen Analysis',
    price: 1000,
    params: [
      { name: 'Quantity', unit: 'mL', range: '[]' },
      { name: 'Colour', unit: '', range: '[]' },
      { name: 'Appearance', unit: '', range: '[]' },
      { name: 'Liquefaction Time', unit: 'Minutes', range: '[]' },
      { name: 'Motility', unit: '%', range: '[60-95%]' },
      { name: 'Total Sperm Count', unit: 'Mill/mL', range: '[60-150Mill]' },
      { name: 'pH', unit: '', range: '[7-8]' },
      { name: 'Reaction', unit: '', range: '[]' },
      { name: 'Normal Sperms', unit: '%', range: '[]' },
      { name: 'Abnormal Sperms', unit: '%', range: '[]' }
    ]
  },
  'BLOODGROUP': {
    name: 'Blood Group & Rh Typing',
    price: 100,
    params: [
      { name: 'ABO Group', unit: '', range: 'A / B / AB / O' },
      { name: 'Rh Type', unit: '', range: 'Positive / Negative' },
      { name: 'Indirect Coombs Test', unit: '', range: 'Negative' },
      { name: 'Direct Coombs Test', unit: '', range: 'Negative' }
    ]
  },
  'PREGNANCY': {
    name: 'Pregnancy Profile',
    price: 300,
    params: [
      { name: 'Urine Pregnancy Test', unit: '', range: 'Negative' },
      { name: 'Serum β-hCG', unit: 'mIU/mL', range: '[0-5]' }
    ]
  },
  'WIDAL': {
    name: 'WIDAL TEST SLIDE AGGLUTINATION',
    price: 300,
    params: [
      { name: 'Widal Result', unit: '', range: 'Negative' },
      {
        name: 'WIDAL TEST',
        type: 'table',
        status: 'BORDER LINE',
        headers: ['ANTIGENS', '1/20', '1/40', '1/80', '1/160', '1/320'],
        rows: [
          { antigen: "   S.TYPHI 'O'", values: ['-', '-', '-', '-', '-'] },
          { antigen: "   S.TYPHI 'H'", values: ['-', '-', '-', '-', '-'] },
          { antigen: "   S.PARATYPHI 'AH'", values: ['-', '-', '-', '-', '-'] },
          { antigen: "   S.PARATYPHI 'BH'", values: ['-', '-', '-', '-', '-'] }
        ]
      }
    ]
  },
  'RFT': {
    name: 'Renal Function Test(RFT)',
    price: 800,
    params: [
      { name: 'Blood Urea', unit: 'mg/dL', range: '[12.6-42.6]' },
      { name: 'Serum Creatinine', unit: 'mg/dL', range: '[M: 0.7-1.3] [F: 0.6-1.1]' },
      { name: 'Blood Sugar Random', unit: 'mg/dL', range: '[70-140]' },
      { name: 'Sodium', unit: 'mmol/L', range: '[136-145]' },
      { name: 'Potassium', unit: 'mmol/L', range: '[3.5-5.2]' },
      { name: 'Chloride', unit: 'mmol/L', range: '[96-108]' }
    ]
  },
  'SEROLOGY_PANEL': {
    name: 'Serology & Rapid Tests',
    price: 1200,
    params: [
      { name: 'MP', unit: '', range: 'NOT SEEN' },
      { name: 'Widal Result', unit: '', range: 'Negative' },
      {
        name: 'WIDAL TEST',
        type: 'table',
        status: 'BORDER LINE',
        headers: ['ANTIGENS', '1/20', '1/40', '1/80', '1/160', '1/320'],
        rows: [
          { antigen: "   S.TYPHI 'O'", values: ['-', '-', '-', '-', '-'] },
          { antigen: "   S.TYPHI 'H'", values: ['-', '-', '-', '-', '-'] },
          { antigen: "   S.PARATYPHI 'AH'", values: ['-', '-', '-', '-', '-'] },
          { antigen: "   S.PARATYPHI 'BH'", values: ['-', '-', '-', '-', '-'] }
        ]
      },
      { name: 'DENGUE IgG', unit: '', range: 'NEGATIVE' },
      { name: 'DENGUE IgM', unit: '', range: 'NEGATIVE' },
      { name: 'DENGUE NS1', unit: '', range: 'NEGATIVE' },
      { name: 'DENGUE TEST', unit: '', range: 'NEGATIVE' },
      { name: 'CHIKUNGUNYA IgM', unit: '', range: 'NEGATIVE' },
      { name: 'TYPHIDOT IgG', unit: '', range: 'NEGATIVE' },
      { name: 'TYPHIDOT IgM', unit: '', range: 'NEGATIVE' },
      { name: 'HIV', unit: '', range: 'NEGATIVE' },
      { name: 'HBS/AG', unit: '', range: 'NEGATIVE' },
      { name: 'HCV', unit: '', range: 'NEGATIVE' },
      { name: 'VDRL', unit: '', range: 'NEGATIVE' }
    ]
  },
  'GENETIC_PANEL': {
    name: 'Genetic & Molecular Tests',
    price: 900,
    params: [
      { name: 'Filaria Antibody', unit: '+/-', range: 'Negative' },
      { name: 'ABO Group', unit: '', range: 'A / B / AB / O' },
      { name: 'BT', unit: 'MIN', range: '2-8' },
      { name: 'CT', unit: 'MIN', range: '5-9' }
    ]
  }
};
