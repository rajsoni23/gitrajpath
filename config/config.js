export const testCatalogue = {
  'ESR': {
    name: 'Erythrocyte Sedimentation Rate (ESR)',
    price: 150,
    params: [
      { name: 'ESR', unit: 'mm/hr', range: '[M: 0-15] [F: 0-20]' }
    ]
  },
  'MANTOUX': {
    name: 'Mantoux Test',
    price: 150,
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
      { name: 'Total Polymorphs', unit: '%', range: '[55-70%]' },
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
    price: 250,
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
    price: 700,
    params: [
      { name: 'Total Bilirubin', unit: 'mg/dL', range: '[0.3-1.2]' },
      { name: 'Direct Bilirubin', unit: 'mg/dL', range: '[0.0-0.3]' },
      { name: 'Indirect Bilirubin', unit: 'mg/dL', range: '[0.2-0.9]' },
      { name: 'SGOT (AST)', unit: 'U/L', range: '[10-40]' },
      { name: 'SGPT (ALT)', unit: 'U/L', range: '[7-56]' },
      { name: 'AST / ALT Ratio', unit: '', range: '[0.8-2.0]' },
      { name: 'Alkaline Phosphatase', unit: 'U/L', range: '[44-147]' },
      { name: 'Gamma Glutamyl Transferase', unit: 'U/L', range: '[9-48]' },
      { name: 'Lactate Dehydrogenase', unit: 'U/L', range: '[140-280]' },
      { name: 'Total Protein', unit: 'g/dL', range: '[6.0-8.3]' },
      { name: 'Albumin', unit: 'g/dL', range: '[3.5-5.0]' },
      { name: 'Globulin', unit: 'g/dL', range: '[2.0-3.5]' },
      { name: 'Albumin / Globulin Ratio', unit: '', range: '[1.0-2.2]' },
      { name: 'Bile Acids', unit: 'µmol/L', range: '[0-10]' },
      { name: 'Ammonia', unit: 'µmol/L', range: '[15-45]' },
      { name: 'Prothrombin Time', unit: 'sec', range: '[11-13.5]' },
      { name: 'INR', unit: '', range: '[0.8-1.2]' }
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
    price: 400,
    params: [
      { name: 'Blood Urea', unit: 'mg/dL', range: '[12.6-42.6]' },
      { name: 'Serum Creatinine', unit: 'mg/dL', range: '[M: 0.7-1.3] [F: 0.6-1.1]' },
      { name: 'Blood Sugar Random', unit: 'mg/dL', range: '[70-140]' },
      { name: 'Sodium', unit: 'mmol/L', range: '[136-145]' },
      { name: 'Potassium', unit: 'mmol/L', range: '[3.5-5.2]' },
      { name: 'Chloride', unit: 'mmol/L', range: '[96-108]' }
    ]
  },
  'PANCREAS': {
    name: 'Pancreatic Function Test',
    price: 650,
    params: [
      { name: 'Serum Amylase', unit: 'U/L', range: '[30-110]' },
      { name: 'Serum Lipase', unit: 'U/L', range: '[13-60]' },
      { name: 'Pancreatic Elastase', unit: 'µg/g', range: '[200-1000]' }
    ]
  },
  'URINE': {
    name: 'Urine Analysis',
    price: 200,
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
    price: 500,
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
  'IRON': {
    name: 'Iron Studies / Anemia Profile',
    price: 800,
    params: [
      { name: 'Serum Iron', unit: 'µg/dL', range: '[60-170]' },
      { name: 'Ferritin', unit: 'ng/mL', range: '[20-300]' },
      { name: 'Total Iron Binding Capacity', unit: 'µg/dL', range: '[240-450]' },
      { name: 'Unsaturated Iron Binding Capacity', unit: 'µg/dL', range: '[150-375]' },
      { name: 'Transferrin', unit: 'mg/dL', range: '[200-360]' },
      { name: 'Transferrin Saturation', unit: '%', range: '[20-50%]' }
    ]
  },
  'COAGULATION': {
    name: 'Coagulation Profile',
    price: 700,
    params: [
      { name: 'Prothrombin Time', unit: 'sec', range: '[11-13.5]' },
      { name: 'INR', unit: '', range: '[0.8-1.2]' },
      { name: 'Activated Partial Thromboplastin Time', unit: 'sec', range: '[25-35]' },
      { name: 'Thrombin Time', unit: 'sec', range: '[14-19]' },
      { name: 'Fibrinogen', unit: 'mg/dL', range: '[200-400]' },
      { name: 'D-Dimer', unit: 'µg/mL', range: '[0-0.5]' }
    ]
  },
  'CARDIAC': {
    name: 'Cardiac Markers',
    price: 1200,
    params: [
      { name: 'Troponin I', unit: 'ng/mL', range: '[0-0.04]' },
      { name: 'Troponin T', unit: 'ng/L', range: '[0-14]' },
      { name: 'CK-MB', unit: 'ng/mL', range: '[0-5]' },
      { name: 'Creatine Kinase (Total)', unit: 'U/L', range: '[M: 30-200] [F: 30-170]' },
      { name: 'BNP', unit: 'pg/mL', range: '[0-100]' },
      { name: 'NT-proBNP', unit: 'pg/mL', range: '[0-125]' },
      { name: 'Myoglobin', unit: 'ng/mL', range: '[M: 28-72] [F: 25-58]' }
    ]
  },
  'INFLAMMATORY': {
    name: 'Inflammatory Markers',
    price: 900,
    params: [
      { name: 'ESR', unit: 'mm/hr', range: '[M: 0-15] [F: 0-20]' },
      { name: 'C-Reactive Protein', unit: 'mg/L', range: '[0-5]' },
      { name: 'High Sensitivity CRP', unit: 'mg/L', range: '[0-3]' },
      { name: 'Procalcitonin', unit: 'ng/mL', range: '[0-0.05]' },
      { name: 'Interleukin-6', unit: 'pg/mL', range: '[0-7]' },
      { name: 'Ferritin', unit: 'ng/mL', range: '[20-300]' }
    ]
  },
  'VITAMINS': {
    name: 'Vitamins Profile',
    price: 1000,
    params: [
      { name: 'Vitamin D (25-OH)', unit: 'ng/mL', range: '[30-100]' },
      { name: 'Vitamin B12', unit: 'pg/mL', range: '[200-900]' },
      { name: 'Serum Folate', unit: 'ng/mL', range: '[4-20]' },
      { name: 'Vitamin A', unit: 'µg/dL', range: '[20-60]' },
      { name: 'Vitamin E', unit: 'mg/L', range: '[5-20]' },
      { name: 'Vitamin K', unit: 'ng/mL', range: '[0.2-3.2]' }
    ]
  },
  'AUTOIMMUNE': {
    name: 'Rheumatology & Autoimmune Profile',
    price: 1500,
    params: [
      { name: 'Rheumatoid Factor', unit: 'IU/mL', range: '[0-20]' },
      { name: 'Anti CCP', unit: '', range: 'Negative' },
      { name: 'ANA', unit: '', range: 'Negative' },
      { name: 'Anti dsDNA', unit: '', range: 'Negative' },
      { name: 'ANCA', unit: '', range: 'Negative' },
      { name: 'HLA B27', unit: '', range: 'Negative' },
      { name: 'Complement C3', unit: 'mg/dL', range: '[90-180]' },
      { name: 'Complement C4', unit: 'mg/dL', range: '[10-40]' }
    ]
  },
  'INFECTIOUS': {
    name: 'Infectious Disease Profile',
    price: 1100,
    params: [
      { name: 'HBsAg', unit: '', range: 'Negative' },
      { name: 'HCV Antibody', unit: '', range: 'Negative' },
      { name: 'HIV I & II', unit: '', range: 'Non Reactive' },
      { name: 'VDRL', unit: '', range: 'Non Reactive' },
      { name: 'TPHA', unit: '', range: 'Negative' },
      { name: 'Dengue NS1 Antigen', unit: '', range: 'Negative' },
      { name: 'Dengue IgM', unit: '', range: 'Negative' },
      { name: 'Dengue IgG', unit: '', range: 'Negative' },
      { name: 'Malaria Parasite', unit: '', range: 'Not Detected' },
      { name: 'Malaria Antigen', unit: '', range: 'Negative' },
      { name: 'Typhidot IgM', unit: '', range: 'Negative' },
      { name: 'Typhidot IgG', unit: '', range: 'Negative' },
      { name: 'Widal Test', unit: '', range: 'Negative' },
      { name: 'Leptospira IgM', unit: '', range: 'Negative' },
      { name: 'COVID-19 Antigen', unit: '', range: 'Negative' },
      { name: 'COVID-19 IgG', unit: '', range: 'Negative' }
    ]
  },
  'TUMORMARKERS': {
    name: 'Tumor Markers',
    price: 1800,
    params: [
      { name: 'PSA', unit: 'ng/mL', range: '[0-4]' },
      { name: 'Free PSA', unit: 'ng/mL', range: '[0-2]' },
      { name: 'CEA', unit: 'ng/mL', range: '[0-5]' },
      { name: 'AFP', unit: 'ng/mL', range: '[0-10]' },
      { name: 'CA 125', unit: 'U/mL', range: '[0-35]' },
      { name: 'CA 19-9', unit: 'U/mL', range: '[0-37]' },
      { name: 'CA 15-3', unit: 'U/mL', range: '[0-30]' },
      { name: 'Beta hCG', unit: 'mIU/mL', range: '[0-5]' }
    ]
  },
  'HORMONES': {
    name: 'Hormone Profile',
    price: 1300,
    params: [
      { name: 'FSH', unit: 'mIU/mL', range: '[1.5-12.4]' },
      { name: 'LH', unit: 'mIU/mL', range: '[1.7-8.6]' },
      { name: 'Prolactin', unit: 'ng/mL', range: '[M: 4-15] [F: 5-25]' },
      { name: 'Estradiol', unit: 'pg/mL', range: '[M: 10-40] [F: 20-350]' },
      { name: 'Progesterone', unit: 'ng/mL', range: '[M: 0-1] [F: 0-25]' },
      { name: 'Testosterone', unit: 'ng/dL', range: '[M: 300-1000] [F: 15-70]' },
      { name: 'Cortisol', unit: 'µg/dL', range: '[5-25]' }
    ]
  },
  'ABG': {
    name: 'Arterial Blood Gas (ABG)',
    price: 950,
    params: [
      { name: 'pH', unit: '', range: '[7.35-7.45]' },
      { name: 'pCO₂', unit: 'mmHg', range: '[35-45]' },
      { name: 'pO₂', unit: 'mmHg', range: '[80-100]' },
      { name: 'HCO₃', unit: 'mmol/L', range: '[22-26]' },
      { name: 'Base Excess', unit: 'mmol/L', range: '[-2 to +2]' },
      { name: 'Oxygen Saturation', unit: '%', range: '[95-100%]' },
      { name: 'Lactate', unit: 'mmol/L', range: '[0.5-2.2]' }
    ]
  },
  'MICROBIOLOGY': {
    name: 'Microbiology',
    price: 400,
    params: [
      { name: 'Gram Stain', unit: '', range: 'No Organism Seen' },
      { name: 'AFB Smear', unit: '', range: 'Negative' },
      { name: 'KOH Mount', unit: '', range: 'No Fungal Elements' },
      { name: 'Culture Result', unit: '', range: 'No Growth' },
      { name: 'Colony Count', unit: '', range: 'No Growth' },
      { name: 'Antibiotic Sensitivity', unit: '', range: 'As Per Chart' }
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
  'ALLERGY': {
    name: 'Allergy Profile',
    price: 1200,
    params: [
      { name: 'Total IgE', unit: 'IU/mL', range: '[0-100]' },
      { name: 'Specific IgE', unit: '', range: 'As Per Panel' },
      { name: 'Eosinophil Count', unit: '/µL', range: '[40-400]' }
    ]
  },
  'ELECTROPHORESIS': {
    name: 'Protein Electrophoresis',
    price: 1400,
    params: [
      { name: 'Albumin', unit: '%', range: '[55-65%]' },
      { name: 'Alpha-1 Globulin', unit: '%', range: '[2-5%]' },
      { name: 'Alpha-2 Globulin', unit: '%', range: '[7-13%]' },
      { name: 'Beta Globulin', unit: '%', range: '[8-14%]' },
      { name: 'Gamma Globulin', unit: '%', range: '[12-22%]' },
      { name: 'M Band', unit: '', range: 'Absent' }
    ]
  },
  'TOXICOLOGY': {
    name: 'Toxicology',
    price: 2000,
    params: [
      { name: 'Blood Alcohol', unit: 'mg/dL', range: '[0-10]' },
      { name: 'Urine Drug Screen', unit: '', range: 'Negative' },
      { name: 'Lead', unit: 'µg/dL', range: '[0-5]' },
      { name: 'Mercury', unit: 'µg/L', range: '[0-10]' },
      { name: 'Arsenic', unit: 'µg/L', range: '[0-10]' }
    ]
  },
  'SPECIALBIOCHEMISTRY': {
    name: 'Special Biochemistry',
    price: 1600,
    params: [
      { name: 'Homocysteine', unit: 'µmol/L', range: '[5-15]' },
      { name: 'Lipoprotein (a)', unit: 'mg/dL', range: '[0-30]' },
      { name: 'Apolipoprotein A1', unit: 'mg/dL', range: '[110-180]' },
      { name: 'Apolipoprotein B', unit: 'mg/dL', range: '[55-140]' }
    ]
  },
  'FERTILITY': {
    name: 'Fertility Profile',
    price: 1700,
    params: [
      { name: 'AMH', unit: 'ng/mL', range: '[1-4]' },
      { name: 'FSH', unit: 'mIU/mL', range: '[1.5-12.4]' },
      { name: 'LH', unit: 'mIU/mL', range: '[1.7-8.6]' },
      { name: 'Estradiol', unit: 'pg/mL', range: '[M: 10-40] [F: 20-350]' },
      { name: 'Progesterone', unit: 'ng/mL', range: '[M: 0-1] [F: 0-25]' }
    ]
  },
  'GENETICS': {
    name: 'Genetic & Molecular Tests',
    price: 3500,
    params: [
      { name: 'Karyotyping', unit: '', range: 'Normal' },
      { name: 'BCR-ABL', unit: '', range: 'Negative' },
      { name: 'JAK2 Mutation', unit: '', range: 'Negative' },
      { name: 'BRCA1 / BRCA2', unit: '', range: 'Negative' },
      { name: 'PCR Result', unit: '', range: 'As Per Analysis' }
    ]
  }
};
