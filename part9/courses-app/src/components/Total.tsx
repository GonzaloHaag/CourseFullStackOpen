interface TotalProps {
    total:number;
}

export const Total = ({total}:TotalProps) => {
  return (
   <p>
     Number of exercises {total}
   </p>
  )
}
