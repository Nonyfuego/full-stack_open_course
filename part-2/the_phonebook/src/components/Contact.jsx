
const Contact = ({name, number, id, clickHandler}) => {
    return (
        <tr>
            <td>
                {name}
            </td>
            <td>
                {number}
            </td>
            <td>
                <button onClick={() => clickHandler(id)}>delete</button>
            </td>
        </tr>
    )
}

export default Contact