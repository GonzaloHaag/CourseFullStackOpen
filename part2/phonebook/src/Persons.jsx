
export const Persons = (props) => {
    return (
        <div>
            {
                props.persons.map((p) => (
                    <p key={p.id}>{p.name} - {p.number} <button onClick={() => props.onClickDeletePerson(p.id,p.name)}>Delete</button></p>
                ))
            }
        </div>
    )
}
