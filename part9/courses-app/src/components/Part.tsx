import type { CoursePart } from "../App"

interface PartProps {
    part:CoursePart;
}

export const Part = ({ part } : PartProps) => {
    switch(part.kind) {
        case "basic":
            return <div style={{display:'flex',flexDirection:'column'}}><p style={{fontWeight:'bold'}} key={part.name}>{part.name} {part.exerciseCount}</p> <span>{part.description}</span></div>
        case "group":
            return <div style={{display:'flex',flexDirection:'column'}}><p style={{fontWeight:'bold'}} key={part.name}>{part.name} {part.exerciseCount}</p> <span>project exercises {part.groupProjectCount}</span></div>
        case "background":
            return <div style={{display:'flex',flexDirection:'column'}}><p style={{fontWeight:'bold'}} key={part.name}>{part.name} {part.exerciseCount}</p> <span>{part.description}</span> <span>submit to {part.backgroundMaterial}</span></div>
        case "special":
            return <div style={{display:'flex',flexDirection:'column'}}><p style={{fontWeight:'bold'}} key={part.name}>{part.name} {part.exerciseCount}</p><span>{part.description}</span><span>skills requirements: {part.requirements.map((r) => r + ' ')}</span></div>
    }
}
