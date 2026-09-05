export const testCatalogue = {
  'ESR': {
    name: 'Erythrocyte Sedimentation Rate (ESR)',
    price: 100,
    params: [
      { name: 'Erythrocyte Sedimentation Rate (ESR)', unit: 'mm/hr', range: '[M: 0-15] [F: 0-20]', defaultValue: '10' }
    ]
  },
  'MANTOUX': {
    name: 'Mantoux Test (Tuberculin Skin Test)',
    price: 100,
    params: [
      { name: 'Induration', unit: 'mm', range: '[0.4x0.2]', defaultValue: '0.4x0.2' },
      { name: 'Erythema', unit: 'mm', range: '[0.4x0.4]', defaultValue: '0.4x0.4' },
      { name: 'Ulceration', unit: '', range: '[Absent]', defaultValue: 'Absent' },
      { name: 'Vesiculation', unit: '', range: '[Absent]', defaultValue: 'Absent' },
      { name: 'Result', unit: '', range: '[48 HOURS]', defaultValue: 'Negative' }
    ]
  },
  'CBC': {
    name: 'Complete Blood Count (CBC)',
    price: 350,
    params: [
      { name: 'Hemoglobin (Hb)', unit: 'g/dL', range: '[M: 13.5-17.5] [F: 12.0-15.5]', defaultValue: '14.5' },
      { name: 'Total White Blood Cell Count (Total WBC Count)', unit: '/µL', range: '[4000-11000]', defaultValue: '7500' },
      { name: 'Polymorphonuclear Leucocytes (Neutrophils)', unit: '%', range: '[55-70%]', defaultValue: '65' },
      { name: 'Lymphocytes', unit: '%', range: '[20-40%]', defaultValue: '30' },
      { name: 'Eosinophils', unit: '%', range: '[1-6%]', defaultValue: '3' },
      { name: 'Monocytes', unit: '%', range: '[2-8%]', defaultValue: '5' },
      { name: 'Basophils', unit: '%', range: '[0-2%]', defaultValue: '0' },
      { name: 'Red Blood Cell Count (RBC Count)', unit: 'million/µL', range: '[M: 4.5-5.9] [F: 4.1-5.1]', defaultValue: '4.8' },
      { name: 'Platelet Count', unit: '/µL', range: '[1.5-4.5]', defaultValue: '2.5' },
      { name: 'Hematocrit / Packed Cell Volume (HCT / PCV)', unit: '%', range: '[M: 40-45] [F: 37-47]', defaultValue: '42' },
      { name: 'Mean Corpuscular Volume (MCV)', unit: 'fL', range: '[80-100]', defaultValue: '90' },
      { name: 'Mean Corpuscular Hemoglobin (MCH)', unit: 'pg', range: '[25-32]', defaultValue: '28.5' },
      { name: 'Mean Corpuscular Hemoglobin Concentration (MCHC)', unit: 'g/dL', range: '[20-40]', defaultValue: '32' },
      { name: 'Erythrocyte Sedimentation Rate (ESR)', unit: 'mm/hr', range: '[M: 0-15] [F: 0-20]', defaultValue: '10' }
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
    name: 'Kidney Function Test (KFT)',
    price: 600,
    params: [
      { name: 'Blood Urea', unit: 'mg/dL', range: '[12.6-42.6]', defaultValue: '25.0' },
      { name: 'Serum Creatinine', unit: 'mg/dL', range: '[M: 0.7-1.3] [F: 0.6-1.1]', defaultValue: '0.9' },
      { name: 'Serum Uric Acid', unit: 'mg/dL', range: '[M: 2.4-7.0] [F: 2.4-6.0]', defaultValue: '4.5' },
      { name: 'Serum Calcium', unit: 'mg/dL', range: '[8.7-11.0]', defaultValue: '9.5' },
      { name: 'C-Reactive Protein (CRP)', unit: 'mg/dL', range: '[0.5-6.0]', defaultValue: '1.2' },
      { name: 'Serum Bilirubin (Total)', unit: 'mg/dL', range: '[0.3-1.0]', defaultValue: '0.6' },
      { name: 'Fasting Blood Sugar (FBS)', unit: 'mg/dL', range: '[70-110]', defaultValue: '90' },
      { name: 'Random Blood Sugar (RBS)', unit: 'mg/dL', range: '[70-140]', defaultValue: '100' },
      { name: 'ABO Blood Grouping System (ABO)', unit: '', range: '[]', defaultValue: 'O Positive' },
      { name: 'Bleeding Time (BT)', unit: 'Minutes', range: '[2-8]', defaultValue: '3' },
      { name: 'Clotting Time (CT)', unit: 'Minutes', range: '[5-9]', defaultValue: '6' },
      { name: 'Venereal Disease Research Laboratory (VDRL)', unit: '', range: '[Negative]', defaultValue: 'Negative' },
      { name: 'Human Immunodeficiency Virus (HIV)', unit: '', range: '[Negative]', defaultValue: 'Negative' },
      { name: 'Hepatitis B Surface Antigen (HBsAg)', unit: '', range: '[Negative]', defaultValue: 'Negative' },
      { name: 'Hepatitis C Virus (HCV)', unit: '', range: '[Negative]', defaultValue: 'Negative' }
    ]
  },
  'LFT': {
    name: 'Liver Function Test (LFT)',
    price: 600,
    params: [
      { name: 'Total Bilirubin', unit: 'mg/dL', range: '[0.3-1.2]', defaultValue: '0.8' },
      { name: 'Direct Bilirubin', unit: 'mg/dL', range: '[0.0-0.3]', defaultValue: '0.2' },
      { name: 'Indirect Bilirubin', unit: 'mg/dL', range: '[0.2-0.9]', defaultValue: '0.6' },
      { name: 'Serum Glutamic Oxaloacetic Transaminase / Aspartate Aminotransferase (SGOT / AST)', unit: 'U/L', range: '[10-40]', defaultValue: '25' },
      { name: 'Serum Glutamic Pyruvic Transaminase / Alanine Aminotransferase (SGPT / ALT)', unit: 'U/L', range: '[7-40]', defaultValue: '30' },
      { name: 'Serum Alkaline Phosphatase (ALP)', unit: 'U/L', range: '[44-147]', defaultValue: '95' },
      { name: 'Total Protein', unit: 'g/dL', range: '[6.0-8.3]', defaultValue: '7.2' },
      { name: 'Serum Albumin', unit: 'g/dL', range: '[3.5-5.0]', defaultValue: '4.2' },
      { name: 'Serum Globulin', unit: 'g/dL', range: '[2.0-3.5]', defaultValue: '2.8' }
    ]
  },
  'LIPID': {
    name: 'Lipid Profile',
    price: 500,
    params: [
      { name: 'Serum Cholesterol', unit: 'mg/dL', range: '[70-200]', defaultValue: '150' },
      { name: 'High-Density Lipoprotein Cholesterol (HDL)', unit: 'mg/dL', range: '[M: 35-80] [F: 42-88]', defaultValue: '50' },
      { name: 'Serum Triglycerides', unit: 'mg/dL', range: '[25-160]', defaultValue: '100' },
      { name: 'Very Low-Density Lipoprotein Cholesterol (VLDL)', unit: 'mg/dL', range: '[35-70]', defaultValue: '45' },
      { name: 'Low-Density Lipoprotein Cholesterol (LDL)', unit: 'mg/dL', range: '[75-150]', defaultValue: '100' },
      { name: 'Total Lipid / HDL Ratio', unit: 'mg/dL', range: '[400-800]', defaultValue: '500' }
    ]
  },
  'THYROID': {
    name: 'Thyroid Profile',
    price: 450,
    params: [
      { name: 'Thyroid Stimulating Hormone (TSH)', unit: 'µIU/mL', range: '[0.4-4.0]', defaultValue: '2.1' },
      { name: 'Total Triiodothyronine (Total T3)', unit: 'ng/dL', range: '[80-200]', defaultValue: '130' },
      { name: 'Total Thyroxine (Total T4)', unit: 'µg/dL', range: '[5.0-12.0]', defaultValue: '8.5' },
      { name: 'Free Triiodothyronine (Free T3)', unit: 'pg/mL', range: '[2.3-4.2]', defaultValue: '3.1' },
      { name: 'Free Thyroxine (Free T4)', unit: 'ng/dL', range: '[0.8-1.8]', defaultValue: '1.2' },
      { name: 'Anti-Thyroid Peroxidase Antibody (Anti-TPO)', unit: 'IU/mL', range: '[0-35]', defaultValue: '10' },
      { name: 'Anti-Thyroglobulin Antibody (Anti-Tg)', unit: 'IU/mL', range: '[0-40]', defaultValue: '12' },
      { name: 'Thyroglobulin (Tg)', unit: 'ng/mL', range: '[3-40]', defaultValue: '15' },
      { name: 'Calcitonin', unit: 'pg/mL', range: '[M: 0-10] [F: 0-5]', defaultValue: '3' }
    ]
  },
  'ELECTROLYTES': {
    name: 'Electrolytes Profile',
    price: 700,
    params: [
      { name: 'Blood Urea', unit: 'mg/dL', range: '[12.6-42.6]', defaultValue: '25.0' },
      { name: 'Serum Creatinine', unit: 'mg/dL', range: '[M: 0.7-1.3] [F: 0.6-1.1]', defaultValue: '0.9' },
      { name: 'Random Blood Sugar (RBS)', unit: 'mg/dL', range: '[70-140]', defaultValue: '100' },
      { name: 'Serum Sodium', unit: 'mmol/L', range: '[136-145]', defaultValue: '140' },
      { name: 'Serum Potassium', unit: 'mmol/L', range: '[3.5-5.2]', defaultValue: '4.2' },
      { name: 'Serum Chloride', unit: 'mmol/L', range: '[96-108]', defaultValue: '102' }
    ]
  },
  'URINE': {
    name: 'Urine Routine & Microscopic Analysis',
    price: 100,
    params: [
      { name: 'Quantity', unit: 'mL', range: '[20]', defaultValue: '30' },
      { name: 'Colour', unit: '', range: '[Pale Yellow]', defaultValue: 'Pale Yellow' },
      { name: 'Deposit', unit: '', range: '[Nil]', defaultValue: 'Nil' },
      { name: 'Specific Gravity', unit: '', range: '[1.020]', defaultValue: '1.020' },
      { name: 'pH (Potential of Hydrogen)', unit: '', range: '[4.5-8.0]', defaultValue: '6.0' },
      { name: 'Blood', unit: '', range: '[Nil]', defaultValue: 'Nil' },
      { name: 'Nitrites', unit: '', range: '[Negative]', defaultValue: 'Negative' },
      { name: 'Leucocytes', unit: '', range: '[Nil]', defaultValue: 'Nil' },
      { name: 'Bilirubin (Bile)', unit: '', range: '[Absent]', defaultValue: 'Absent' },
      { name: 'Ketone Bodies', unit: '', range: '[Absent]', defaultValue: 'Absent' },
      { name: 'Reaction', unit: '', range: '[Acidic]', defaultValue: 'Acidic' },
      { name: 'Protein', unit: '', range: '[Nil]', defaultValue: 'Nil' },
      { name: 'Sugar', unit: '', range: '[Nil]', defaultValue: 'Nil' },
      { name: 'Red Blood Cells (RBC)', unit: '', range: '[Nil]', defaultValue: 'Nil' },
      { name: 'Pus Cells', unit: '/HPF', range: '[1-2]', defaultValue: '1-2' },
      { name: 'Epithelial Cells', unit: '/HPF', range: '[2-3]', defaultValue: '2-3' },
      { name: 'Casts', unit: '', range: '[Nil]', defaultValue: 'Nil' },
      { name: 'Crystals', unit: '', range: '[Nil]', defaultValue: 'Nil' },
      { name: 'Bacteria', unit: '', range: '[Absent]', defaultValue: 'Absent' }
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
      { name: 'Occult Blood Test (OBT)', unit: '', range: 'Negative', defaultValue: 'Negative' },
      { name: 'Reducing Sugar', unit: '', range: 'Negative', defaultValue: 'Negative' },
      { name: 'Fat Globules', unit: '', range: 'Absent', defaultValue: 'Absent' },
      { name: 'Red Blood Cells (RBC)', unit: '/HPF', range: 'Absent', defaultValue: 'Absent' },
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
      { name: 'Quantity', unit: 'mL', range: '[3.0]', defaultValue: '3.0' },
      { name: 'Colour', unit: '', range: '[Greyish White]', defaultValue: 'Greyish White' },
      { name: 'Appearance', unit: '', range: '[Viscous]', defaultValue: 'Viscous' },
      { name: 'Liquefaction Time', unit: 'Minutes', range: '[30]', defaultValue: '30' },
      { name: 'Motility', unit: '%', range: '[60-95%]', defaultValue: '75' },
      { name: 'Total Sperm Count', unit: 'Mill/mL', range: '[60-150Mill]', defaultValue: '80' },
      { name: 'pH (Potential of Hydrogen)', unit: '', range: '[7-8]', defaultValue: '7.5' },
      { name: 'Reaction', unit: '', range: '[Alkaline]', defaultValue: 'Alkaline' },
      { name: 'Normal Sperms', unit: '%', range: '[80]', defaultValue: '80' },
      { name: 'Abnormal Sperms', unit: '%', range: '[20]', defaultValue: '20' }
    ]
  },
  'BLOODGROUP': {
    name: 'Blood Group & Rh Typing',
    price: 100,
    params: [
      { name: 'ABO Blood Grouping System (ABO Group)', unit: '', range: 'A / B / AB / O', defaultValue: 'O' },
      { name: 'Rhesus Factor Type (Rh Type)', unit: '', range: 'Positive / Negative', defaultValue: 'Positive' },
      { name: 'Indirect Coombs Test (ICT)', unit: '', range: 'Negative', defaultValue: 'Negative' },
      { name: 'Direct Coombs Test (DCT)', unit: '', range: 'Negative', defaultValue: 'Negative' }
    ]
  },
  'PREGNANCY': {
    name: 'Pregnancy Profile',
    price: 300,
    params: [
      { name: 'Urine Pregnancy Test (UPT)', unit: '', range: 'Negative', defaultValue: 'Negative' },
      { name: 'Serum Beta Human Chorionic Gonadotropin (Serum β-hCG)', unit: 'mIU/mL', range: '[0-5]', defaultValue: '1.2' }
    ]
  },
  'WIDAL': {
    name: 'Widal Test (Typhoid Agglutination)',
    price: 300,
    params: [
      { name: 'Widal Result', unit: '', range: 'Negative', defaultValue: 'Negative' },
      { name: 'Malarial Parasite (MP)', unit: '', range: '', defaultValue: 'NOT SEEN' },
      { name: 'Malarial Parasite Antigens (MP Antigens)', unit: 'Negative/Positive', range: 'Negative', defaultValue: 'Negative' },
      { name: 'C-Reactive Protein (CRP)', unit: 'Negative/Positive', range: 'Negative', defaultValue: 'Negative' },
      {
        name: 'Widal Agglutination Test (WIDAL TEST)',
        type: 'table',
        status: 'BORDER LINE',
        headers: ['ANTIGENS', '1/20', '1/40', '1/80', '1/160', '1/320'],
        rows: [
          { antigen: "S.TYPHI 'O'", values: ['+', '+', '-', '-', '-'] },
          { antigen: "S.TYPHI 'H'", values: ['+', '+', '-', '-', '-'] },
          { antigen: "S.PARATYPHI 'AH'", values: ['-', '-', '-', '-', '-'] },
          { antigen: "S.PARATYPHI 'BH'", values: ['-', '-', '-', '-', '-'] }
        ]
      },
      { name: 'BIOCHEMISTRY REPORT', type: 'sectionHeader' },
      { name: 'Serum Glutamic Oxaloacetic Transaminase (SGOT / AST)', unit: 'U/L', range: '[10-40]', defaultValue: '25' },
      { name: 'Serum Glutamic Pyruvic Transaminase (SGPT / ALT)', unit: 'U/L', range: '[7-40]', defaultValue: '30' },
      { name: 'Serum Bilirubin', unit: 'mg/dL', range: '[0.2-0.9]', defaultValue: '0.6' },
      { name: 'Fasting Blood Sugar (FBS)', unit: 'mg/dL', range: '[70-110]', defaultValue: '90' },
      { name: 'Random Blood Sugar (RBS)', unit: 'mg/dL', range: '[70-140]', defaultValue: '100' }
    ]
  },
  'RFT': {
    name: 'Renal Function Test (RFT)',
    price: 800,
    params: [
      { name: 'Blood Urea', unit: 'mg/dL', range: '[12.6-42.6]', defaultValue: '25.0' },
      { name: 'Serum Creatinine', unit: 'mg/dL', range: '[M: 0.7-1.3] [F: 0.6-1.1]', defaultValue: '0.9' },
      { name: 'Serum Uric Acid', unit: 'mg/dL', range: '[M: 2.4-7.0] [F: 2.4-6.0]', defaultValue: '102' },
      { name: 'Serum Calcium', unit: 'mg/dL', range: '[M: 8.7-11]', defaultValue: '9' },
      { name: 'Random Blood Sugar (RBS)', unit: 'mg/dL', range: '[70-140]', defaultValue: '100' },
      { name: 'Serum Sodium', unit: 'mmol/L', range: '[136-145]', defaultValue: '140' },
      { name: 'Serum Potassium', unit: 'mmol/L', range: '[3.5-5.2]', defaultValue: '4.2' },
      { name: 'Serum Chloride', unit: 'mmol/L', range: '[96-108]', defaultValue: '102' }
    ]
  },
  'SEROLOGY_PANEL': {
    name: 'Serology & Rapid Tests Panel',
    price: 1200,
    params: [
      { name: 'Malarial Parasite (MP)', unit: '', range: 'NOT SEEN', defaultValue: 'NOT SEEN' },
      { name: 'Widal Result', unit: '', range: 'Negative', defaultValue: 'Negative' },
      {
        name: 'Widal Agglutination Test (WIDAL TEST)',
        type: 'table',
        status: 'BORDER LINE',
        headers: ['ANTIGENS', '1/20', '1/40', '1/80', '1/160', '1/320'],
        rows: [
          { antigen: "S.TYPHI 'O'", values: ['+', '+', '-', '-', '-'] },
          { antigen: "S.TYPHI 'H'", values: ['+', '+', '-', '-', '-'] },
          { antigen: "S.PARATYPHI 'AH'", values: ['-', '-', '-', '-', '-'] },
          { antigen: "S.PARATYPHI 'BH'", values: ['-', '-', '-', '-', '-'] }
        ]
      },
      { name: 'Dengue Immunoglobulin G (DENGUE IgG)', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'Dengue Immunoglobulin M (DENGUE IgM)', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'Dengue Non-Structural Antigen 1 (DENGUE NS1)', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'Dengue Rapid Test', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'Chikungunya Immunoglobulin M (CHIKUNGUNYA IgM)', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'Typhidot Immunoglobulin G (TYPHIDOT IgG)', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'Typhidot Immunoglobulin M (TYPHIDOT IgM)', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'Human Immunodeficiency Virus (HIV)', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'Hepatitis B Surface Antigen (HBsAg)', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'Hepatitis C Virus (HCV)', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' },
      { name: 'Venereal Disease Research Laboratory (VDRL)', unit: '', range: 'NEGATIVE', defaultValue: 'NEGATIVE' }
    ]
  },
  'GENETIC_PANEL': {
    name: 'Bleeding Time, Clotting Time, ABO & Filaria Panel',
    price: 900,
    params: [
      { name: 'Filaria Antibody', unit: '+/-', range: 'Negative', defaultValue: 'Negative' },
      { name: 'ABO Blood Grouping System (ABO Group)', unit: '', range: 'A / B / AB / O', defaultValue: 'O' },
      { name: 'Bleeding Time (BT)', unit: 'MIN', range: '2-8', defaultValue: '3' },
      { name: 'Clotting Time (CT)', unit: 'MIN', range: '5-9', defaultValue: '6' }
    ]
  }
};
