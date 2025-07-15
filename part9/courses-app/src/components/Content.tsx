import type { CoursePart } from "../App"
import { Part } from "./Part"

interface ContentProps {
    courseParts:CoursePart[]
}
export const Content = ({ courseParts } : ContentProps) => {
  return (
    <>
     {
         courseParts.map((c) => (
            <Part part={ c } />
         ))
     }
    </>
  )
}
