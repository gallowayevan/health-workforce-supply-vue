import { timeFormat } from 'd3-time-format';
import { physicianGroups } from './assets/data/physicianGroups';

export function professionChartTitle(variable, specialtyObject) {
  const { name, profession, specialty } = specialtyObject;
  
  // Define variable descriptions
  const variableDescriptions = {
    provider_rate: "per 10,000 Population",
    percent_female: "who were Female",
    percent_age: "who were 65 or Older",
    percent_underrepresented: "who were Underrepresented Minorities",
    percent_race_na: "Missing Race",
    total: null // Special case - handled differently
  };

  // Handle special pluralization cases
  const pluralize = (prof) => {
    if (["Physician", "Physician Assistant", "Dentist"].includes(prof)) {
      return prof + "s";
    }
    if (prof === "Certified Nurse Midwife") {
      return prof.replace("wife", "wives");
    }
    return prof + "s";
  };

  // Build the base subject string
  let subject;
  
  if (specialty === profession) {
    // Direct profession (no specialty)
    subject = pluralize(profession);
  } else if (["Physician", "Physician Assistant"].includes(profession)) {
    // Primary Area of Practice
    subject = `${pluralize(profession)} with a Primary Area of Practice of ${name}`;
  } else if (profession === "Certified Nurse Midwife") {
    // Special case for midwives
    subject = pluralize(name);
  } else {
    // General specialty case
    subject = `${pluralize(profession)} with a Specialty of ${name}`;
  }

  // Build the final title based on variable
  if (variable === "total") {
    return `Total Number of ${subject}`;
  }
  
  const description = variableDescriptions[variable];
  if (!description) {
    throw new Error(`Unknown variable: ${variable}`);
  }
  
  if (variable === "percent_race_na") {
    return `Percent of ${subject} who were ${description}`;
  }
  
  return variable === "provider_rate" 
    ? `${subject} ${description}`
    : `Percent of ${subject} ${description}`;
}

