import { EditorFormProps } from "@/lib/types";
import GenerateInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";
import CertificatesForm from "./forms/CertificatesForm";
import InterestsForm from "./forms/InterestsForm";
import LanguagesForm from "./forms/LanguagesForm";

export const steps : {
    title : string ;
    component : React.ComponentType<EditorFormProps>;
    key : string;

}[] = [
    {title : "General Info", component : GenerateInfoForm, key : "general-info"},
    {title : "Personal Info", component : PersonalInfoForm, key : "personal-info"},
    {title : "Work Experience" , component: WorkExperienceForm, key : "work-experience"},
    {title : "Education" , component: EducationForm, key : "education"},
    {title : "Skills" , component: SkillsForm, key : "skills"},
    {title : "Certificates" , component: CertificatesForm, key : "certificates"},
    {title : "Languages" , component: LanguagesForm, key : "languages"},
    {title : "Interests" , component: InterestsForm, key : "interests"},
    {title : "Summary" , component: SummaryForm, key : "summary"},
]