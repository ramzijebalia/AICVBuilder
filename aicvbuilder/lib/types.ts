import { ResumeValues } from "./validation";

export interface EditorormProps {
    resumeData: ResumeValues;
    setResumeData: (data: ResumeValues) => void;
}