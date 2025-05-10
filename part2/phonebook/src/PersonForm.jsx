
export const PersonForm = (props) => {
    return (
        <form onSubmit={props.addNewName}>
            <div>
                name: <input value={props.newName} onChange={props.onChangeName} />
            </div>
            <div>number: <input value={props.newPhone} onChange={props.onChangePhone} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
