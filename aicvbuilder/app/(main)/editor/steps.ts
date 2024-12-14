import { EditorormProps } from "@/lib/types";
import GenerateInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";

export const steps : {
    title : string ;
    component : React.ComponentType<EditorormProps>;
    key : string;

}[] = [
    {title : "General Info", component : GenerateInfoForm, key : "general-info"},
    {title : "Personal Info", component : PersonalInfoForm, key : "personal-info"},
    {title : "Work Experience" , component: WorkExperienceForm, key : "work-experience"},
    {title : "Education" , component: EducationForm, key : "education"}
]