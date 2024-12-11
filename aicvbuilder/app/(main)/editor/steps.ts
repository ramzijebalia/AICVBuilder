import { EditorormProps } from "@/lib/types";
import GenerateInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";

export const steps : {
    title : string ;
    component : React.ComponentType<EditorormProps>;
    key : string;

}[] = [
    {title : "General Info", component : GenerateInfoForm, key : "general-info"},
    {title : "Personal Info", component : PersonalInfoForm, key : "personal-info"},
]