export function getLayerText(layers) {
  const checkLayers = function (testValue) { return ({ value }) => value == testValue };
  let text = "";
  if (layers.some(checkLayers(0))) {
    text += " Rural/nonmetropolitan counties are defined using the 2017 Office of Management and Budget Core Based Statistical Areas (CBSAs). Rural/nonmetropolitan counties include micropolitan counties and counties without CBSAs. Using this definition, NC has 54 nonmetro counties."
  }
  if (layers.some(checkLayers(2))) {
    text += " Urbanized areas are contiguous areas defined by the the United States Census Bureau, which have 50,000 or more people. Typically, this will include a dense urban core and areas around that core. This layer uses the 2017 update."
  }

  return text;
}
export function getFooterText() {
  var currentDate = timeFormat("%B %d, %Y")(new Date());
  var footerText =
    " Population census data and estimates are downloaded from the North Carolina Office of State Budget and Management via NC LINC and are based on US Census data. <br><strong>Source:</strong> North Carolina Health Professions Data System, <a href='http://www.shepscenter.unc.edu/programs-projects/workforce/'>Program on Health Workforce Research and Policy</a>, Cecil G. Sheps Center for Health Services Research, University of North Carolina at Chapel Hill.  Created " +
    currentDate +
    " at " +
    window.location.href +
    ".";
  return footerText;
}
export function getSourceText(currentSpecialty) {

  var currentSpecialtyText = "<strong>Notes: </strong>";

  switch (currentSpecialty) {
    case "Dentist":
      currentSpecialtyText +=
        "Data include active, licensed dentists in practice in North Carolina as of October 31 of each year.  Dentist data are derived from the North Carolina State Board of Dental Examiners.";
      break;
    case "Physician":
      currentSpecialtyText +=
        "Data include active, licensed physicians in practice in North Carolina as of October 31 of each year who are not residents-in-training and are not employed by the Federal government.  Physician data are derived from the North Carolina Medical Board.  County estimates are based on primary practice location. <span style='font-weight: bold;'>Data from 2020 and 2021 are unavailable because of issues with the data which make longitudinal comparisons misleading</span>.";
      break;
    case "Pharmacist":
      currentSpecialtyText +=
        "Data include active, licensed pharmacists in practice in North Carolina as of October 31 of each year.  Pharmacist data are derived from the North Carolina Board of Pharmacy.";
      break;
    case "Dental Hygienist":
      currentSpecialtyText +=
        "Data include active, licensed dental hygienists in practice in North Carolina as of October 31 of each year.  Dental hygienist data are derived from the North Carolina State Board of Dental Examiners.";
      break;
    case "Physician Assistant":
      currentSpecialtyText +=
        "Data include active, licensed physician assistants in practice in North Carolina as of October 31 of each year.  Physician assistant data are derived from the North Carolina Medical Board.  County estimates are based on primary practice location.";
      break;
    case "Registered Nurse":
      currentSpecialtyText +=
        "Data include active, licensed registered nurses in practice in North Carolina as of October 31 of each year.  Registered nurse data are derived from the North Carolina Board of Nursing. In 2018 and 2019, the NC Board of Nursing updated the data they report to the Cecil G. Sheps Center, including more detailed information regarding unemployment and not working in nursing professions.";
      break;
    case "Licensed Practical Nurse":
      currentSpecialtyText +=
        "Data include active, licensed practical nurses in practice in North Carolina as of October 31 of each year.  Licensed practical nurse data are derived from the North Carolina Board of Nursing.";
      break;
    case "Nurse Practitioner":
      currentSpecialtyText +=
        "Data include active, licensed nurse practitioners in practice in North Carolina as of October 31 of each year.  Nurse practitioner data are derived from the North Carolina Board of Nursing.";
      break;
    case "Certified Nurse Midwife":
      currentSpecialtyText +=
        "Data include active, licensed certified nurse midwives in practice in North Carolina as of October 31 of each year.  Certified nurse midwife data are derived from the North Carolina Board of Nursing.";
      break;
    case "Occupational Therapist":
      currentSpecialtyText +=
        "Data include active, licensed occupational therapists in practice in North Carolina as of October 31 of each year.  Occupational therapist data are derived from the North Carolina Board of Occupational Therapy.";
      break;
    case "Occupational Therapy Assistant":
      currentSpecialtyText +=
        "Data include active, licensed occupational therapy assistants in practice in North Carolina as of October 31 of each year.  Occupational therapy assistant data are derived from the North Carolina Board of Occupational Therapy";
      break;
    case "Optometrist":
      currentSpecialtyText +=
        "Data include active, licensed optometrists in practice in North Carolina as of October 31 of each year.  Optometrist data are derived from the North Carolina Board of Optometry.";
      break;
    case "Podiatrist":
      currentSpecialtyText +=
        "Data include active, licensed podiatrists in practice in North Carolina as of October 31 of each year.  Podiatrist data are derived from the North Carolina Board of Podiatry Examiners.";
      break;
    case "Physical Therapist":
      currentSpecialtyText +=
        "Data include active, licensed physical therapists in practice in North Carolina as of October 31 of each year.  Physical therapist data are derived from the North Carolina Board of Physical Therapy Examiners.";
      break;
    case "Physical Therapist Assistant":
      currentSpecialtyText +=
        "Data include active, licensed physical therapist assistants in practice in North Carolina as of October 31 of each year.  Physical therapist assistant data are derived from the North Carolina Board of Physical Therapy Examiners.";
      break;
    case "Psychologist":
      currentSpecialtyText +=
        "Data include active, licensed psychologists in practice in North Carolina as of October 31 of each year.  Psychologist data are derived from the North Carolina Psychology Board.";
      break;
    case "Psychological Associate":
      currentSpecialtyText +=
        "Data include active, licensed psychological associates in practice in North Carolina as of October 31 of each year.  Psychological associate data are derived from the North Carolina Psychology Board.";
      break;
    case "Respiratory Therapist":
      currentSpecialtyText +=
        "Data include active, licensed respiratory therapists in practice in North Carolina as of October 31 of each year.  Respiratory therapist data are derived from the North Carolina Respiratory Care Board.";
      break;
    case "Chiropractor":
      currentSpecialtyText +=
        "Data include active, licensed chiropractors in practice in North Carolina as of October 31 of each year.  Chiropractor data are derived from the North Carolina State Board of Chiropractic Examiners. For 2015 only, the NC Board of Chiropractic Examiners did not provide an annual file of licensure data to the HPDS. 2015 chiropractor data were imputed from other years. As of 2022, the NC Board of Chiropractic Examiners is no longer collecting data on the race or gender of licensees.";
      break;
  }
  ;
  return currentSpecialtyText;
}

export function getPhysicianGroupText(specialtyObject) {
  const index = physicianGroups.map(d => d.physicianGroup).indexOf(specialtyObject.specialty);
  let text = "";
  if (index > -1) {
    text = physicianGroups[index].areasOfPractice.join(", ")
    text = `<p class="paop-note">${specialtyObject.profession}s with a primary area of practice of ${specialtyObject.name} include the following: ${text}.`;

    if (specialtyObject.specialty == "Primary Care Classic" || specialtyObject.specialty == "Generalist Physician" || specialtyObject.specialty == "Psychiatry, All Specialties") {
      text += " This category overlaps with other categories, i.e., it is not exclusive of the other categories."
    }

    text += `</p>`
  }



  return text;
}